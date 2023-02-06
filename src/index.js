import { db } from "./firebase.config.js";
import express from "express";
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

const app = express();

app.use(express.json());

// Handling requests targeting all users //

app.get("/",(req,res)=>{
  res.json({
    message:"Test the other"
  })
})


app.get("/users/child/notifications",(req,res)=>{
  res.status(200);
})

app.post("/users/child/notifications",(req,res)=>{
  const {data} = req.body;
  const {notification,topic} = data;
  admin.messaging().send({
    notification:{
      ...notification
    },
    topic:topic,
    // token:"dLEQ0VuLSy-wZyE7fbgdgf:APA91bHnVei6Hv_eNMnLElORqLEVWFjD9g-k-wChUzGiSxMNak48lRf3ViM5hIFheH_u7m6LcYkpg60hCbYY7d5JLUQOKkCGGmhD3zAi2gMYpuzSHxcnh-oC5f1ZYBI5D2kPVncMVUBc",
  })
})


app.get("/users", async (req, res) => {
  const users = [];
  const colRef = collection(db, req.params.deviceID);
  getDocs(colRef).then((result) => {
    const users = [];
    result.docs.forEach((doc) => {
      let data = doc.data();
      users.push({ id: doc.id, ...data });
    });
    res.send(users);
  });
});

// get child data using USERS id.
app.get("/users/:id/childs", (req, res) => {
  const userID = req.params.id;
  const colRef = collection(db, "users", userID, "childs");
  const q = query(colRef, where("secCode", "==", "1Y2AD"));

  const users = [];

  getDocs(q).then((result) => {
    const users = [];
    result.docs.forEach((doc) => {
      let data = doc.data();
      users.push({ id: doc.id, ...data });
    });
    res.send(users);
  });
});

app.post("/users/coordinate", async (req, res) => {
  const secCode = req.body.data.code;
  let i = 0;
  const { latitude, longitude } = req.body.data;
  console.log("====> " + ++i, latitude, longitude);

  const docRef = doc(db, "childs", secCode);

  const docSnap = await getDoc(docRef);
  if (docSnap.exists) {
    console.log(docSnap.data());
    let data = docSnap.data();

    let isExist = data["curr_coordinate"];

    if (!isExist) {
      setDoc(docRef, {
        ...docSnap.data(),
        init_coordinate: {
          latitude: latitude,
          longitude: longitude,
        },
        curr_coordinate: {
          latitude: latitude,
          longitude: longitude,
        },
      });
    } else {
      setDoc(docRef, {
        ...docSnap.data(),
        curr_coordinate: {
          latitude: latitude,
          longitude: longitude,
        },
      });
    }
  }
});

app.post("/users", async (req, res) => {
  const uEmail = req.body.data.email;
  const id = req.body.data.uid;
  const deviceID = req.body.data.deviceID;
  const code = req.body.data.rand;

  const data = {
    email: uEmail,
    deviceID: deviceID,
    uid: id,
  };

  if (deviceID == "Parent") {
    const docRef = doc(db, "parents", id);
    const docSnap = await getDoc(docRef);

    if ((await getDoc()).exists) {
      getDoc(docRef).then((response) => {
        const childRef = response?.data()?.child;
        const colRef = doc(db, "childs", childRef);
        getDoc(colRef).then((response) => {
          res.send(response.data());
        });
      });
    } else {
      console.log("No such document!");
    }
  } else if (deviceID == "Child") {
    const docRef = doc(db, "childs", code);
    setDoc(docRef, data).then((response) => console.log(response));
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
