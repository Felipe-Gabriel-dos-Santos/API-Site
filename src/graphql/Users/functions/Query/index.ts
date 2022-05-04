import firestore from "../../../../firebase/firestore";

const collectionName = "users";

export function getUser(_: any, { id }: { id: string }) {
  return firestore.read(collectionName, id);
}

export function getUsers() {
  return firestore.readAll(collectionName);
}
