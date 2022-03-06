import { Firestore } from "../Firebase/Firestore.js";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export function getProduct(_, { id }) {
  const docRef = doc(Firestore, "products", id);

  return getDoc(docRef)
    .then((doc) => {
      return { id, ...doc.data() };
    })
    .catch((err) => err.message);
}

export function getProducts() {
  const docRef = collection(Firestore, "products");

  return getDocs(docRef)
    .then((docs) => {
      const products = [];
      docs.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      return products;
    })
    .catch((err) => err.message);
}

export function createProduct(_, { ...args }) {
  const docRef = collection(Firestore, "products");

  const created_at = new Date().toDateString();
  const number_of_sales = 0;
  const number_of_likes = 0;

  const productInfo = {
    ...args,
    created_at,
    number_of_sales,
    number_of_likes,
  };

  return addDoc(docRef, productInfo)
    .then((doc) => doc.id)
    .catch((err) => err.message);
}

export function deleteProduct(_, { id }) {
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

export function updateProduct(_, { id, ...args }) {
  const docRef = doc(Firestore, "products", id);

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
