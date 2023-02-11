import express from "express";
import { handleGetNotification, handlePostNotification } from "../controllers/NotificationController.js";

export const notificationRoutes = express.Router();

notificationRoutes.get("/", handleGetNotification);
notificationRoutes.post("/",handlePostNotification);
