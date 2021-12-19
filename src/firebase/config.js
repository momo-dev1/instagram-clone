import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCU-w2-kOB_i2FoZ0LNDifMz9CdEYkitcM",
  authDomain: "instagram-clone-ddac5.firebaseapp.com",
  projectId: "instagram-clone-ddac5",
  storageBucket: "instagram-clone-ddac5.appspot.com",
  messagingSenderId: "914764337875",
  appId: "1:914764337875:web:7746190b812d08fb3cfa26",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
