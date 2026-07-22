import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
    createHabit,
    getTodayHabit,
    updateHabit,
} from "../controllers/habitController.js";

const router = express.Router();

router.post("/", protect, createHabit);

router.get("/today", protect, getTodayHabit);

router.put("/today", protect, updateHabit);

export default router;