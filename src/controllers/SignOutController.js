import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../configs/firebase.config.js";

export const handleSignOut = async (req, res) => {
  const id = req.body.uid;

  const parentColRef = collection(db, "parent");
  const q = query(parentColRef, where("uid", "==", ""));
  const parentSnap = await getDocs(q);
  res.send({
    status: "ok",
  });
};
