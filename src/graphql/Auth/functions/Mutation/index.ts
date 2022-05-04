import { GraphQLYogaError } from "@graphql-yoga/node";
import { Authentication } from "../../../../MongoDB/class/Authentication/Authentication";

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

export function loginEmailPassword(
  _: any,
  { email, password }: { email: string; password: string }
) {
  const authentication = new Authentication(email, password);
  return authentication
    .login()
    .then((user) => user)
    .catch((err) => new GraphQLYogaError(err));
}

export function createAccount(_: any, { name, email, password }: ICAInput) {
  const authentication = new Authentication(email, password);

  return authentication
    .createAccount(name)
    .then((user) => user)
    .catch((err) => new GraphQLYogaError(err));
}
