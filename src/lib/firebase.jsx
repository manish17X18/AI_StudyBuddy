import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 1. Add this import

const firebaseConfig = {
  apiKey: "Mykey", 
  authDomain: "study-buddy-21758.firebaseapp.com",
  projectId: "study-buddy-21758",
  storageBucket: "study-buddy-21758.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "123456789"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // 2. Add this export