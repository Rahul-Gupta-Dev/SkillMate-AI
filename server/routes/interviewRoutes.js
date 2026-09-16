import express from "express";
import {
    generateInterview,
    evaluateInterviewAnswer,
    getInterviewSummary,
    getInterviewHistory,
    getInterviewById,
} from "../controllers/interviewController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/summary", protect, getInterviewSummary);
router.get("/history", protect, getInterviewHistory);
router.get("/:id", protect, getInterviewById);
router.post("/generate", protect, generateInterview);
router.post("/evaluate", protect, evaluateInterviewAnswer);

export default router;
