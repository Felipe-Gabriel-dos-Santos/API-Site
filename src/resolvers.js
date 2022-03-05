import { getUser, getUsers, createUser } from "./functions/users.js";

export default {
  Query: {
    getUser,
    getUsers,
  },

  Mutation: {
    createUser,
  },
};
