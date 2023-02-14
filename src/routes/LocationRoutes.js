import express from "express";
import {
  handleGetLocation,
  handlePostLocation,
} from "../controllers/LocationController.js";

export const parentRouter = express.Router();
const LocationRoutes = express.Router();

LocationRoutes.get("/", handleGetLocation);
LocationRoutes.post("/", handlePostLocation);
parentRouter.use("/coordinate", LocationRoutes);
