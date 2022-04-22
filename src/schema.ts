const typeDefs = /* GraphQL */ `
  scalar File

  type UploadResponse {
    success: Boolean!
    message: String!
  }

  input updatableFields {
    name: String
    price: Float
    description: String
    images_url: [String!]
    category: String
    sizes: [String!]
    colors: [String!]
    stock: Int
    number_of_likes: Int
    number_of_sales: Int
    search_tags: [String!]
  }

  input createProductFields {
    name: String!
    price: Float!
    description: String
    images_url: [String!]!
    category: String
    sizes: [String!]
    colors: [String!]
    stock: Int!
    search_tags: [String!]!
  }

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

    getProduct(id: ID!): Product
    getProducts: [Product!]!
  }

  type Mutation {
    loginEmailPassword(email: String!, password: String!): User!
    createAccount(email: String!, password: String!): String!

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
      createProduct: createProductFields! # authors: [ID!]
    ): String!

    deleteProduct(id: ID!): String!

    updateProduct(id: ID!, updatableFields: updatableFields!): Product

    singleUpload(file: File!): UploadResponse!
  }
`;
export default typeDefs;