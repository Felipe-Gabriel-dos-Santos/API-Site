import { Users } from "../../../../mongoDB/class/Users";
import userModel from "../../../../mongoDB/schemas/user";
import { GraphQLYogaError } from "@graphql-yoga/node";
import UserRepository from "../../../../infra/repositories/user/userRepository";
import UserModel from "../../../../infra/repositories/models/user";

const userCollection = new Users(userModel);

export function getUser(_: any, { id }: { id: string }) {
  const repository = new UserRepository(UserModel);
  return repository.findById(id);
}

export function getUsers() {
  return userCollection
    .readAllUsers()
    .then((user) => user)
    .catch((err) => new GraphQLYogaError(err));
}
