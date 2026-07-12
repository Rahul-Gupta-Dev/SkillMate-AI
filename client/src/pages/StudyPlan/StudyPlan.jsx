import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { generateStudyPlan } from "../../services/studyPlanService";

function StudyPlan() {

    const [form, setForm] = useState({
        topic: "",
        duration: "30 Days",
        level: "Beginner",
        dailyHours: 2,
        goal: "Placement",
    });

    const [loading, setLoading] = useState(false);
    const [plan, setPlan] = useState("");

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

            const data = {
                userId: "6a52361bc5358e19bddff437",
                ...form,
            };

            const res = await generateStudyPlan(data);

            setPlan(res.data.studyPlan.plan);

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to generate study plan."
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <MainLayout>

            <div className="max-w-5xl mx-auto">

                <h1 className="text-4xl font-bold mb-8">

                    📅 AI Study Plan Generator

                </h1>

                <div className="bg-white rounded-2xl shadow-lg p-8">

                    <div className="grid md:grid-cols-2 gap-6">

                        <input
                            type="text"
                            name="topic"
                            placeholder="Topic (Python, DSA...)"
                            value={form.topic}
                            onChange={handleChange}
                            className="border rounded-xl p-3"
                        />

                        <select
                            name="duration"
                            value={form.duration}
                            onChange={handleChange}
                            className="border rounded-xl p-3"
                        >
                            <option>7 Days</option>
                            <option>15 Days</option>
                            <option>30 Days</option>
                            <option>60 Days</option>
                            <option>90 Days</option>
                        </select>

                        <select
                            name="level"
                            value={form.level}
                            onChange={handleChange}
                            className="border rounded-xl p-3"
                        >
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </select>

                        <select
                            name="dailyHours"
                            value={form.dailyHours}
                            onChange={handleChange}
                            className="border rounded-xl p-3"
                        >
                            <option value={1}>1 Hour</option>
                            <option value={2}>2 Hours</option>
                            <option value={3}>3 Hours</option>
                            <option value={4}>4 Hours</option>
                            <option value={5}>5 Hours</option>
                        </select>

                        <select
                            name="goal"
                            value={form.goal}
                            onChange={handleChange}
                            className="border rounded-xl p-3 md:col-span-2"
                        >
                            <option>Placement</option>
                            <option>Interview</option>
                            <option>College Exam</option>
                            <option>Skill Development</option>
                        </select>

                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
                    >

                        {loading ? "Generating..." : "Generate Study Plan"}

                    </button>

                </div>

                {plan && (

                    <div className="bg-white rounded-2xl shadow-lg mt-10 p-8">

                        <h2 className="text-3xl font-bold mb-6">

                            Your AI Study Plan

                        </h2>

                        <pre className="whitespace-pre-wrap">

                            {plan}

                        </pre>

                    </div>

                )}

            </div>

        </MainLayout>

    );

}

export default StudyPlan;