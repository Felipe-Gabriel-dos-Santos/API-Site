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
} from "./functions/products.js";

export default {
  Query: {
    getUser,
    getUsers,
  },

  Mutation: {
    createUser,
    deleteUser,
    updateUser,

    createProduct,
  },
};
