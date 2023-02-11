import { db } from "../configs/firebase.config.js";


export const handleGetLocation = async (req, res) => {
    res.send({ status: 200, message: "DONE" });
}

export const handlePostLocation = async (req, res) => {
    const id = req.body?.data?.user?.uid || "";
    const deviceID = req.body.deviceID;
  
    console.log(id);
    console.log(deviceID);
    if (deviceID == "Parent") {
      const docRef = doc(db, "parents", id);
      const docSnap = await getDoc(docRef);
      console.log("coordinate/ if");
      // if parent exists
      if (docSnap.exists()) {
        console.log("coordinate/ exist if");
  
        getDoc(docRef).then((response) => {
          const childRef = response?.data()?.code;
          const colRef = doc(db, "childs", childRef);
          getDoc(colRef).then((response) => {
            res.send(response.data());
          });
        });
      }
    }
  }