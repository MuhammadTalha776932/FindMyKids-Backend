import express from "express";
import {
    handleOTPGet,
    handleOTPPost
} from "../controllers/OTPController.js";

export const otpRouter = express.Router();

otpRouter.get("/", handleOTPGet);
otpRouter.post("/", handleOTPPost);
