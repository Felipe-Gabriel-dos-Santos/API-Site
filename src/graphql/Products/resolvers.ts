import { getProduct, getProducts } from "./functions/Query";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "./functions/Mutation";

export default {
  Query: {
    getProduct,
    getProducts,
  },

  Mutation: {
    createProduct,
    updateProduct,
    deleteProduct,
  },
};
