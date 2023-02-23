import express from "express";
import {
  handleGetCoordinate,
  handlePostCoordinate,
} from "../controllers/CoordinateController.js";

export const coordinateRouter = express.Router();

coordinateRouter.get("/coordinate", handleGetCoordinate);
coordinateRouter.post("/coordinate", handlePostCoordinate);
