import { GraphQLYogaError } from "@graphql-yoga/node";
import UserModel from "../../../../infra/repositories/models/user";
import UserRepository from "../../../../infra/repositories/user/userRepository";
import { Authentication } from "../../../../mongoDB/class/Authentication/Authentication";
import { JWT } from "../../../../mongoDB/class/Authentication/JWT";

interface IUser {
  authId: string;
  name: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  lastLogin: string;
}

interface ICAInput {
  name: string;
  email: string;
  password: string;
}

const JWTInstance = new JWT();
const userRepository = new UserRepository(UserModel);

const authentication = new Authentication(JWTInstance, userRepository);

export function loginEmailPassword(
  _: any,
  { email, password }: { email: string; password: string }
) {
  return authentication
    .login(email, password)
    .then((user) => user)
    .catch((err) => new GraphQLYogaError(err));
}

export function createAccount(_: any, { name, email, password }: ICAInput) {
  return authentication
    .createAccount(name, email, password)
    .then((user) => user)
    .catch((err) => new GraphQLYogaError(err));
}
