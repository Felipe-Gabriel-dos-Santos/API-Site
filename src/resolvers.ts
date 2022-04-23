import {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from "./functions/users";

import {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "./functions/products";

import {
  uploadSingleImage,
  uploadMultipleProductsImages,
} from "./functions/upload";

import { loginEmailPassword, createAccount } from "./functions/auth";

export default {
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

    uploadSingleImage,
    uploadMultipleProductsImages,
  },
};
