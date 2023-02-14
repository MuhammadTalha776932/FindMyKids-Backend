import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { notificationRoutes } from "./routes/NotificationRoutes.js";
import { userRoutes } from "./routes/UserRoutes.js";
import { childRouter } from "./routes/CoordinateRoutes.js";
import { parentRouter } from "./routes/LocationRoutes.js";
import { defaultRoutes } from "./routes/default.routes.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", defaultRoutes); // handling the default routes
app.use("/users", userRoutes); // handling the users routes
app.use("/notifications", notificationRoutes); // handling the notification routes.
app.use("/child", childRouter); // handling the coordinate routes
app.use("/parent", parentRouter); // handling the parent routes

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
