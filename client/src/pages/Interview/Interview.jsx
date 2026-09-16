import { useEffect, useMemo, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import {
    generateInterview,
    evaluateInterviewAnswer,
    getInterviewSummary,
    getInterviewHistory,
} from "../../services/interviewService";

const categories = [
    "DSA",
    "C Programming",
    "C++",
    "Java",
    "Python",
    "JavaScript",
    "React",
    "Web Development",
    "DBMS",
    "Operating System",
    "Computer Networks",
    "OOP",
    "SQL",
    "HR Interview",
];

const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];
const interviewTypes = ["MCQ", "Technical", "Coding", "HR"];

const defaultForm = {
    category: "Python",
    difficulty: "Intermediate",
    interviewType: "Technical",
    numberOfQuestions: 3,
};

function Interview() {
    const [form, setForm] = useState(defaultForm);
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [session, setSession] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [summary, setSummary] = useState(null);
    const [history, setHistory] = useState([]);
    const [error, setError] = useState("");
    const [result, setResult] = useState(null);

    const currentQuestion = useMemo(() => {
        if (!session || !session.questions || session.questions.length === 0) return null;
        return session.questions[currentIndex];
    }, [session, currentIndex]);

    const fetchSummary = async () => {
        try {
            const res = await getInterviewSummary();
            setSummary(res.data.summary);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchHistory = async () => {
        try {
            const res = await getInterviewHistory();
            setHistory(res.data.sessions || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        let cancelled = false;

        const loadPracticeData = async () => {
            try {
                const [summaryResponse, historyResponse] = await Promise.all([
                    getInterviewSummary(),
                    getInterviewHistory(),
                ]);

                if (!cancelled) {
                    setSummary(summaryResponse.data.summary);
                    setHistory(historyResponse.data.sessions || []);
                }
            } catch (err) {
                console.error(err);
            }
        };

        loadPracticeData();

        return () => {
            cancelled = true;
        };
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: name === "numberOfQuestions" ? Number(value) : value }));
    };

    const startInterview = async () => {
        setError("");
        setResult(null);
        setIsGenerating(true);

        try {
            const res = await generateInterview(form);
            setSession(res.data.session);
            setCurrentIndex(0);
            setAnswer("");
            setResult(null);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to generate interview questions.");
        } finally {
            setIsGenerating(false);
        }
    };

    const submitAnswer = async () => {
        if (!session || !currentQuestion || !answer.trim()) {
            setError("Please enter your answer before submitting.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const payload = {
                sessionId: session._id,
                questionIndex: currentIndex,
                answer,
            };

            const res = await evaluateInterviewAnswer(payload);
            const evaluation = res.data.evaluation;
            setResult(evaluation);

            const nextIndex = currentIndex + 1;

            if (nextIndex >= session.questions.length) {
                setSession(res.data.session);
                setCurrentIndex(session.questions.length - 1);
                setAnswer("");
                setTimeout(() => {
                    fetchSummary();
                    fetchHistory();
                }, 300);
            } else {
                setCurrentIndex(nextIndex);
                setAnswer("");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Evaluation failed.");
        } finally {
            setIsLoading(false);
        }
    };

    const finishSession = () => {
        setResult(null);
        setAnswer("");
        setSession(null);
        setCurrentIndex(0);
    };

    return (
        <MainLayout>
            <div className="space-y-8 max-w-7xl mx-auto">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Interview Preparation</p>
                            <h1 className="text-4xl font-bold text-slate-900 mt-3">AI Interview Practice</h1>
                        </div>
                        <button
                            onClick={startInterview}
                            disabled={isGenerating}
                            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isGenerating ? "Generating..." : "Start New Interview"}
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4">
                    {[
                        { label: "Overall Readiness", value: summary?.readiness ?? 0, suffix: "%" },
                        { label: "Questions Practiced", value: summary?.totalQuestions ?? 0, suffix: "" },
                        { label: "Correct Answers", value: summary?.totalCorrect ?? 0, suffix: "" },
                        { label: "Accuracy", value: summary?.averageAccuracy ?? 0, suffix: "%" },
                        { label: "Interview Streak", value: summary?.interviewStreak ?? 0, suffix: " days" },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                            <p className="text-sm text-slate-500">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-slate-900 mt-3">
                                {stat.value}{stat.suffix}
                            </h3>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-2xl font-bold text-slate-900 mb-5">Interview Setup</h2>

                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Difficulty</label>
                                <select
                                    name="difficulty"
                                    value={form.difficulty}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {difficultyLevels.map((level) => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Interview Type</label>
                                <select
                                    name="interviewType"
                                    value={form.interviewType}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {interviewTypes.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Questions</label>
                                <input
                                    type="number"
                                    name="numberOfQuestions"
                                    min="1"
                                    max="8"
                                    value={form.numberOfQuestions}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
                                {error}
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-2xl font-bold text-slate-900 mb-5">Recent Practice Sessions</h2>
                        {history.length === 0 ? (
                            <div className="text-slate-500 text-sm">No interview sessions yet. Start your first mock interview.</div>
                        ) : (
                            <div className="space-y-3">
                                {history.slice(0, 4).map((item) => (
                                    <div key={item._id} className="border border-slate-200 rounded-xl p-3">
                                        <div className="flex justify-between items-center gap-3">
                                            <div>
                                                <p className="font-semibold text-slate-800">{item.category}</p>
                                                <p className="text-xs text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <span className="text-sm font-semibold text-blue-600">{item.accuracy || 0}%</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">{item.difficulty} • {item.questionsAttempted || 0} questions</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {session && session.questions && session.questions.length > 0 ? (
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <p className="text-sm text-slate-500">Question {currentIndex + 1} / {session.questions.length}</p>
                                <h2 className="text-2xl font-bold text-slate-900">{session.category} Interview</h2>
                            </div>
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                                {session.difficulty}
                            </span>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-5">
                            <p className="text-lg font-medium text-slate-800">{currentQuestion?.question}</p>
                        </div>

                        <textarea
                            value={answer}
                            onChange={(event) => setAnswer(event.target.value)}
                            rows={7}
                            placeholder="Write your answer here..."
                            className="w-full border border-slate-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />

                        <div className="flex flex-wrap gap-3 mt-5">
                            <button
                                onClick={submitAnswer}
                                disabled={isLoading}
                                className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isLoading ? "Evaluating..." : "Submit Answer"}
                            </button>

                            <button
                                onClick={finishSession}
                                className="border border-slate-300 text-slate-700 px-5 py-3 rounded-xl font-semibold hover:bg-slate-100"
                            >
                                End Session
                            </button>
                        </div>

                        {result && (
                            <div className="mt-8 border border-slate-200 rounded-2xl p-5 bg-slate-50">
                                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                                    <h3 className="text-xl font-bold text-slate-900">Evaluation</h3>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                        Score: {result.score}/10
                                    </span>
                                </div>

                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">Correctness</p>
                                        <p className="text-lg font-semibold text-slate-800">{result.correctness}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">Feedback</p>
                                        <p className="text-slate-700">{result.feedback}</p>
                                    </div>
                                </div>

                                <div className="mt-5 grid md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="font-semibold text-slate-800 mb-2">Strengths</p>
                                        <ul className="list-disc list-inside text-slate-700 space-y-1">
                                            {(result.strengths || []).map((item) => <li key={item}>{item}</li>)}
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-800 mb-2">Weaknesses</p>
                                        <ul className="list-disc list-inside text-slate-700 space-y-1">
                                            {(result.weaknesses || []).map((item) => <li key={item}>{item}</li>)}
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <p className="font-semibold text-slate-800 mb-2">Improved Answer</p>
                                    <p className="text-slate-700">{result.improvedAnswer}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10 text-center">
                        <h3 className="text-2xl font-bold text-slate-900">No active interview yet</h3>
                        <p className="text-slate-500 mt-2">Choose a category and start practicing with AI-powered mock interview questions.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

export default Interview;
