import express from "express";
import { handleSignOut } from "../controllers/SignOutController.js";
import {
    handleOTPGet,
    handleOTPPost
} from "../controllers/OTPController";

export const optRouter = express.Router();

optRouter.get("/", handleOTPGet);
optRouter.post("/", handleOTPPost);
