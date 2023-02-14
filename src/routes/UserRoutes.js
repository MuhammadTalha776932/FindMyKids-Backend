import express from "express";
export const userRoutes = express.Router();
import {
  handleGetUser,
  handlePostUser,
} from "../controllers/UserController.js";

userRoutes.get("/", handleGetUser);
userRoutes.post("/", handlePostUser);
