import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    BookOpen,
    Brain,
    CalendarDays,
    BarChart3,
    ArrowRight,
    Trophy,
    ClipboardList,
    Target,
    Sparkles,
} from "lucide-react";

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

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }

        };

        fetchDashboard();

    }, []);

    if (loading) {

        return (

            <MainLayout>

                <div className="flex justify-center items-center h-[70vh]">

                    <h1 className="text-3xl font-bold">

                        Loading Dashboard...

                    </h1>

                </div>

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <div className="space-y-10">

                {/* HERO SECTION */}

                <div className="bg-white rounded-3xl shadow-lg p-10">

                    <div className="grid lg:grid-cols-2 gap-10 items-center">

                        {/* LEFT */}

                        <div>

                            <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">

                                <Sparkles size={18} />

                                AI Powered Learning

                            </span>

                            <h1 className="text-6xl font-extrabold leading-tight mt-6">

                                Learn Smarter
                                <br />

                                with

                                <span className="text-blue-600">

                                    {" "}AI

                                </span>

                            </h1>

                            <p className="text-gray-500 text-xl mt-6 leading-9">

                                Personalized learning paths,

                                AI Tutor,

                                Quiz Generator,

                                Progress Tracking

                                and Smart Study Plans

                                in one platform.

                            </p>

                            <Link

                                to="/ai-tutor"

                                className="inline-flex items-center gap-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition"

                            >

                                Start Learning

                                <ArrowRight size={22} />

                            </Link>

                        </div>

                        {/* RIGHT */}

                        <div className="flex justify-center">

                            <img

                                src="/robot.png"

                                alt="Robot"

                                className="w-[330px]"

                            />

                        </div>

                    </div>

                </div>

                {/* QUICK ACCESS */}

                <div>

                    <div className="flex justify-between items-center mb-6">

                        <h2 className="text-3xl font-bold">

                            Quick Access

                        </h2>

                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

                        <Link
                            to="/ai-tutor"
                            className="bg-white rounded-3xl shadow-lg p-7 hover:shadow-xl transition"
                        >

                            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center">

                                <Brain
                                    className="text-blue-600"
                                    size={32}
                                />

                            </div>

                            <h3 className="font-bold text-2xl mt-5">

                                AI Tutor

                            </h3>

                            <p className="text-gray-500 mt-2">

                                Ask doubts and get instant explanations.

                            </p>

                        </Link>

                        <Link
                            to="/study-plan"
                            className="bg-white rounded-3xl shadow-lg p-7 hover:shadow-xl transition"
                        >

                            <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center">

                                <CalendarDays
                                    className="text-green-600"
                                    size={32}
                                />

                            </div>

                            <h3 className="font-bold text-2xl mt-5">

                                Study Plan

                            </h3>

                            <p className="text-gray-500 mt-2">

                                AI generated personalized roadmap.

                            </p>

                        </Link>

                        <Link
                            to="/quiz"
                            className="bg-white rounded-3xl shadow-lg p-7 hover:shadow-xl transition"
                        >

                            <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center">

                                <ClipboardList
                                    className="text-purple-600"
                                    size={32}
                                />

                            </div>

                            <h3 className="font-bold text-2xl mt-5">

                                Quiz

                            </h3>

                            <p className="text-gray-500 mt-2">

                                Practice AI generated quizzes.

                            </p>

                        </Link>

                        <Link
                            to="/progress"
                            className="bg-white rounded-3xl shadow-lg p-7 hover:shadow-xl transition"
                        >

                            <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center">

                                <BarChart3
                                    className="text-orange-600"
                                    size={32}
                                />

                            </div>

                            <h3 className="font-bold text-2xl mt-5">

                                Progress

                            </h3>

                            <p className="text-gray-500 mt-2">

                                Track your learning journey.

                            </p>

                        </Link>

                    </div>

                </div>

                {/* RECOMMENDED COURSES */}
                <br></br>
                <div>

                    <div className="flex justify-between items-center mb-6">

                        <h2 className="text-3xl font-bold">

                            Recommended For You

                        </h2>

                        <Link
                            to="/resources"
                            className="text-blue-600 font-semibold"
                        >

                            View All →

                        </Link>

                    </div>
                    <br></br>
                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

                        {[
                            {
                                title: "Python Basics",
                                level: "Beginner",
                                progress: 75,
                                color: "bg-blue-600",
                            },
                            {
                                title: "Data Structures",
                                level: "Intermediate",
                                progress: 40,
                                color: "bg-green-600",
                            },
                            {
                                title: "DBMS",
                                level: "Beginner",
                                progress: 60,
                                color: "bg-orange-500",
                            },
                            {
                                title: "Machine Learning",
                                level: "Advanced",
                                progress: 20,
                                color: "bg-purple-600",
                            },
                        ].map((course) => (

                            <div
                                key={course.title}
                                className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition"
                            >

                                <h3 className="text-2xl font-bold">

                                    {course.title}

                                </h3>

                                <p className="text-gray-500 mt-1">

                                    {course.level}

                                </p>

                                <div className="w-full h-3 bg-gray-200 rounded-full mt-5">

                                    <div
                                        className={`${course.color} h-3 rounded-full`}
                                        style={{
                                            width: `${course.progress}%`,
                                        }}
                                    ></div>

                                </div>

                                <p className="mt-3 text-gray-600">

                                    {course.progress}% Completed

                                </p>

                            </div>

                        ))}

                    </div>

                </div>

                {/* ANALYTICS */}
                <br></br>
                <div>

                    <h2 className="text-3xl font-bold mb-6">

                        Your Statistics

                    </h2>

                    <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-5">

                        {[
                            {
                                title: "Study Plans",
                                value: dashboard.totalStudyPlans,
                                color: "bg-blue-600",
                            },
                            {
                                title: "Quizzes",
                                value: dashboard.totalQuizzes,
                                color: "bg-green-600",
                            },
                            {
                                title: "Completed",
                                value: dashboard.completedQuizzes,
                                color: "bg-purple-600",
                            },
                            {
                                title: "Highest",
                                value: `${dashboard.highestScore}%`,
                                color: "bg-orange-500",
                            },
                            {
                                title: "Average",
                                value: `${dashboard.averageScore}%`,
                                color: "bg-pink-600",
                            },
                        ].map((item) => (

                            <div
                                key={item.title}
                                className={`${item.color} rounded-2xl p-6  text-white shadow-lg`}
                            >

                                <p className="text-lg">

                                    {item.title}

                                </p>

                                <h1 className="text-4xl font-bold mt-3">

                                    {item.value}

                                </h1>

                            </div>

                        ))}

                    </div>

                </div>
                <br></br>
                {/* RECENT */}

                <div className="grid lg:grid-cols-2 gap-8">

                    <div className="bg-white rounded-3xl shadow-lg p-8">

                        <h2 className="text-3xl font-bold mb-6">

                            📚 Recent Study Plans

                        </h2>

                        {

                            dashboard.recentStudyPlans.length === 0

                                ?

                                (

                                    <p className="text-gray-500">

                                        No Study Plans Yet

                                    </p>

                                )

                                :

                                dashboard.recentStudyPlans.map((plan) => (

                                    <div
                                        key={plan._id}
                                        className="border-b py-4 last:border-0"
                                    >

                                        <h3 className="font-bold text-xl">

                                            {plan.topic}

                                        </h3>

                                        <p className="text-gray-500">

                                            {plan.level} • {plan.duration}

                                        </p>

                                    </div>

                                ))

                        }

                    </div>

                    <div className="bg-white rounded-3xl shadow-lg p-8">

                        <h2 className="text-3xl font-bold mb-6">

                            📝 Recent Quizzes

                        </h2>

                        {

                            dashboard.recentQuizzes.length === 0

                                ?

                                (

                                    <p className="text-gray-500">

                                        No Quiz Attempted

                                    </p>

                                )

                                :

                                dashboard.recentQuizzes.map((quiz) => (

                                    <div
                                        key={quiz._id}
                                        className="border-b py-4 last:border-0 flex justify-between items-center"
                                    >

                                        <div>

                                            <h3 className="font-bold text-xl">

                                                {quiz.topic}

                                            </h3>

                                            <p className="text-gray-500">

                                                {quiz.difficulty}

                                            </p>

                                        </div>

                                        <div className="text-right">

                                            <p className="font-bold text-blue-600 text-xl">

                                                {quiz.percentage}%

                                            </p>

                                            <p className="text-gray-500">

                                                {quiz.score}/{quiz.numberOfQuestions}

                                            </p>

                                        </div>

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