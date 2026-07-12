import User from "../models/User.js";
import StudyPlan from "../models/StudyPlan.js";
import Quiz from "../models/Quiz.js";

export const getProfile = async (req, res) => {
    try {

        const userId = req.user.id;

        const user = await User.findById(userId).select("-password");

        const studyPlans = await StudyPlan.countDocuments({ userId });

        const quizzes = await Quiz.countDocuments({ userId });

        res.json({
            success: true,
            user,
            studyPlans,
            quizzes,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};