import express from "express";
import {
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

  handleGetCoordinate,
  handlePostCoordinate,
} from "../controllers/CoordinateController.js";

export const coordinateRouter = express.Router();

coordinateRouter.get("/coordinate", handleGetCoordinate);
coordinateRouter.post("/coordinate", handlePostCoordinate);
