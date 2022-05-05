import { Users } from "../../../../mongoDB/class/Users";
import userModel from "../../../../mongoDB/schemas/user";

const userCollection = new Users(userModel);

export function getUser(_: any, { id }: { id: string }) {
  return userCollection.readUserById(id);
}

export function getUsers() {
  return userCollection.readAllUsers();
}
