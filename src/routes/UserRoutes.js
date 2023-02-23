import express from "express";
import {
  handleGetUser,
  handlePostUser,
} from "../controllers/UserController.js";

export const userRouter = express.Router();

userRouter.get("/", handleGetUser);
userRouter.post("/", handlePostUser);
