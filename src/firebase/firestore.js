import { getFirestore } from "firebase/firestore";
import app from "./firebaseConfig.js";

export const Firestore = getFirestore(app);
