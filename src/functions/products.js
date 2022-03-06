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

export function createProduct() {
  const docRef = collection(Firestore, "products");

  const created_at = new Date().toDateString();
  const number_of_sales = 0;
  const number_of_likes = 0;

  const params = arguments[1];

  const productInfo = {
    ...params,
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

export function updateProduct(_, { id }) {
  const docRef = doc(Firestore, "products", id);

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
