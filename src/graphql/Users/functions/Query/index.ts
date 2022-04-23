import { Firestore } from "../../../../Firebase/firestore";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

export function getUser(_: any, { id }: { id: string }) {
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
      const users: Object[] = [];

      docs.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });

      return users;
    })
    .catch((err) => err);
}
