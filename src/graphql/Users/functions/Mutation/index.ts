import { Users } from "../../../../mongoDB/class/Users";
import userModel from "../../../../mongoDB/schemas/user";
import { IUserInput } from "../../../../types/user";

const userCollection = new Users(userModel);

export function updateUser(
  _: any,
  { id, userUpdatableFields }: { id: string; userUpdatableFields: IUserInput }
) {
  return userCollection.updateUser(id, userUpdatableFields);
}

export function deleteUser(_: any, { id }: { id: string }) {
  return userCollection.deleteUser(id);
}
