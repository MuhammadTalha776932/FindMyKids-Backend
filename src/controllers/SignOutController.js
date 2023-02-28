import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../configs/firebase.config.js";

// Parent's corresponding child will be unpaired by turning child's isPaired field to false.

export const handleSignOut = async (req, res) => {
  const code = req.body?.data.code;

  const childColRef = collection(db, "childs"); // getting child doc with the code
  const q = query(childColRef, where("code", "==", code));
  const childSnap = await getDocs(q);

  // if the data exists with the code
  if (childSnap.docs[0]?.data()) {
    const childDocRef = doc(db, "childs", childSnap.docs[0].data().code);
    updateDoc(childDocRef, {
      isPaired: false,
    })
      .then(() => res.send({ message: "Signed out successfully", status: 200 }))
      .catch((err) => res.send({ message: err.message }));
  } else {
    // if code NOT matches with any data
    res.send({ message: "Invalid code" });
  }
};
