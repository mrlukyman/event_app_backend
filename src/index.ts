import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { prisma } from './prisma/client'


const startServer = async () => {
  const app = express()
  const httpServer = createServer(app)

  const typeDefs = gql`
    type Query {
      users: [User!]!
    }
    type User {
      id: ID!
      name: String!
      events: [Event!]!
    }
    type Query {
      events: [Event!]!
    }
    type Event {
      id: ID!
      name: String!
      description: String!
      thumbnail: String!
      creator: User!
      creatorId: Int!
    }
    `

  const resolvers = {
    Query: {
      events: async () => {
        return await prisma.event.findMany()
      },
      users: async () => {
        return await prisma.user.findMany()
      },
    }
  }

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
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
