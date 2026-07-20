import express from "express";

import {
    createHabit,
    getHabits,
    getTodayHabit,
    analyzeHabit,
    deleteHabit,
} from "../controllers/habitController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createHabit);

router.get("/", protect, getHabits);

router.get("/today", protect, getTodayHabit);

router.post("/analyze", protect, analyzeHabit);

router.delete("/:id", protect, deleteHabit);

export default router;