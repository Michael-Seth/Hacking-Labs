import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASZqKcTyyEbpbGm158mK987hJjaKjL68A",
  authDomain: "cysec-lab.firebaseapp.com",
  projectId: "cysec-lab",
  storageBucket: "cysec-lab.appspot.com",
  messagingSenderId: "285743517441",
  appId: "1:285743517441:web:d8a4a91aab5e98c8969500",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
