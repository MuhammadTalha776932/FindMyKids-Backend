import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../configs/firebase.config.js";

// Making isPaired TRUE on both parent and child sides. ***When the child logs in, it means it has paired to parent.***
export const validatePairing = async (code) => {
  const colRef = collection(db, "parents");
  const q = query(colRef, where("code", "==", code));
  let arr = [];

  const response = await getDocs(q);
  for (const e of response.docs) {
    const id = e.data().uid;
    const parentRef = doc(db, "parents", id);
    const parentSnap = await getDoc(parentRef);
    if (parentSnap.exists()) {
      await setDoc(parentRef, {
        ...parentSnap.data(),
        isPaired: true,
      });
      const parentSnap1 = await getDoc(parentRef);
      arr.push(parentSnap1.data());
    }
  }
  return arr;
};
