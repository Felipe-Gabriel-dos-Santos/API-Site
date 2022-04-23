import { getUser, getUsers } from "./functions/Query";
import { createUser, updateUser, deleteUser } from "./functions/Mutation";

export default {
  Query: {
    getUser,
    getUsers,
  },

  Mutation: {
    createUser,
    updateUser,
    deleteUser,
  },
};
