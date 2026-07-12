import StudyPlan from "../models/StudyPlan.js";
import Quiz from "../models/Quiz.js";
import User from "../models/User.js";

export const getDashboard = async (req, res) => {

    try {

        const userId = req.user.id;

        const studyPlans = await StudyPlan.find({ userId });

        const quizzes = await Quiz.find({ userId });

        const user = await User.findById(userId);

        res.json({

            success: true,

            totalStudyPlans: studyPlans.length,

            totalQuizzes: quizzes.length,

            recentStudyPlans: studyPlans.slice(-5).reverse(),

            recentQuizzes: quizzes.slice(-5).reverse(),

            joinedOn: user.createdAt,

            name: user.name,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};