import { createServer } from "@graphql-yoga/node";
import { typeDefs, resolvers } from "./graphql";
import connectionString from "./mongoDB/mongoConfig";
import { JWT } from "./mongoDB/class/Authentication/JWT";
import { connect } from "mongoose";

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },

  context: async ({ request }) => {
    const TokenExists = (await request.headers.get("Authorization")) ?? null;

    if (TokenExists) {
      const JWTToken = TokenExists.split(" ")[1]; // "remove the token bearer"
      const JWTInstance = new JWT();
      const isValid = await JWTInstance.verifyToken(JWTToken)
        .then((res) => res.isValid)
        .catch((err) => false);

      return await { isValid };
    } else return null;
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
