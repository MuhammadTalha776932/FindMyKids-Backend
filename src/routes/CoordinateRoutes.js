import express from "express";
import { handleGetCoordinate, handlePostCoordinate } from "../controllers/CoordinateController.js";

export const childRouter = express.Router();
const coordinateRoutes = express.Router();

coordinateRoutes.get("/", handleGetCoordinate);

coordinateRoutes.post("/", handlePostCoordinate);

childRouter.use("/coordinate",coordinateRoutes);


