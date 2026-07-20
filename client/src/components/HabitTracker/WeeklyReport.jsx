import {
    FileText,
    TrendingUp,
    Target,
    Lightbulb,
} from "lucide-react";

function WeeklyReport() {

    return (

        <div className="bg-white rounded-3xl shadow-lg p-8">

            <div className="flex items-center gap-3 mb-8">

                <FileText
                    className="text-purple-600"
                    size={30}
                />

                <h2 className="text-3xl font-bold">

                    AI Weekly Report

                </h2>
                <br></br>
                <br></br>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">

                {/* Progress */}

                <div className="bg-blue-50 rounded-2xl p-6">

                    <TrendingUp
                        className="text-blue-600 mb-4"
                        size={32}
                    />

                    <h3 className="font-bold text-xl">

                        Progress

                    </h3>

                    <ul className="mt-4 space-y-3 text-gray-700">

                        <li>✅ Study improved by 18%</li>

                        <li>✅ Reading consistency increased</li>

                        <li>✅ Better sleep routine</li>

                    </ul>

                </div>

                {/* AI Advice */}

                <div className="bg-green-50 rounded-2xl p-6">

                    <Lightbulb
                        className="text-green-600 mb-4"
                        size={32}
                    />

                    <h3 className="font-bold text-xl">

                        AI Advice

                    </h3>

                    <p className="mt-4 leading-8 text-gray-700">

                        Continue your current study routine.
                        Reduce Instagram usage during study hours.
                        Exercise for 30 minutes daily to improve concentration.

                    </p>

                </div>

                {/* Goal */}

                <div className="bg-orange-50 rounded-2xl p-6">

                    <Target
                        className="text-orange-600 mb-4"
                        size={32}
                    />

                    <h3 className="font-bold text-xl">

                        Next Week Goal

                    </h3>

                    <ul className="mt-4 space-y-3 text-gray-700">

                        <li>🎯 Study 35 Hours</li>

                        <li>🎯 Instagram &lt; 7 Hours</li>

                        <li>🎯 Complete 3 Quizzes</li>

                        <li>🎯 Sleep 7+ Hours Daily</li>

                    </ul>

                </div>

            </div>

        </div>

    );

}

export default WeeklyReport;