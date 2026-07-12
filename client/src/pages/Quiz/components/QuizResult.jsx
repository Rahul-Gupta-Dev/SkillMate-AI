function QuizResult({
    score,
    total,
    questions,
    answers,
    restart,
}) {

    const percentage = Math.round((score / total) * 100);

    const getPerformance = () => {
        if (percentage >= 90) return "🏆 Excellent";
        if (percentage >= 70) return "🎉 Good Job";
        if (percentage >= 50) return "🙂 Keep Practicing";
        return "💪 Needs Improvement";
    };

    return (

        <div className="max-w-4xl mx-auto">

            <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

                <h1 className="text-4xl font-bold">
                    Quiz Completed 🎉
                </h1>

                <p className="text-2xl mt-4">
                    {getPerformance()}
                </p>

                <h2 className="text-6xl font-bold text-green-600 mt-8">
                    {score} / {total}
                </h2>

                <p className="text-2xl mt-3">
                    {percentage}% Score
                </p>

            </div>

            <div className="mt-8 space-y-6">

                {
                    questions.map((question, index) => {

                        const selected = answers[index];

                        const correct = selected === question.answer;

                        return (

                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg p-6"
                            >

                                <h2 className="text-xl font-bold mb-4">

                                    Q{index + 1}. {question.question}

                                </h2>

                                <p>

                                    <span className="font-semibold">

                                        Your Answer :

                                    </span>

                                    <span
                                        className={
                                            correct
                                                ? "text-green-600 font-bold"
                                                : "text-red-600 font-bold"
                                        }
                                    >

                                        {" "}

                                        {selected || "Not Answered"}

                                    </span>

                                </p>

                                <p className="mt-2">

                                    <span className="font-semibold">

                                        Correct Answer :

                                    </span>

                                    <span className="text-green-600 font-bold">

                                        {" "}

                                        {question.answer}

                                    </span>

                                </p>

                                <p className="mt-3 text-gray-700">

                                    <span className="font-semibold">

                                        Explanation :

                                    </span>

                                    {" "}

                                    {question.explanation}

                                </p>

                            </div>

                        );

                    })

                }

            </div>

            <div className="text-center mt-10">

                <button
                    onClick={restart}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
                >

                    Generate New Quiz

                </button>

            </div>

        </div>

    );

}

export default QuizResult;