import {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from "./functions/users.js";

import {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "./functions/products.js";

import { singleUpload } from "./functions/upload.js";

import { GraphQLUpload } from "graphql-upload";

export default {
  Upload: GraphQLUpload,

  Query: {
    getUser,
    getUsers,

    getProduct,
    getProducts,
  },

  Mutation: {
    createUser,
    deleteUser,
    updateUser,

    createProduct,
    deleteProduct,
    updateProduct,

    singleUpload,
  },
};
