import { db } from "../configs/firebase.config.js";
import { generateCode } from "../services/generateCode.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

// Function to create a new collection in Firestore
export async function createNewCollection() {

  // Create a new collection called "logs"
  const docRefs = doc(db, "logs","123");
  const data = {};
  setDoc(docRefs, data)




  // Log a message to indicate that the new collection has been created
  console.log('New "logs" collection created in Firestore', docRefs);
}

// Function to insert a new document in the "logs" collection
async function addNewLog(logData) {
  // Reference to the Firestore database
  // const db = admin.firestore();

  // Reference to the "logs" collection
  const collectionRef = collection(db, 'logs');

  // Add a new document to the "logs" collection with the given data
  await collectionRef.add(logData);

  // Log a message to indicate that the new document has been added
  console.log('New log added to Firestore:', logData);
}