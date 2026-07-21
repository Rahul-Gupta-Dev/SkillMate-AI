import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createHabit } from "../controllers/habitController.js";

const router = express.Router();

router.post("/", protect, createHabit);

export default router;