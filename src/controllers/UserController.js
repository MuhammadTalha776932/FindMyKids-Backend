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

  let arr = [];
  if (deviceID == "Parent") {
    const docRef = doc(db, "parents", id);
    const docSnap = await getDoc(docRef);
    // SIGN IN: If Parent exists, send back array of paired CHILD objects.
    if (docSnap.exists()) {
      const response = await getDoc(docRef);

      const childRef = await response?.data()?.code;
      // if the code in the Parent data is an Array
      if (typeof childRef === "object") {
        for (const codes of childRef) {
          const colRef = doc(db, "childs", codes);
          let response = await getDoc(colRef).then((documents) => {
            return documents.data()?.isPaired ? documents.data() : null;
          });
          if (response) {
            arr.push(response);
          }
        }
        // Note don't delete Added by Muhammad Talha To handle the empty array return when parent have code but not paired with child.
        if (arr.length !== 0) {
          res.send(arr);
        } else {
          // Note don't delete Added by Muhammad Talha To send the code that is parent contains. Because child's are not paired. 
          const docRef = doc(db, "parents", id);
          const docSnap = await getDoc(docRef);
          const filterForCode = docSnap.data()?.code
          res.send({code:filterForCode});
        }
      } else {
        //if not array
        const colRef = doc(db, "childs", childRef);
        getDoc(colRef).then((response) => {
          res.send(response.data());
        });
      }
      //SIGN UP: if not exists add the Parent in the firebase.
    } else {
      const code = generateCode();
      const data = {
        email: uEmail,
        deviceID: deviceID,
        uid: id,
        code: [code],
      };
      setDoc(docRef, data)
        .then(() => {
          res.send({ status: 200, message: "OK", email: uEmail, code });
        })
        .catch((err) => res.send({ message: err.message }));
    }
  } else if (deviceID == "Child") {
    const c_code = req.body?.data?.code;
    const name = req.body?.data?.childInfo?.childState?.name || "";
    const age = req.body?.data?.childInfo?.childState?.age || 0;
    const docRef = doc(db, "childs", c_code);
    const childSnapDoc = await getDoc(docRef);
    const response = await validatePairing(c_code); // Checks if code exists in parent return true otherwise false.

    /////////// If code exists in the parent/////////////
    if (response) {
      //SIGN UP: If the CHILD does NOT exist, add the CHILD info in the firebase
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
        res.send([data]);
      } else {
        //SIGN IN: if CHILD do exists send back MSG: "Already exists" as well as its parents code, isPaired value
        const docRef = doc(db, "childs", c_code);
        const response = await getDoc(docRef);
        if (response.data().uid === id) {
          // If the uid of child matches with the uid in the DB
          res.send([
            {
              status: 200,
              message: "Already exists",
              deviceID: response.data().deviceID,
              code: response.data().code,
              isPaired: response.data().isPaired,
              uid: response.data().uid,
            },
          ]);
        } else {
          // If the uid of child NOT matches with the uid in the DB
          res.send({ Message: "A user has already logged in with this code" });
        }
        // const obj = response.docs[0];
      }
    } else {
      /////////// If code NOT exists in the parent////////////
      res.send({ message: "Invalid Code" });
    }
  }
};
