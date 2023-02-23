import { db } from "../configs/firebase.config.js";
import { generateCode } from "../services/generateCode.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { validatePairing } from "../services/validatePairing.js";

export const handleGetUser = async (req, res) => {
  res.send({ status: 200, message: "Done || OK" });
};

// Handling SIGNIN / SIGNUP request for PARENT and CHILD.

export const handlePostUser = async (req, res) => {
  const uEmail = req.body.data?.user?.email || "";
  const id = req.body.data?.user?.uid || "";
  const deviceID = req.body.data.deviceID;

  if (deviceID == "Parent") {
    const docRef = doc(db, "parents", id);
    const docSnap = await getDoc(docRef);
    // SIGN IN: If Parent exists, send back the paired CHILD data.
    if (docSnap.exists()) {
      getDoc(docRef).then((response) => {
        const childRef = response?.data()?.code;
        const colRef = doc(db, "childs", childRef);
        getDoc(colRef).then((response) => {
          res.send(response.data());
        });
      });
      //SIGN UP: if not exists add the Parent in the firebase.
    } else {
      const code = generateCode();
      const data = {
        email: uEmail,
        deviceID: deviceID,
        uid: id,
        code: code,
        isPaired: false,
      };
      setDoc(docRef, data).then(
        res.send({ status: 200, message: "OK", email: uEmail, code })
      );
    }
    //SIGN IN: If the CHILD does NOT exist, add the CHILD info in the firebase and also update isPaired value of its parent to TRUE
  } else if (deviceID == "Child") {
    const c_code = req.body?.data?.code;
    const docRef = doc(db, "childs", c_code);
    const childSnapDoc = await getDoc(docRef);
    if (!childSnapDoc.exists()) {
      const data = {
        email: uEmail,
        deviceID: deviceID,
        uid: id,
        code: c_code,
        isPaired: true,
      };
      await setDoc(docRef, data);
      const response = await validatePairing(c_code); // Makes Parent isPaired: TRUE and returns the updated Parent Data
      await res.send(response);
    } else {
      //SIGN UP if CHILD do exists send back MSG: "Already exists" as well as its parents code, isPaired value
      const colRef = collection(db, "parents");
      const q = query(colRef, where("code", "==", c_code));
      const response = await getDocs(q);
      const obj = response.docs[0];
      res.send({
        status: 200,
        message: "Already exists",
        deviceID: obj.data().deviceID,
        code: obj.data().code,
        isPaired: obj.data().isPaired,
      });
    }
  }
};
