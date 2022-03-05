import { Firestore } from "../Firebase/Firestore.js";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  query,
  where,
} from "firebase/firestore";

export function getUser(_, { id }) {
  const docRef = doc(Firestore, "users", id);

  return getDoc(docRef)
    .then((doc) => {
      return { id, ...doc.data() };
    })
    .catch((err) => err);
}

export function getUsers() {
  const docRef = collection(Firestore, "users");

  return getDocs(docRef)
    .then((docs) => {
      const users = [];

      docs.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });

      return users;
    })
    .catch((err) => err);
}

export function createUser(_, { name, email, password }) {
  const docRef = collection(Firestore, "users");

  const created_at = new Date().getUTCDate();
  const avatar_url =
    "https://firebasestorage.googleapis.com/v0/b/site-sorri-teste.appspot.com/o/DefaultProfileImage%2Fdefault-profile-image.png?alt=media&token=1742657d-48e1-4a0b-81aa-ea4a8855e910";

  return getDocs(query(docRef, where("email", "==", email)))
    .then((docs) => {
      if (docs.empty) {
        return addDoc(docRef, { name, email, password, avatar_url, created_at })
          .then((doc) => doc.id)
          .catch((err) => err.message);
      } else return "Email already exists";
    })
    .catch((err) => err.message);
}
