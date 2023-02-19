import express from "express";
import {
  handleGetNotification,
  handlePostNotification,
} from "../controllers/NotificationController.js";

export const notificationRouter = express.Router();

notificationRouter.get("/", handleGetNotification);
notificationRouter.post("/", handlePostNotification);
