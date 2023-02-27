import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../configs/firebase.config.js";

export const handleSignOut = async (req, res) => {
  const code = req.body.code;

  const childColRef = collection(db, "childs");
  const q = query(childColRef, where("code", "==", code));
  const parentSnap = await getDocs(q);
  if (parentSnap.docs[0]?.data()) {
    res.send({ data: parentSnap.docs[0].data(), status: 200 });
  } else {
    res.send({ msg: "Something went wrong" });
  }
};
