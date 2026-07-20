import { Brain, Sparkles, Target } from "lucide-react";

function HabitHero() {
    return (
        <div className="bg-white rounded-3xl shadow-lg p-10">

            <div className="grid lg:grid-cols-2 gap-10 items-center">

                {/* Left Section */}

                <div>

                    <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold">

                        <Brain size={18} />

                        AI Habit Coach

                    </span>

                    <h1 className="text-6xl font-extrabold leading-tight mt-6">

                        Build Better
                        <br />

                        <span className="text-purple-600">

                            Habits

                        </span>

                        {" "}with AI

                    </h1>

                    <p className="text-gray-500 text-xl mt-6 leading-9">

                        Track your daily habits, identify distractions,
                        improve your productivity, and receive personalized
                        AI-powered guidance to become the best version of yourself.

                    </p>

                    <div className="flex gap-4 mt-8">

                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition flex items-center gap-2">

                            <Target size={20} />

                            Start Tracking

                        </button>

                        <button className="border border-purple-300 text-purple-700 px-8 py-4 rounded-2xl font-semibold hover:bg-purple-50 transition">

                            View Report

                        </button>

                    </div>
                    <br></br>

                </div>

                {/* Right Section */}

                <div className="flex justify-center">

                    <div className="relative">

                        <div className="w-72 h-72 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-2xl">

                            <Brain
                                size={130}
                                className="text-white"
                            />

                        </div>

                        <div className="absolute -top-3 -right-3 bg-yellow-400 p-4 rounded-full shadow-lg">

                            <Sparkles
                                className="text-white"
                                size={26}
                            />

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default HabitHero;