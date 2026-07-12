import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getDashboard } from "../../services/dashboardService";

function Dashboard() {

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const res = await getDashboard();

                setData(res.data);

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
                <h1 className="text-3xl">Loading Dashboard...</h1>
            </MainLayout>
        );
    }

    return (

        <MainLayout>

            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl font-bold mb-8">

                    Welcome {data.name} 👋

                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="bg-blue-600 text-white rounded-2xl p-8">

                        <h2 className="text-xl">

                            Study Plans

                        </h2>

                        <p className="text-5xl font-bold mt-3">

                            {data.totalStudyPlans}

                        </p>

                    </div>

                    <div className="bg-green-600 text-white rounded-2xl p-8">

                        <h2 className="text-xl">

                            Quizzes

                        </h2>

                        <p className="text-5xl font-bold mt-3">

                            {data.totalQuizzes}

                        </p>

                    </div>

                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-10">

                    <div className="bg-white shadow rounded-2xl p-6">

                        <h2 className="text-2xl font-bold mb-5">

                            Recent Study Plans

                        </h2>

                        {

                            data.recentStudyPlans.map(plan => (

                                <div
                                    key={plan._id}
                                    className="border-b py-3"
                                >

                                    <h3 className="font-semibold">

                                        {plan.topic}

                                    </h3>

                                    <p className="text-gray-500">

                                        {plan.level}

                                    </p>

                                </div>

                            ))

                        }

                    </div>

                    <div className="bg-white shadow rounded-2xl p-6">

                        <h2 className="text-2xl font-bold mb-5">

                            Recent Quizzes

                        </h2>

                        {

                            data.recentQuizzes.map(quiz => (

                                <div
                                    key={quiz._id}
                                    className="border-b py-3"
                                >

                                    <h3 className="font-semibold">

                                        {quiz.topic}

                                    </h3>

                                    <p className="text-gray-500">

                                        {quiz.difficulty}

                                    </p>

                                </div>

                            ))

                        }

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default Dashboard;