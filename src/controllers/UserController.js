import { db } from "../configs/firebase.config.js";
import { generateCode } from "../services/generateCode.js";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const handleGetUser = async (req, res) => {
  res.send({ status: 200, message: "Done || OK" });
};

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

  if (deviceID == "Parent") {
    const docRef = doc(db, "parents", id);
    const docSnap = await getDoc(docRef);

    // if parent exists
    if (docSnap.exists()) {
      getDoc(docRef).then((response) => {
        const childRef = response?.data()?.code;
        const colRef = doc(db, "childs", childRef);
        getDoc(colRef).then((response) => {
          res.send(response.data());
        });
      });
    } else {
      setDoc(docRef, data).then(
        res.send({ status: 200, message: "OK", email: uEmail, code })
      );
    }
  } else if (deviceID == "Child") {
    const c_code = req.body?.data?.code;
    const docRef = doc(db, "childs", c_code);
    const childSnapDoc = await getDoc(docRef);
    if (!childSnapDoc.exists()) {
      setDoc(docRef, data).then((response) => {
        if (response) {
          validatePairing(code).then((response) => {
            setTimeout(() => {
              res.send(response);
            }, 3000);
          });
        }
      });
      //change parent field isPaired to true.. Write code below
    } else {
      res.send({ status: 200, message: "Alrady exists" });
    }
  }
};
