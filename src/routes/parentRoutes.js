import express from "express";
import { createCodeHandler } from "../controllers/CreateCodeController.js";
import {
  handleGetLocation,
  handlePostLocation,
} from "../controllers/ChildLocationController.js";

export const parentRouter = express.Router();

parentRouter.get("/coordinate", handleGetLocation);
parentRouter.post("/coordinate", handlePostLocation);
parentRouter.post("/code", createCodeHandler);
