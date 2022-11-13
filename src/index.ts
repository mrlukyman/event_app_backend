import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { prisma } from './prisma/client'


const startServer = async () => {
  const app = express()
  const httpServer = createServer(app)

  const typeDefs = gql`
    scalar Date
    type Query {
      user(id: ID!): User
      events: [Event!]!
    }
    type User {
      id: ID!
      name: String!
      email: String!
    }
    type Event {
      id: ID!
      name: String!
      description: String
      thumbnailUrl: String
      date: Date!
      creator: User
    }
    type Mutation {
      createEvent(name: String!, description: String, thumbnailUrl: String, date: Date!): Event
      createUser(email: String!, name: String): User
    }
    `

  const resolvers = {
    Query: {
      user: async (_parent: any, { id }: any, _context: any) => {
        return await prisma.user.findUnique({
          where: {
            id: Number(id)
          }
        })
      },
      events: async (_parent: any, _args: any, _context: any) => {
        return await prisma.event.findMany()
      }
    },
    Mutation: {
      createEvent: async (_parent: any, { name, description, thumbnailUrl, date, id }: any, _context: any) => {
        return await prisma.event.create({
          data: {
            name,
            description,
            thumbnailUrl,
            date,
            creator: {
              connect: {  
                id: Number(1)
              }
            }
          }
        })
      },
      createUser: async (_parent: any, {email, name}: any, context: any) => {
        return await prisma.user.create({
          data: {
            email,
            name
          }
        })
      }

    }
  }

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    // @ts-expect-error
    playground: true,
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({
      app,
  })

  httpServer.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`Server listening on localhost:4000${apolloServer.graphqlPath}`)
  )
}

startServer()
