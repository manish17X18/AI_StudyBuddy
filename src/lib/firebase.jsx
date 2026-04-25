import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 1. Add this import

const firebaseConfig = {
  apiKey: "AIzaSyCs-7RBIsavD0MsUPKBuXLjGzwnaI6S4ug", 
  authDomain: "study-buddy-21758.firebaseapp.com",
  projectId: "study-buddy-21758",
  storageBucket: "study-buddy-21758.firebasestorage.app",
  messagingSenderId: "71734315557",
  appId: "1:71734315557:web:dad227df6c203d2a28cdcc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // 2. Add this export