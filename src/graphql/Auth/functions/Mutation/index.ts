import { Auth } from "../../../../Firebase/auth";
import { GraphQLYogaError } from "@graphql-yoga/node";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { Firestore } from "../../../../Firebase/firestore";
import { setDoc, getDoc, doc } from "firebase/firestore";

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

function getUserOnFirestore(documentId: string): Promise<IUser> {
  return new Promise((resolve, reject) => {
    const docRef = doc(Firestore, "users", documentId);

    getDoc(docRef)
      .then((doc) => resolve(doc.data() as IUser))
      .catch((err) => reject(err));
  });
}

function createUserOnFirestore(user: IUser) {
  return new Promise((resolve, reject) => {
    const docRef = doc(Firestore, "users", user.authId);

    return setDoc(docRef, user)
      .then(() => {
        return getUserOnFirestore(user.authId)
          .then((user) => resolve(user))
          .catch((err) => reject(err));
      })

      .catch((err) => reject(err));
  });
}

export function loginEmailPassword(
  _: any,
  { email, password }: { email: string; password: string }
) {
  return signInWithEmailAndPassword(Auth, email, password)
    .then((result) => {
      getUserOnFirestore(result.user.uid)
        .then((user) => user)
        .catch((err) => new GraphQLYogaError(err));
    })
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

      return createUserOnFirestore(User)
        .then((user) => user)
        .catch((err) => new GraphQLYogaError(err.code));
    })
    .catch((err) => new GraphQLYogaError(err.code));
}
