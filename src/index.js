import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { notificationRouter } from "./routes/NotificationRoutes.js";
import { userRouter } from "./routes/UserRoutes.js";
import { coordinateRouter } from "./routes/CoordinateRoutes.js";
import { ChildLocationRouter } from "./routes/ChildLocationRoutes.js";
import { defaultRouter } from "./routes/DefaultRoutes.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", defaultRouter); // handling the default routes
app.use("/users", userRouter); // handling the users routes i.e. SIGN IN/SIGN UP/SIGN OUT
app.use("/notifications", notificationRouter); // handling the notification routes.
app.use("/child", coordinateRouter); // handling the coordinate routes where childs will set its coordinates.
app.use("/parent", ChildLocationRouter); // handling the route for the Parent where it can get its child locations.

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
