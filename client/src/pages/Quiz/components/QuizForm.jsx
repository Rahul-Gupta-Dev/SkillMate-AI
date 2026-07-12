function QuizForm({
    form,
    handleChange,
    handleGenerate,
    loading,
}) {
    return (
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
                </select>

            </div>

            <button
                onClick={handleGenerate}
                className="bg-blue-600 text-white mt-8 px-8 py-3 rounded-xl"
            >
                {loading ? "Generating..." : "Generate Quiz"}
            </button>

        </div>
    );
}

export default QuizForm;