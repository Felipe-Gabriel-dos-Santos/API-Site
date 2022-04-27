import { getUser, getUsers } from "./functions/Query";
import { updateUser, deleteUser } from "./functions/Mutation";

export default {
  Query: {
    getUser,
    getUsers,
  },

  Mutation: {
    updateUser,
    deleteUser,
  },
};
