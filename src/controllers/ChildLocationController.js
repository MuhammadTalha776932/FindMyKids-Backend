import { db } from "../configs/firebase.config.js";
import { doc, getDoc } from "firebase/firestore";

export const handleGetLocation = async (req, res) => {
  res.send({ status: 200, message: "DONE" });
};

// When PARENT requests CHILDs info, send back the CHILD info based on PARENTs code.
export const handlePostLocation = async (req, res) => {
  const id = req.body?.data?.user?.uid || "";
  const deviceID = req.body.deviceID;

  if (deviceID == "Parent") {
    const docRef = doc(db, "parents", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      getDoc(docRef).then((response) => {
        const childRef = response?.data()?.code;
        const colRef = doc(db, "childs", childRef);
        getDoc(colRef).then((response) => {
          res.send(response.data());
        });
      });
    }
  }
};
