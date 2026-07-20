import {
    Brain,
    BadgeCheck,
    AlertTriangle,
    Lightbulb,
    Target,
    TrendingUp,
} from "lucide-react";

function AIHabitCoach() {

    const productivity = 82;

    const goodHabits = [
        "Studied consistently for 5 hours.",
        "Maintained a healthy sleep schedule.",
        "Completed your daily reading target.",
    ];

    const badHabits = [
        "Instagram usage is higher than recommended.",
        "Exercise duration is below target.",
    ];

    const suggestions = [
        "Reduce Instagram usage to less than 1 hour.",
        "Exercise for at least 30 minutes.",
        "Increase study time by 1 hour tomorrow.",
    ];

    return (

        <div className="grid lg:grid-cols-2 gap-8">

            {/* AI Analysis */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

                <div className="flex items-center gap-3 mb-8">

                    <Brain
                        className="text-purple-600"
                        size={30}
                    />

                    <h2 className="text-3xl font-bold">

                        AI Habit Coach

                    </h2>

                </div>

                {/* Good Habits */}

                <div className="bg-green-50 rounded-2xl p-5 mb-6">

                    <div className="flex items-center gap-2 mb-4">

                        <BadgeCheck className="text-green-600" />

                        <h3 className="font-bold text-green-700">

                            Good Habits

                        </h3>

                    </div>

                    <ul className="space-y-3">

                        {goodHabits.map((habit, index) => (

                            <li
                                key={index}
                                className="text-gray-700"
                            >

                                ✅ {habit}

                            </li>

                        ))}

                    </ul>

                </div>

                {/* Bad Habits */}

                <div className="bg-red-50 rounded-2xl p-5 mb-6">

                    <div className="flex items-center gap-2 mb-4">

                        <AlertTriangle className="text-red-600" />

                        <h3 className="font-bold text-red-700">

                            Needs Improvement

                        </h3>

                    </div>

                    <ul className="space-y-3">

                        {badHabits.map((habit, index) => (

                            <li
                                key={index}
                                className="text-gray-700"
                            >

                                ⚠ {habit}

                            </li>

                        ))}

                    </ul>

                </div>

                {/* AI Suggestions */}

                <div className="bg-blue-50 rounded-2xl p-5">

                    <div className="flex items-center gap-2 mb-4">

                        <Lightbulb className="text-blue-600" />

                        <h3 className="font-bold text-blue-700">

                            AI Suggestions

                        </h3>

                    </div>

                    <ul className="space-y-3">

                        {suggestions.map((item, index) => (

                            <li
                                key={index}
                                className="text-gray-700"
                            >

                                💡 {item}

                            </li>

                        ))}

                    </ul>

                </div>

            </div>

            {/* Productivity */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

                <div className="flex items-center gap-3 mb-8">

                    <TrendingUp
                        className="text-green-600"
                        size={30}
                    />

                    <h2 className="text-3xl font-bold">

                        Productivity

                    </h2>

                </div>

                <div className="flex justify-center">

                    <div className="w-52 h-52 rounded-full border-[16px] border-green-500 flex items-center justify-center">

                        <div className="text-center">

                            <h1 className="text-6xl font-bold text-green-600">

                                {productivity}%

                            </h1>

                            <p className="text-gray-500 mt-2">

                                Productivity Score

                            </p>

                        </div>

                    </div>

                </div>

                <div className="bg-purple-50 rounded-2xl p-6 mt-10">

                    <div className="flex items-center gap-2 mb-4">

                        <Target className="text-purple-600" />

                        <h3 className="font-bold text-purple-700">

                            Tomorrow Goal

                        </h3>

                    </div>

                    <p className="text-gray-700 leading-8">

                        Study for 6 hours, reduce Instagram usage
                        below 1 hour, sleep before 11 PM,
                        and complete one AI-generated quiz.

                    </p>

                </div>

            </div>

        </div>

    );

}

export default AIHabitCoach;