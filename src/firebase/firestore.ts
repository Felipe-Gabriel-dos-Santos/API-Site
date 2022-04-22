import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import app from "./firebaseConfig";

export const Firestore = getFirestore(app);
export const Auth = getAuth(app);
