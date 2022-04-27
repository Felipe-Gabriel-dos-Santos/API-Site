import { getAuth } from "firebase/auth";
import app from "./firebaseConfig";

export const Auth = getAuth(app);
