import { db } from "../configs/firebase.config.js";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const handleGetCoordinate = async (req, res) => {
  res.send({ status: 200, message: "DONE" });
};

// CHILD will post location after sign in/sign up
// If sent first time, update init and curr coordinates, else update curr_cordinates only.
export const handlePostCoordinate = async (req, res) => {
  const secCode = await req.body?.data?.code;
  const { latitude, longitude, accuracy, altitude, heading, speed } = await req
    .body?.data;

  const docRef = doc(db, "childs", secCode);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let data = docSnap.data();
    let isExist = data["curr_coordinate"];

    // If current coordinates not exist, set both init and curr coordinates
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
      // If current coordinates not exist, set current coordinates only
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
