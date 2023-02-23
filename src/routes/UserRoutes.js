import express from "express";
import { handleSignOut } from "../controllers/SignOutController.js";
import {
  handleGetUser,
  handlePostUser,
} from "../controllers/UserController.js";

export const userRouter = express.Router();

userRouter.get("/", handleGetUser);
userRouter.post("/", handlePostUser);
userRouter.post("/signout", handleSignOut);
