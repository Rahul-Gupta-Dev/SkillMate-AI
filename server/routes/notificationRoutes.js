import express from "express";
import {
    getNotifications,
    markAsRead,
    markAllAsRead,
    createSampleNotification,
} from "../controllers/notificationController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getNotifications);
router.post("/seed", protect, createSampleNotification);
router.put("/:id/read", protect, markAsRead);
router.put("/read-all", protect, markAllAsRead);

export default router;
