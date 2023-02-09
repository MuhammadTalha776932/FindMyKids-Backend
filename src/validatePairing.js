import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase.config.js";

export const validatePairing = async (code) => {
  const colRef = collection(db, "parents");
  const q = query(colRef, where("code", "==", code));
  let arr = [];
  getDocs(q).then((response) => {
    response.forEach(async (e) => {
      const id = e.data().uid;
      const parentRef = doc(db, "parents", id);
      const parentSnap = await getDoc(parentRef);
      if (parentSnap.exists()) {
        setDoc(parentRef, {
          ...parentSnap.data(),
          isPaired: true,
        });

        const parentSnap1 = await getDoc(parentRef);
        if (parentSnap1.exists()) {
          arr.push(parentSnap1.data());
          console.log(arr);
          //   return arr;
        }
      }
    });
  });
  return arr;
};
