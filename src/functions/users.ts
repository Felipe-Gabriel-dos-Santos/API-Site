import { Firestore } from "../Firebase/firestore";
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

export function getUser(_ : any, { id } : {id : string}) {
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
      const users : Object[] = [];

      docs.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });

      return users;
    })
    .catch((err) => err);
}

export function createUser(_ : any, { email, ...args } : {email : string}) {
  const docRef = collection(Firestore, "users");

  const created_at = new Date().toDateString();

  const avatar_url =
    "https://firebasestorage.googleapis.com/v0/b/site-sorri-teste.appspot.com/o/DefaultProfileImage%2Fdefault-profile-image.png?alt=media&token=1742657d-48e1-4a0b-81aa-ea4a8855e910";

  const userInfo = {
    args,
    email,
    created_at,
    avatar_url,
  };

  return getDocs(query(docRef, where("email", "==", email)))
    .then((docs) => {
      if (docs.empty) {
        return addDoc(docRef, userInfo)
          .then((doc) => doc.id)
          .catch((err) => err.message);
      } else return "Email already exists";
    })
    .catch((err) => err.message);
}

export function deleteUser(_ : any, { id } : {id : string}) {
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

export function updateUser(_ : any, { id, ...args } : {id : string}) {
  const docRef = doc(Firestore, "users", id);

  return updateDoc(docRef, args)
    .then(() => {
      return getDoc(docRef)
        .then((doc) => {
          return { id, ...doc.data() };
        })
        .catch((err) => err.message);
    })

    .catch((err) => err.message);
}
