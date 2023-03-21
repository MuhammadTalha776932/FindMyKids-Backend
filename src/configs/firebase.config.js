// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT71kBzRYNpcMdMOLNa4nPt_PXdwYYypo",
  authDomain: "findmykids-pingo.firebaseapp.com",
  projectId: "findmykids-pingo",
  storageBucket: "findmykids-pingo.appspot.com",
  messagingSenderId: "484053342214",
  appId: "1:484053342214:web:e6805a43ab24fb5b8f0b87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
