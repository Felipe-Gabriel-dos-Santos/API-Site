import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    avatar_url: String!
    created_at: String!
    # last_login: String!
    # favorite_products: [Product]!
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String
    images_url: [String!]!
    category: String
    sizes: [String!]
    colors: [String!]
    stock: Int!
    search_tags: [String!]!

    # authors: [User!]!
    created_at: String!
    number_of_sales: Int!
    number_of_likes: Int!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): String! # returns id of created user or error message
    deleteUser(id: ID!): String! # returns id of deleted user or error message
    updateUser(
      id: ID!
      name: String
      email: String
      password: String
      avatar_url: String
    ): User

    createProduct(
      name: String!
      price: Float!
      description: String
      images_url: [String!]!
      category: String
      sizes: [String!]
      colors: [String!]
      stock: Int!
      search_tags: [String!]! # authors: [ID!]
    ): String!
  }
`;
export default typeDefs;
