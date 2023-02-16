import express from "express";
import {
  handleGetCoordinate,
  handlePostCoordinate,
} from "../controllers/CoordinateController.js";

export const coordinateRoutes = express.Router();

coordinateRoutes.get("/coordinate", handleGetCoordinate);
coordinateRoutes.post("/coordinate", handlePostCoordinate);
