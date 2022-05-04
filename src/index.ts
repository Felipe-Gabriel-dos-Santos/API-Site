import { createServer } from "@graphql-yoga/node";
import { typeDefs, resolvers } from "./graphql";
import connectionString from "./MongoDB/mongoConfig";
import { connect } from "mongoose";

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
});

connect(connectionString)
  .then(() => {
    return server
      .start()
      .then((res) => console.log(res))
      .catch((err) => err);
  })
  .catch((error) => console.log(error));
