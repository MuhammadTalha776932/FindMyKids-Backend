import express from "express";

export const defaultRouter = express.Router();

defaultRouter.get("/", (req, res) => {
  res.json({
    message: "Test the other",
  });
});
