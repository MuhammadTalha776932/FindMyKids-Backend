import { async } from "@firebase/util";
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

export const validatePairing = async (code) => {
  const colRef = collection(db, "parents");
  const q = query(colRef, where("code", "==", code));
  let arr = [];

  const response = await getDocs(q);
  const arrs = response.docs.map(async (e) => {
    // response.forEach(async (e) => {
    const id = e.data().uid;
    const parentRef = doc(db, "parents", id);
    const parentSnap = await getDoc(parentRef);
    if (parentSnap.exists()) {
      await setDoc(parentRef, {
        ...parentSnap.data(),
        isPaired: true,
      });
      // console.log(parentSnap.data());
      arr.push(parentSnap.data());
      return parentSnap.data();
    }
    // });
  });

  // console.log(arr);
  return arr;
};
