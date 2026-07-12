import express from "express";
import { generateStudyPlan } from "../controllers/studyPlanController.js";

const router = express.Router();

router.post("/generate", generateStudyPlan);

export default router;