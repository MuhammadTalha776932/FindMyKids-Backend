import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../configs/firebase.config.js";
import { generateCode } from "../services/generateCode.js";

// new code is generated for the next child and pushed to the array of codes in parent document

export const createCodeHandler = (req, res) => {
  const uEmail = req.body?.data?.user?.email || "";
  const id = req.body?.data?.user?.uid || "";
  const deviceID = req.body?.data?.deviceID || "";

  const code = generateCode();

  const parentdocRef = doc(db, "parents", id);
  updateDoc(parentdocRef, {
    code: arrayUnion(code),
  })
    .then(() => {
      res.send({ code, message: `Code ${code} added successfully` });
    })
    .catch((err) => {
      res.send(err.message);
    });
};
