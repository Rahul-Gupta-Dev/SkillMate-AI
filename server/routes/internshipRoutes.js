import express from "express";
import {
    getInternships,
    seedInternships,
    toggleSavedInternship,
    getSavedInternships,
} from "../controllers/internshipController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getInternships);
router.get("/saved", protect, getSavedInternships);
router.post("/seed", protect, seedInternships);
router.post("/save", protect, toggleSavedInternship);

export default router;
