import Habit from "../models/Habit.js";

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