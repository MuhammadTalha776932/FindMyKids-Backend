import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { notificationRouter } from "./routes/NotificationRoutes.js";
import { userRouter } from "./routes/UserRoutes.js";
import { coordinateRoutes } from "./routes/CoordinateRoutes.js";
import { LocationRouter } from "./routes/LocationRoutes.js";
import { defaultRouter } from "./routes/DefaultRoutes.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", defaultRouter); // handling the default routes
app.use("/users", userRouter); // handling the users routes
app.use("/notifications", notificationRouter); // handling the notification routes.
app.use("/child", coordinateRoutes); // handling the coordinate routes
app.use("/parent", LocationRouter); // handling the parent routes

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
