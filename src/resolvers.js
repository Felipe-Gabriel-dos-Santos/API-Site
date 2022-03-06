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

export default {
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
  },
};
