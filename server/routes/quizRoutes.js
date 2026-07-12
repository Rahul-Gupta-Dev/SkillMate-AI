import express from "express";
import {
    generateQuiz,
    submitQuiz,
} from "../controllers/quizController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", protect, generateQuiz);

router.post("/submit/:id", protect, submitQuiz);

export default router;