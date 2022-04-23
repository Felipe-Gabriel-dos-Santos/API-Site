import { join } from "path";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

const allTypeDefs = loadFilesSync(join(__dirname, "**", "*.gql"));
const allResolvers = loadFilesSync(join(__dirname, "**", "resolvers.ts"));

const typeDefs = mergeTypeDefs(allTypeDefs);
const resolvers = mergeResolvers(allResolvers);

export { typeDefs, resolvers };
