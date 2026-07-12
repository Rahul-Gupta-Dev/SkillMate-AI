import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { generateQuiz } from "../../services/quizService";

function Quiz() {

    const [form, setForm] = useState({
        topic: "",
        difficulty: "Beginner",
        numberOfQuestions: 5,
    });

    const [loading, setLoading] = useState(false);
    const [quiz, setQuiz] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleGenerate = async () => {

        if (!form.topic.trim()) {
            alert("Please enter a topic.");
            return;
        }

        try {

            setLoading(true);

            const res = await generateQuiz(form);

            setQuiz(res.data.quiz.quiz);

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to generate quiz."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <MainLayout>

            <div className="max-w-5xl mx-auto">

                <h1 className="text-4xl font-bold mb-8">

                    📝 AI Quiz Generator

                </h1>

                <div className="bg-white rounded-2xl shadow-lg p-8">

                    <div className="grid md:grid-cols-3 gap-5">

                        <input
                            type="text"
                            name="topic"
                            placeholder="Topic"
                            value={form.topic}
                            onChange={handleChange}
                            className="border rounded-xl p-3"
                        />

                        <select
                            name="difficulty"
                            value={form.difficulty}
                            onChange={handleChange}
                            className="border rounded-xl p-3"
                        >
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </select>

                        <select
                            name="numberOfQuestions"
                            value={form.numberOfQuestions}
                            onChange={handleChange}
                            className="border rounded-xl p-3"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>

                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
                    >
                        {loading ? "Generating..." : "Generate Quiz"}
                    </button>

                </div>

                {quiz && (

                    <div className="bg-white rounded-2xl shadow-lg mt-10 p-8">

                        <h2 className="text-3xl font-bold mb-6">

                            Generated Quiz

                        </h2>

                        <pre className="whitespace-pre-wrap">

                            {quiz}

                        </pre>

                    </div>

                )}

            </div>

        </MainLayout>

    );

}

export default Quiz;