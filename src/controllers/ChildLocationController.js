import { db } from "../configs/firebase.config.js";
import { doc, getDoc } from "firebase/firestore";

export const handleGetLocation = async (req, res) => {
  res.send({ status: 200, message: "DONE" });
};

// When PARENT requests CHILDs info, send back the CHILD info based on PARENTs code.
export const handlePostLocation = async (req, res) => {
  const id = (await req.body?.data?.user?.uid) || "";
  const deviceID = await req.body.deviceID;

  let arr = [];
  if (deviceID == "Parent") {
    const docRef = doc(db, "parents", id);
    const docSnap = await getDoc(docRef);
    // if parent exists
    if (docSnap.exists()) {
      let response = await getDoc(docRef);
      const childRef = await response?.data()?.code;
      if (typeof childRef === "object") {
        for (const codes of childRef) {
          const colRef = doc(db, "childs", codes);
          let response = await getDoc(colRef).then((documents) =>
            documents.data()
          );
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
