# syntax=docker/dockerfile:1
FROM node:16-alpine
WORKDIR /app
COPY build .
COPY package.json .
COPY yarn.lock .
RUN yarn install --production
CMD ["node", "build/index.js"]
EXPOSE 4000