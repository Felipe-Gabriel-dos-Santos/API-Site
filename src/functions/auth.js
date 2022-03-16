import { Auth } from "../Firebase/Firestore.js";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { Firestore } from "../Firebase/Firestore.js";
import { collection, addDoc } from "firebase/firestore";

// const provider = new GoogleAuthProvider();

export function loginEmailPassword(_, { email, password }) {
  return signInWithEmailAndPassword(Auth, email, password)
    .then((result) => result.user)
    .catch((err) => err.code);
}

export function createAccount(_, { email, password }) {
  return createUserWithEmailAndPassword(Auth, email, password)
    .then((result) => {
      const docRef = collection(Firestore, "users");

      const created_at = new Date().toDateString();
      const avatar_url =
        "https://firebasestorage.googleapis.com/v0/b/site-sorri-teste.appspot.com/o/DefaultProfileImage%2Fdefault-profile-image.png?alt=media&token=1742657d-48e1-4a0b-81aa-ea4a8855e910";

      const userInfo = {
        id: result.user.uid,
        email,
        password,
        created_at,
        avatar_url,
      };

      return addDoc(docRef, userInfo)
        .then((doc) => doc.id)
        .catch((err) => err.message);
    })
    .catch((err) => err.code);
}

// export function loginGoogle() {
//   return signInWithPopup(Auth, provider)
//     .then((result) => result.user)
//     .catch((err) => err);
// }
