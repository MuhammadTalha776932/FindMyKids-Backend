// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_UBcakdkqAsf7sxsyfb0m9sZ2Zc4Xw6A",
  authDomain: "ecommerce-9ca03.firebaseapp.com",
  projectId: "ecommerce-9ca03",
  storageBucket: "ecommerce-9ca03.appspot.com",
  messagingSenderId: "38553101218",
  appId: "1:38553101218:web:416d67039142879e9648fb",
  measurementId: "G-SE453K2425"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
