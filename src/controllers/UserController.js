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

// Handling login/sign up request for parent and child

export const handlePostUser = async (req, res) => {
  const uEmail = req.body.data?.user?.email || "";
  const id = req.body.data?.user?.uid || "";
  const deviceID = req.body.data.deviceID;
  const isPaired = req.body.data.isPaired;

  const code = generateCode();

  const data = {
    email: uEmail,
    deviceID: deviceID,
    uid: id,
    code: code,
    isPaired: false,
  };

  let arr = [];
  if (deviceID == "Parent") {
    const docRef = doc(db, "parents", id);
    const docSnap = await getDoc(docRef);

    // If Parent exists, send back the paired CHILD & if not exists add the Parent in the firebase.
    if (docSnap.exists()) {
      getDoc(docRef).then((response) => {
        const childRef = response?.data()?.code;
        if (typeof childRef === "object") {
          for (const codes of childRef) {
            const colRef = doc(db, "childs", codes);
            let response = getDoc(colRef).then(documents => documents.data())
            response.then(childDoc => arr.push(childDoc));
          }
          res.send(arr);
        } else {
          const colRef = doc(db, "childs", childRef);
          getDoc(colRef).then((response) => {
            res.send(response.data());
          });
        }
      });
    } else {
      setDoc(docRef, data).then(
        res.send({ status: 200, message: "OK", email: uEmail, code })
      );
    }

    //If the CHILD does NOT exist, add the CHILD info in the firebase and also update isPaired value of its parent to TRUE
    //& if CHILD do exists send back MSG: "Already exists" as well as its parents code, isPaired value
  } else if (deviceID == "Child") {
    const c_code = req.body?.data?.code;
    const name = req.body?.data?.childInfo?.childState?.name;
    const age = req.body?.data?.childInfo?.childState?.age;
    const docRef = doc(db, "childs", c_code);
    const childSnapDoc = await getDoc(docRef);
    if (!childSnapDoc.exists()) {
      const data = {
        email: uEmail,
        deviceID: deviceID,
        uid: id,
        code: c_code,
        name: name,
        age: age,
        isPaired: true,
      };
      await setDoc(docRef, data);
      const response = await validatePairing(c_code);
      await res.send(response);
    } else {
      const colRef = collection(db, "parents");
      const q = query(colRef, where("code", "==", c_code));
      const response = await getDocs(q);
      const obj = response.docs[0];
      res.send([
        {
          status: 200,
          message: "Already exists",
          deviceID: obj.data().deviceID,
          code: obj.data().code,
          isPaired: obj.data().isPaired,
        },
      ]);
    }
  }
};
