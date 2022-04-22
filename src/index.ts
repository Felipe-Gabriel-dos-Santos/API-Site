import { createServer } from '@graphql-yoga/node'
import typeDefs from "./schema";
import resolvers from "./resolvers";

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  }
});

 server.start()
 .then(res => console.log(res))
 .catch(err => err)



