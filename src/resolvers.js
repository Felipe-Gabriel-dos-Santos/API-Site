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

import { loginEmailPassword, createAccount } from "./functions/auth.js";

export default {
  Upload: GraphQLUpload,

  Query: {
    getUser,
    getUsers,

    getProduct,
    getProducts,
  },

  Mutation: {
    loginEmailPassword,
    createAccount,

    createUser,
    deleteUser,
    updateUser,

    createProduct,
    deleteProduct,
    updateProduct,

    singleUpload,
  },
};
