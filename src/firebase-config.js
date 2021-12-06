import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA99covSXiR92IrWQJShUe-QyrtfYKP3UA",
  authDomain: "firends-75e77.firebaseapp.com",
  projectId: "firends-75e77",
  storageBucket: "firends-75e77.appspot.com",
  messagingSenderId: "839363626369",
  appId: "1:839363626369:web:e0f5e7e3eab3af73cc9480",
  measurementId: "G-FRVC2F0CCY",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();
