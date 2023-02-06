import admin from "firebase-admin";
import serviceAccount from "./findmykids-c93cf-firebase-adminsdk-mh10z-914e5a4aec.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});




admin.messaging().send({
  notification:{
    title:"Your Child is in Danger",
    body:"Check on maps"
  },
  topic:"SOS",
  // token:"dLEQ0VuLSy-wZyE7fbgdgf:APA91bHnVei6Hv_eNMnLElORqLEVWFjD9g-k-wChUzGiSxMNak48lRf3ViM5hIFheH_u7m6LcYkpg60hCbYY7d5JLUQOKkCGGmhD3zAi2gMYpuzSHxcnh-oC5f1ZYBI5D2kPVncMVUBc",
})