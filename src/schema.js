import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: String!
    name: String!
    email: String!
    avatar_url: String!
  }

  type Query {
    user(id: String!): User
    users: [User!]!
  }

  # type Mutations {
  #     # createUser(name: String!, email: String!, password: String!, avatar_url: String) : User
  #     # updateUser(id: ID! name: String, email: String, password: String, avatar_url: String ) : User
  #     # deleteUser(id: ID!) : User
  # }
`;
export default typeDefs;
