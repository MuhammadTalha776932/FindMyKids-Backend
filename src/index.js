import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { notificationRouter } from "./routes/NotificationRoutes.js";
import { userRouter } from "./routes/UserRoutes.js";
import { coordinateRouter } from "./routes/CoordinateRoutes.js";
import { parentRouter } from "./routes/ParentRoute.js";
import { defaultRouter } from "./routes/DefaultRoutes.js";
import { otpRouter } from "./routes/OTPRoutes.js";
import { createNewCollection } from "./services/Logs.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use((req))


createNewCollection(); // create the logs collection which tracks the url
app.use("/", defaultRouter); // handling the default routes
app.use("/users", userRouter); // handling the users routes i.e. SIGN IN/SIGN UP/SIGN OUT
app.use("/notifications", notificationRouter); // handling the notification routes.
app.use("/child", coordinateRouter); // handling the coordinate routes where childs will set its coordinates.
app.use("/parent", parentRouter); // handling the route for the Parent where it can get its child locations. && new code is generated for the next child and pushed to the array of codes in parent document
app.use("/code", otpRouter); // handling the otp route request and response.
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
