import express from "express";
import {
  handleGetLocation,
  handlePostLocation,
} from "../controllers/ChildLocationController.js";

export const ChildLocationRouter = express.Router();

ChildLocationRouter.get("/coordinate", handleGetLocation);
ChildLocationRouter.post("/coordinate", handlePostLocation);
