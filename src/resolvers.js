import {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from "./functions/users.js";

export default {
  Query: {
    getUser,
    getUsers,
  },

  Mutation: {
    createUser,
    deleteUser,
    updateUser,
  },
};
