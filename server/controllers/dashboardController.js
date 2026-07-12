import Quiz from "../models/Quiz.js";
import StudyPlan from "../models/StudyPlan.js";

export const getDashboard = async (req, res) => {
    try {

        const userId = req.user.id;

        const quizzes = await Quiz.find({ userId });

        const studyPlans = await StudyPlan.find({ userId });

        const completedQuizzes = quizzes.filter(
            (quiz) => quiz.completed
        );

        const totalStudyPlans = studyPlans.length;

        const totalQuizzes = quizzes.length;

        const highestScore = completedQuizzes.length
            ? Math.max(...completedQuizzes.map((quiz) => quiz.percentage))
            : 0;

        const averageScore = completedQuizzes.length
            ? Math.round(
                completedQuizzes.reduce(
                    (sum, quiz) => sum + quiz.percentage,
                    0
                ) / completedQuizzes.length
            )
            : 0;

        const recentStudyPlans = studyPlans
            .sort(
                (a, b) =>
                    new Date(b.updatedAt) - new Date(a.updatedAt)
            )
            .slice(0, 5);

        const recentQuizzes = completedQuizzes
            .sort(
                (a, b) =>
                    new Date(b.updatedAt) - new Date(a.updatedAt)
            )
            .slice(0, 5);

        res.json({
            success: true,
            dashboard: {
                totalStudyPlans,
                totalQuizzes,
                completedQuizzes: completedQuizzes.length,
                highestScore,
                averageScore,
                recentStudyPlans,
                recentQuizzes,
            },
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};