import express from "express";
import {
  handleGetLocation,
  handlePostLocation,
} from "../controllers/LocationController.js";

export const LocationRouter = express.Router();

LocationRouter.get("/coordinate", handleGetLocation);
LocationRouter.post("/coordinate", handlePostLocation);
