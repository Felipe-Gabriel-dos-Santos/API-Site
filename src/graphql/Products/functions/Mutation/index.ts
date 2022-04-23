import { Firestore } from "../../../../Firebase/firestore";
import {
  collection,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export function createProduct(
  _: any,
  { productCreateFields }: { productCreateFields: Object }
) {
  const docRef = collection(Firestore, "products");

  const created_at = new Date().toDateString();
  const number_of_sales = 0;
  const number_of_likes = 0;

  const productInfo = {
    ...productCreateFields,
    created_at,
    number_of_sales,
    number_of_likes,
  };

  return addDoc(docRef, productInfo)
    .then((doc) => doc.id)
    .catch((err) => err.message);
}

export function updateProduct(
  _: any,
  { id, productUpdatableFields }: { id: string; productUpdatableFields: any }
) {
  const docRef = doc(Firestore, "products", id);

  return updateDoc(docRef, productUpdatableFields)
    .then(() => {
      return getDoc(docRef)
        .then((doc) => {
          return { id, ...doc.data() };
        })
        .catch((err) => err.message);
    })

    .catch((err) => err.message);
}

export function deleteProduct(_: any, { id }: { id: string }) {
  const docRef = doc(Firestore, "products", id);

  return getDoc(docRef)
    .then((doc) => {
      if (!doc.exists()) {
        return "Product not found";
      } else
        return deleteDoc(docRef)
          .then(() => "Product deleted")
          .catch((err) => err.message);
    })
    .catch((err) => err.message);
}
