import {
  getUser,
  getUsers,
  createUser,
  deleteUser,
} from "./functions/users.js";

export default {
  Query: {
    getUser,
    getUsers,
  },

  Mutation: {
    createUser,
    deleteUser,
  },
};
