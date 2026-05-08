import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env["GOOGLE_API_KEY"],
  authDomain: "next-edge-tech.firebaseapp.com",
  projectId: "next-edge-tech",
  storageBucket: "next-edge-tech.firebasestorage.app",
  messagingSenderId: "79155760236",
  appId: "1:79155760236:web:eb0f06190ff477a0ee1c49",
};

const firebaseApp = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0]!;

export const firestoreDb = getFirestore(firebaseApp);
