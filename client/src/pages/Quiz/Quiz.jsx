import MainLayout from "../../layouts/MainLayout";
import QuizForm from "./components/QuizForm";
import QuestionCard from "./components/QuestionCard";
import QuizResult from "./components/QuizResult";
import { generateQuiz, submitQuiz } from "../../services/quizService";
import { useState, useEffect } from "react";
function Quiz() {

    const [form, setForm] = useState({
        topic: "",
        difficulty: "Beginner",
        numberOfQuestions: 5,
    });

    const [timeLeft, setTimeLeft] = useState(600); // 10 Minutes

    const [loading, setLoading] = useState(false);

    const [quiz, setQuiz] = useState(null);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [answers, setAnswers] = useState({});

    const [score, setScore] = useState(0);

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleGenerate = async () => {

        if (!form.topic.trim()) {
            return alert("Please enter a topic.");
        }

        try {

            setLoading(true);

            const res = await generateQuiz(form);

            setQuiz(res.data.quiz);
            setCurrentQuestion(0);
            setAnswers({});
            setSubmitted(false);
            setScore(0);
            setTimeLeft(600);

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Quiz generation failed."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleSelect = (option) => {

        setAnswers({

            ...answers,

            [currentQuestion]: option,

        });

    };

    const handleNext = () => {

        if (currentQuestion < quiz.questions.length - 1) {

            setCurrentQuestion(currentQuestion + 1);

        }

    };

    const handlePrev = () => {

        if (currentQuestion > 0) {

            setCurrentQuestion(currentQuestion - 1);

        }

    };

    useEffect(() => {

        if (!quiz || submitted) return;

        if (timeLeft === 0) {

            handleSubmit();

            return;

        }

        const timer = setTimeout(() => {

            setTimeLeft(timeLeft - 1);

        }, 1000);

        return () => clearTimeout(timer);

    }, [timeLeft, quiz, submitted]);

    const handleSubmit = async () => {

        let correct = 0;

        quiz.questions.forEach((question, index) => {

            if (answers[index] === question.answer) {
                correct++;
            }

        });

        const percentage = Math.round(
            (correct / quiz.questions.length) * 100
        );

        setScore(correct);

        try {

            await submitQuiz(quiz._id, {
                score: correct,
                percentage,
            });

        } catch (error) {

            console.error(error);

            alert("Failed to save quiz result.");

        }

        setSubmitted(true);

    };

    const restartQuiz = () => {

        setQuiz(null);
        setSubmitted(false);
        setCurrentQuestion(0);
        setAnswers({});
        setScore(0);
        setTimeLeft(600);
    };
    const minutes = Math.floor(timeLeft / 60);

    const seconds = timeLeft % 60;
    return (

        <MainLayout>

            <div className="max-w-5xl mx-auto">

                <h1 className="text-4xl font-bold mb-8">

                    📝 AI Quiz Generator

                </h1>

                {quiz && !submitted && (

                    <div className="mt-6">

                        <div className="flex justify-between mb-2">

                            <p className="font-semibold">

                                Question {currentQuestion + 1} / {quiz ? quiz.questions.length : form.numberOfQuestions}

                            </p>

                            {

                                quiz && !submitted && (

                                    <p className="font-semibold text-red-600">

                                        ⏰ {minutes}:{seconds.toString().padStart(2, "0")}

                                    </p>

                                )

                            }

                        </div>

                        {

                            quiz && !submitted && (

                                <div className="w-full bg-gray-200 rounded-full h-3">

                                    <div
                                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                        style={{
                                            width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`,
                                        }}
                                    ></div>

                                </div>

                            )

                        }

                    </div>
                )
                }

                {

                    !quiz && (

                        <QuizForm
                            form={form}
                            handleChange={handleChange}
                            handleGenerate={handleGenerate}
                            loading={loading}
                        />

                    )

                }

                {

                    quiz && !submitted && (

                        <QuestionCard

                            question={quiz.questions[currentQuestion]}

                            current={currentQuestion}

                            total={quiz.questions.length}

                            selected={answers[currentQuestion]}

                            onSelect={handleSelect}

                            onNext={handleNext}

                            onPrev={handlePrev}

                            onSubmit={handleSubmit}

                        />

                    )

                }

                {

                    submitted && (

                        <QuizResult

                            score={score}

                            total={quiz.questions.length}

                            questions={quiz.questions}

                            answers={answers}

                            restart={restartQuiz}

                        />

                    )

                }

            </div>

        </MainLayout>

    );

}

export default Quiz;