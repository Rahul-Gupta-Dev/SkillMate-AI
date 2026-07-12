import Groq from "groq-sdk";
import Quiz from "../models/Quiz.js";

// Generate Quiz
export const generateQuiz = async (req, res) => {
    try {

        const {
            topic,
            difficulty,
            numberOfQuestions,
        } = req.body;

        const userId = req.user.id;

        if (
            !userId ||
            !topic ||
            !difficulty ||
            !numberOfQuestions
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });

        const prompt = `
Generate exactly ${numberOfQuestions} multiple choice questions.

Topic: ${topic}

Difficulty: ${difficulty}

Return ONLY valid JSON.

Format:

[
  {
    "question":"What is Python?",
    "options":[
      "Programming Language",
      "Database",
      "Browser",
      "Operating System"
    ],
    "answer":"Programming Language",
    "explanation":"Python is a programming language."
  }
]

Rules:
- Return ONLY JSON.
- No markdown.
- No backticks.
- Exactly 4 options for every question.
`;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "You are an expert quiz creator."
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        const quizText = completion.choices[0].message.content;

        const questions = JSON.parse(quizText);

        const savedQuiz = await Quiz.create({
            userId,
            topic,
            difficulty,
            numberOfQuestions,
            questions
        });

        res.status(201).json({
            success: true,
            quiz: savedQuiz
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Submit Quiz
export const submitQuiz = async (req, res) => {
    try {

        const { id } = req.params;
        const { score, percentage } = req.body;

        const quiz = await Quiz.findById(id);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        if (quiz.userId.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        quiz.score = score;
        quiz.percentage = percentage;
        quiz.completed = true;

        await quiz.save();

        res.json({
            success: true,
            message: "Quiz submitted successfully",
            quiz
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};