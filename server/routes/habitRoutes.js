import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
    createHabit,
    getTodayHabit,
} from "../controllers/habitController.js";

const router = express.Router();

router.post("/", protect, createHabit);

router.get("/today", protect, getTodayHabit);

export default router;