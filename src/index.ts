import { createServer } from "@graphql-yoga/node";
import { typeDefs, resolvers } from "./graphql";

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
});

server
  .start()
  .then((res) => console.log(res))
  .catch((err) => err);
