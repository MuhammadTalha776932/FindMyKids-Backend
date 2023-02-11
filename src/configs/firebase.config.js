// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
