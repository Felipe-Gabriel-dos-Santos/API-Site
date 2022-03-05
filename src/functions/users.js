import { Firestore } from "../Firebase/Firestore.js";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  query,
  where,
  deleteDoc,
  updateDoc,
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

export function createUser(_, { email }) {
  const docRef = collection(Firestore, "users");

  const created_at = new Date().toDateString();

  const params = arguments[1];

  const avatar_url =
    "https://firebasestorage.googleapis.com/v0/b/site-sorri-teste.appspot.com/o/DefaultProfileImage%2Fdefault-profile-image.png?alt=media&token=1742657d-48e1-4a0b-81aa-ea4a8855e910";

  return getDocs(query(docRef, where("email", "==", email)))
    .then((docs) => {
      if (docs.empty) {
        return addDoc(docRef, { ...params, created_at, avatar_url })
          .then((doc) => doc.id)
          .catch((err) => err.message);
      } else return "Email already exists";
    })
    .catch((err) => err.message);
}

export function deleteUser(_, { id }) {
  const docRef = doc(Firestore, "users", id);

  return getDoc(docRef)
    .then((doc) => {
      if (!doc.exists()) {
        return "User not found";
      } else
        return deleteDoc(docRef)
          .then(() => "User deleted")
          .catch((err) => err.message);
    })
    .catch((err) => err.message);
}

export function updateUser(_, { id }) {
  const docRef = doc(Firestore, "users", id);

  const obj = new Object();
  const params = arguments[1];

  // takes everything
  // received as a parameter
  // through GraphQL and adds it to
  // the empty object (with the exception of the Id)

  Object.keys(params).forEach((key) => {
    if (params[key] !== id) obj[key] = params[key];
  });

  return updateDoc(docRef, obj)
    .then(() => {
      return getDoc(docRef)
        .then((doc) => {
          return { id, ...doc.data() };
        })
        .catch((err) => err.message);
    })

    .catch((err) => err.message);
}
