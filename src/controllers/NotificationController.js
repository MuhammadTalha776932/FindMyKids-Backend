import admin from "firebase-admin";
import serviceAccount from "../configs/findmykids-c93cf-firebase-adminsdk-mh10z-914e5a4aec.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
export const handleGetNotification = (req, res) => {
  res.send({ status: 200, message: "Done || OK" });
};
export const handlePostNotification = (req, res) => {
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
};
