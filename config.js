// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRezSu2H7KZA4ST0WLrBek6of6BIis7XI",
  authDomain: "findmykids-153c6.firebaseapp.com",
  projectId: "findmykids-153c6",
  storageBucket: "findmykids-153c6.appspot.com",
  messagingSenderId: "642135074952",
  appId: "1:642135074952:web:cbf3cb0553bba5f0bed73d",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
export const User = collection(db, "users");

// module.exports = { User };
