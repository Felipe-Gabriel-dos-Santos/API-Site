import {
  getFirestore,
  WithFieldValue,
  UpdateData,
  Firestore as FirestoreType,
  collection,
  addDoc,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import app from "./firebaseConfig";

class Firestore {
  private db: FirestoreType;

  constructor() {
    this.db = getFirestore(app);
  }

  create(
    collectionName: string,
    data: WithFieldValue<Object>
  ): Promise<string> {
    const collectionRef = collection(this.db, collectionName);

    return addDoc(collectionRef, data)
      .then((doc) => doc.id)
      .catch((err) => err.code);
  }

  createWithId(
    collectionName: string,
    documentId: string,
    data: WithFieldValue<Object>
  ) {
    const documentRef = doc(this.db, collectionName, documentId);

    return setDoc(documentRef, data)
      .then(() => documentId)
      .catch((err) => err.code);
  }

  read(collectionName: string, documentId: string): Promise<Object> {
    const documentRef = doc(this.db, collectionName, documentId);

    return getDoc(documentRef)
      .then((doc) => doc.data())
      .catch((err) => err.code);
  }

  readWithWhere(
    collectionName: string,
    whereField: {
      documentField: string;
      operator: "==" | ">" | "<" | ">=" | "<=" | "array-contains";
      valueToCompare:
        | string
        | number
        | boolean
        | Array<string | number | boolean>;
    }
  ) {
    const { documentField, operator, valueToCompare } = whereField;
    const collectionRef = collection(this.db, collectionName);

    const q = query(
      collectionRef,
      where(documentField, operator, valueToCompare)
    );

    return getDocs(q)
      .then((docs) => {
        docs.forEach((doc) => {
          const list: Object[] = [];
          list.push({ documentId: doc.id, ...doc.data() });

          return list;
        });
      })
      .catch((err) => err.code);
  }

  readAll(collectionName: string): Promise<Object[]> {
    const collectionRef = collection(this.db, collectionName);

    return getDocs(collectionRef)
      .then((docs) => {
        const list: Object[] = [];

        docs.forEach((doc) => {
          list.push({ documentId: doc.id, ...doc.data() });
        });

        return list;
      })
      .catch((err) => err.code);
  }

  update(
    collectionName: string,
    documentId: string,
    fieldsToUpdate: UpdateData<any>
  ): Promise<Object> {
    const documentRef = doc(this.db, collectionName, documentId);

    return updateDoc(documentRef, fieldsToUpdate)
      .then(() => {
        return this.read(collectionName, documentId);
      })
      .catch((err) => err.code);
  }

  delete(
    collectionName: string,
    documentId: string
  ): Promise<{ message: string; code: number }> {
    const documentRef = doc(this.db, collectionName, documentId);

    return deleteDoc(documentRef)
      .then(() => {
        return { message: "Document deleted", code: 200 };
      })
      .catch((err) => {
        return { message: err.code, code: 404 };
      });
  }
}

export default new Firestore();
