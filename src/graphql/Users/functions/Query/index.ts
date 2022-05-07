import { Users } from "../../../../mongoDB/class/Users";
import userModel from "../../../../mongoDB/schemas/user";
import { GraphQLYogaError } from "@graphql-yoga/node";

const userCollection = new Users(userModel);

export function getUser(_: any, { id }: { id: string }) {
  return userCollection
    .readUserById(id)
    .then((user) => user)
    .catch((err) => new GraphQLYogaError(err));
}

export function getUsers() {
  return userCollection
    .readAllUsers()
    .then((user) => user)
    .catch((err) => new GraphQLYogaError(err));
}
