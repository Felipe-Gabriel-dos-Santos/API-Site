import firestore from "../../../../Firebase/firestore";

const collectionName = "products";

export function getProduct(_: any, { id }: { id: string }) {
  return firestore.read(collectionName, id);
}

export function getProducts() {
  return firestore.readAll(collectionName);
}
