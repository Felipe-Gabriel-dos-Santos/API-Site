import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    avatar_url: String!
    # created_at: String!
    # last_login: String!
    # favorite_products: [Product]!
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String
    image_url: String!
    category: String
    sizes: [String!]
    colors: [String!]
    stock: Int!

    author: [User!]
    created_at: String!
    number_of_sales: Int
    number_of_likes: Int
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User!]!
  }

  # type Mutations {
  #     # createUser(name: String!, email: String!, password: String!, avatar_url: String) : User
  #     # updateUser(id: ID! name: String, email: String, password: String, avatar_url: String ) : User
  #     # deleteUser(id: ID!) : User
  # }
`;
export default typeDefs;
