function HeroSection() {
    return (
        <section className="bg-white rounded-3xl shadow-sm p-10 flex justify-between items-center">

            <div>

                <h1 className="text-6xl font-bold leading-tight">

                    Learn Smarter

                    <br />

                    with

                    <span className="text-blue-600"> AI</span>

                </h1>

                <p className="text-gray-500 mt-5 text-lg max-w-lg">

                    Personalized learning paths,
                    AI-powered doubt solving,
                    quizzes and much more.

                </p>

                <button className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700">

                    Start Learning →

                </button>

            </div>

            <div className="text-[180px]">

                🤖

            </div>

        </section>
    );
}

export default HeroSection;