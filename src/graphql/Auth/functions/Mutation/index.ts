import { Auth } from "../../../../Firebase/auth";
import { GraphQLYogaError } from "@graphql-yoga/node";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import firestore from "../../../../Firebase/firestore";

const collectionName = "users";

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
  return signInWithEmailAndPassword(Auth, email, password)
    .then((result) =>
      firestore
        .read(collectionName, result.user.uid)
        .then((user) => user)
        .catch((err) => new GraphQLYogaError(err.code))
    )

    .catch((err) => new GraphQLYogaError(err));
}

export function createAccount(_: any, { name, email, password }: ICAInput) {
  return createUserWithEmailAndPassword(Auth, email, password)
    .then((result) => {
      const { user } = result;
      const createdAt = new Date().toDateString();
      const avatarUrl =
        "https://firebasestorage.googleapis.com/v0/b/site-sorri-teste.appspot.com/o/DefaultProfileImage%2Fdefault-profile-image.png?alt=media&token=1742657d-48e1-4a0b-81aa-ea4a8855e910";

      const User = {
        authId: user.uid,
        name: user.displayName ? user.displayName : name,
        email,
        createdAt,
        lastLogin: createdAt,
        avatarUrl: user.photoURL ? user.photoURL : avatarUrl,
      };

      return firestore.createWithId(collectionName, user.uid, User);
    })
    .catch((err) => new GraphQLYogaError(err.code));
}
