import express from "express";

export const defaultRoutes = express.Router();

defaultRoutes.get("/", (req, res) => {
  res.json({
    message: "Test the other",
  });
});
