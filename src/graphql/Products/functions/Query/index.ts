import { Firestore } from "../../../../Firebase/firestore";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

export function getProduct(_: any, { id }: { id: string }) {
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
      const products: Object[] = [];
      docs.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      return products;
    })
    .catch((err) => err.message);
}
