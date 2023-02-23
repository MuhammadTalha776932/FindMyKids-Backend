import { db } from "../configs/firebase.config.js";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export const handleGetLocation = async (req, res) => {
  res.send({ status: 200, message: "DONE" });
};

export const handlePostLocation = async (req, res) => {
  const id = await req.body?.data?.user?.uid || "";
  const deviceID = await req.body.deviceID;

  let arr = [];
  if (deviceID == "Parent") {
    const docRef = doc(db, "parents", id);
    const docSnap = await getDoc(docRef);
    console.log("coordinate/ if");
    // if parent exists
    if (docSnap.exists()) {
      console.log("coordinate/ exist if");
      let response = await getDoc(docRef);
      const childRef = await response?.data()?.code;
      if (typeof childRef === "object") {
        for (const codes of childRef) {
          const colRef = doc(db, "childs", codes);
          let response = await getDoc(colRef).then(documents => documents.data())
          arr.push(response);
        }
        res.send(arr);
      } else {
        const colRef = doc(db, "childs", childRef);
        getDoc(colRef).then((response) => {
          res.send(response.data());
        });
      }
    }
  }
};
