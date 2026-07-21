import Habit from "../models/Habit.js";

// ================= CREATE HABIT =================

export const createHabit = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            studyHours,
            instagramHours,
            youtubeHours,
            gamingHours,
            otherSocialHours,
            sleepHours,
            exerciseMinutes,
            readingMinutes,
            waterIntake,
            mood,
            goal,
            notes,
        } = req.body;

        const habit = await Habit.create({
            userId,
            studyHours,
            instagramHours,
            youtubeHours,
            gamingHours,
            otherSocialHours,
            sleepHours,
            exerciseMinutes,
            readingMinutes,
            waterIntake,
            mood,
            goal,
            notes,
        });

        res.status(201).json({
            success: true,
            message: "Habit Saved Successfully",
            habit,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= GET TODAY HABIT =================

export const getTodayHabit = async (req, res) => {
    try {
        const userId = req.user.id;

        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const habit = await Habit.findOne({
            userId,
            createdAt: {
                $gte: start,
                $lte: end,
            },
        });

        res.status(200).json({
            success: true,
            habit,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};