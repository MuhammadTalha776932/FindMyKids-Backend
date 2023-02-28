import { db } from "../configs/firebase.config.js";
import { doc, getDoc } from "firebase/firestore";

export const handleGetLocation = async (req, res) => {
  res.send({ status: 200, message: "DONE" });
};

// When PARENT requests CHILDs info, send back the CHILD info based on PARENTs code. (Only those child will be sent whose isPaired is TRUE)
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
      const childRef = await response?.data()?.code; // getting child's Codes Array
      // if the code field is array
      if (typeof childRef === "object") {
        for (const codes of childRef) {
          const childDocRef = doc(db, "childs", codes); // getting the childs data with the codes
          let response = await getDoc(childDocRef).then((documents) => {
            return documents.data().isPaired ? documents.data() : null;
          });
          if (response) {
            arr.push(response);
          }
        }
        res.send(arr);
      } else {
        // if the code field is string
        const colRef = doc(db, "childs", childRef);
        getDoc(colRef).then((response) => {
          res.send(response.data());
        });
      }
    }
  }
};
