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
// child collection document isPaired updates
  const childRef = doc(db,"childs",code);
  getDoc(childRef).then(childDoc => {
    if (childDoc) {
      setDoc(childRef,{
        ...childDoc,
        isPaired:true
      })
    }
  }).catch(error => console.log(error?.message));
// End
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
        }
      }
    });
  });
  return arr;
};
