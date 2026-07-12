import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getDashboard } from "../../services/dashboardService";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const res = await getDashboard();

                setDashboard(res.data.dashboard);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        fetchDashboard();

    }, []);

    if (loading) {

        return (

            <MainLayout>

                <div className="text-center text-2xl mt-20">

                    Loading Dashboard...

                </div>

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl font-bold mb-8">

                    📊 Dashboard

                </h1>

                {/* Statistics */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

                    <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-lg">

                        <h2 className="text-lg">

                            Study Plans

                        </h2>

                        <p className="text-4xl font-bold mt-4">

                            {dashboard.totalStudyPlans}

                        </p>

                    </div>

                    <div className="bg-green-600 text-white rounded-2xl p-6 shadow-lg">

                        <h2 className="text-lg">

                            Quizzes

                        </h2>

                        <p className="text-4xl font-bold mt-4">

                            {dashboard.totalQuizzes}

                        </p>

                    </div>

                    <div className="bg-purple-600 text-white rounded-2xl p-6 shadow-lg">

                        <h2 className="text-lg">

                            Completed

                        </h2>

                        <p className="text-4xl font-bold mt-4">

                            {dashboard.completedQuizzes}

                        </p>

                    </div>

                    <div className="bg-orange-500 text-white rounded-2xl p-6 shadow-lg">

                        <h2 className="text-lg">

                            Highest

                        </h2>

                        <p className="text-4xl font-bold mt-4">

                            {dashboard.highestScore}%

                        </p>

                    </div>

                    <div className="bg-pink-600 text-white rounded-2xl p-6 shadow-lg">

                        <h2 className="text-lg">

                            Average

                        </h2>

                        <p className="text-4xl font-bold mt-4">

                            {dashboard.averageScore}%

                        </p>

                    </div>

                </div>

                {/* Lists */}

                <div className="grid lg:grid-cols-2 gap-8 mt-10">
                    {/* Recent Study Plans */}

                    <div className="bg-white shadow-lg rounded-2xl p-6">

                        <h2 className="text-2xl font-bold mb-6">
                            📚 Recent Study Plans
                        </h2>

                        {
                            dashboard.recentStudyPlans.length === 0 ? (

                                <p className="text-gray-500">
                                    No Study Plans Yet
                                </p>

                            ) : (

                                dashboard.recentStudyPlans.map((plan) => (

                                    <div
                                        key={plan._id}
                                        className="border-b py-4 last:border-0"
                                    >

                                        <h3 className="font-bold text-lg">
                                            {plan.topic}
                                        </h3>

                                        <div className="flex gap-4 mt-2 text-gray-600 text-sm">

                                            <span>
                                                {plan.level}
                                            </span>

                                            <span>
                                                {plan.duration}
                                            </span>

                                        </div>

                                    </div>

                                ))

                            )
                        }

                    </div>

                    {/* Recent Quizzes */}

                    <div className="bg-white shadow-lg rounded-2xl p-6">

                        <h2 className="text-2xl font-bold mb-6">
                            📝 Recent Quizzes
                        </h2>

                        {
                            dashboard.recentQuizzes.length === 0 ? (

                                <p className="text-gray-500">
                                    No Quiz Attempted Yet
                                </p>

                            ) : (

                                dashboard.recentQuizzes.map((quiz) => (

                                    <div
                                        key={quiz._id}
                                        className="border-b py-4 last:border-0"
                                    >

                                        <div className="flex justify-between">

                                            <h3 className="font-bold text-lg">
                                                {quiz.topic}
                                            </h3>

                                            <span className="font-bold text-blue-600">
                                                {quiz.percentage}%
                                            </span>

                                        </div>

                                        <div className="flex gap-4 mt-2 text-gray-600 text-sm">

                                            <span>
                                                {quiz.difficulty}
                                            </span>

                                            <span>
                                                {quiz.score} / {quiz.numberOfQuestions}
                                            </span>

                                        </div>

                                    </div>

                                ))

                            )
                        }

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default Dashboard;                    