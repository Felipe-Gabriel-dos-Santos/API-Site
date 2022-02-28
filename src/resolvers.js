import firestore from "./firebase/firestore"
import { getDoc, doc } from "firebase/firestore"

export default {
    Query: {
        user: (id) => {
            const docRef = doc(firestore, 'users', id);
             return getDoc(docRef)
             .then(doc => JSON.stringify(doc))
             .catch(err => JSON.stringify(err));
        },
        users: () => User
    },

}