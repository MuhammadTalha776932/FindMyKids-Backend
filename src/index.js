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
import { validatePairing } from "./validatePairing.js";
import { generateCode } from "./generateCode.js";

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

// new coordinate update route
app.post("/users/coordinate", async (req, res) => {
  const secCode = await req.body?.data?.code;
  let i = 0;
  const { latitude, longitude, accuracy, altitude, heading, speed } = await req
    .body?.data;
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
          accuracy: accuracy,
          altitude: altitude,
          heading: heading,
          speed: speed,
        },
        curr_coordinate: {
          latitude: latitude,
          longitude: longitude,
          accuracy: accuracy,
          altitude: altitude,
          heading: heading,
          speed: speed,
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
          accuracy: accuracy,
          altitude: altitude,
          heading: heading,
          speed: speed,
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
});

app.post("/coordinate", async (req, res) => {
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
});

app.get("/test", async (req, res) => {
  const code = "A!b024";
  let response = await validatePairing(code).then((response) => {
    console.log("Success");
    setTimeout(() => {
      res.send(response);
    }, 3000);
  });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
