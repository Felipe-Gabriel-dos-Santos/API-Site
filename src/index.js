import express from "express";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

const app = express();

app.use(graphqlUploadExpress());

server.applyMiddleware({ app });

await new Promise((r) => app.listen({ port: 4000 }, r));

console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
