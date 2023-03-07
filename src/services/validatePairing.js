import { db } from "../configs/firebase.config.js";
import { collection, query, where, getDocs } from "firebase/firestore";

export const validatePairing = async (code) => {
  const colRef = collection(db, "parents");
  const q = query(colRef, where("code", "array-contains", code));
  const response = await getDocs(q);

  // Testing purpose... only

  console.log("===>>>",response);

  if (response.docs[0]?.exists()) {
    return true; // if code exists in the parent, only then return true
  } else {
    return false;
  }
};
