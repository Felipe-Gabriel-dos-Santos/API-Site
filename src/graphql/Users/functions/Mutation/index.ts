import firestore from "../../../../firebase/firestore";

const collectionName = "users";

export function updateUser(
  _: any,
  { id, updatableUserFields }: { id: string; updatableUserFields: any }
) {
  return firestore.update(collectionName, id, updatableUserFields);
}

export function deleteUser(_: any, { id }: { id: string }) {
  return firestore.delete(collectionName, id);
}
