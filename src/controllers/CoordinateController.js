import { db } from "../configs/firebase.config.js";

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

export const handleGetCoordinate = async (req, res) => {
  res.send({ status: 200, message: "DONE" });
};

export const handlePostCoordinate = async (req, res) => {
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
};

