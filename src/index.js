import { db } from "./firebase.config.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
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

import admin from "firebase-admin";
import serviceAccount from "./Muhammad_Talha/findmykids-c93cf-firebase-adminsdk-mh10z-914e5a4aec.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Handling requests targeting all users //

app.get("/", (req, res) => {
  res.json({
    message: "Test the other",
  });
});

app.get("/users/child/notifications", (req, res) => {
  res.status(200);
});

app.post("/users/child/notifications", (req, res) => {
  let title = req.body?.title;
  let body = req.body?.body;
  console.log(title, body);
  admin.messaging().send({
    notification: {
      title: `${title}`,
      body: `${body}`,
    },
    topic: "SOS",
    data: {
      title: `${title}`,
      body: `${body}`,
    },
    fcmOptions: {},

    // token:"dLEQ0VuLSy-wZyE7fbgdgf:APA91bHnVei6Hv_eNMnLElORqLEVWFjD9g-k-wChUzGiSxMNak48lRf3ViM5hIFheH_u7m6LcYkpg60hCbYY7d5JLUQOKkCGGmhD3zAi2gMYpuzSHxcnh-oC5f1ZYBI5D2kPVncMVUBc",
  });
  res.send({ status: 200, message: "OK" });
});

app.get("/:deviceID", async (req, res) => {
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

// new coordinate update route
app.post("/users/coordinate", async (req, res) => {
  const secCode = await req.body?.data?.code;
  let i = 0;
  const { latitude, longitude } = await req.body?.data;
  console.log("====> " + ++i, latitude, longitude);
  const docRef = doc(db, "childs", secCode);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
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
      res.send({ status: 200, message: "Done" });
    } else {
      setDoc(docRef, {
        ...docSnap.data(),
        code: secCode,
        curr_coordinate: {
          latitude: latitude,
          longitude: longitude,
        },
      });
      res.send({ status: 200, message: "Coordinates Updated" });
    }
  }
});

app.post("/users", async (req, res) => {
  const uEmail = req.body.data?.user?.email || "";
  const id = req.body.data?.user?.uid || "";
  const deviceID = req.body.data.deviceID;
  const code = req.body.data.code;

  const data = {
    email: uEmail,
    deviceID: deviceID,
    uid: id,
    code: code,
  };

  if (deviceID == "Parent") {
    const docRef = doc(db, "parents", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      getDoc(docRef).then((response) => {
        const childRef = response?.data()?.child;
        const colRef = doc(db, "childs", childRef);
        getDoc(colRef).then((response) => {
          res.send(response.data());
        });
      });
    } else {
      setDoc(docRef, data).then(res.send({ status: 200, message: "OK" }));
    }
  } else if (deviceID == "Child") {
    const docRef = doc(db, "childs", code);
    const childSnapDoc = await getDoc(docRef);
    if (!childSnapDoc.exists()) {
      setDoc(docRef, data).then(res.send({ status: 200, message: "OK" }));
    } else {
      res.send({ status: 200, message: "Alrady exists" });
    }
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
