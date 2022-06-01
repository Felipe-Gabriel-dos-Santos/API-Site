import UserModel from "../../../../infra/repositories/models/user";
import UserRepository from "../../../../infra/repositories/user/userRepository";
import { Users } from "../../../../mongoDB/class/Users";
import userModel from "../../../../mongoDB/schemas/user";
import { IUserInput } from "../../../../types/user";

const repository = new UserRepository(UserModel);

export function updateUser(
  _: any,
  { id, userUpdatableFields }: { id: string; userUpdatableFields: IUserInput }
) {
  return repository.update(id, userUpdatableFields);
}

export function deleteUser(_: any, { id }: { id: string }) {
  return repository.delete(id);
}
