import { Firestore } from "../../../../Firebase/firestore";
import { getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";

export function updateUser(
  _: any,
  { id, updatableUserFields }: { id: string; updatableUserFields: any }
) {
  const docRef = doc(Firestore, "users", id);

  return updateDoc(docRef, updatableUserFields)
    .then(() => {
      return getDoc(docRef)
        .then((doc) => {
          return { id, ...doc.data() };
        })
        .catch((err) => err.message);
    })

    .catch((err) => err.message);
}

export function deleteUser(_: any, { id }: { id: string }) {
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
