import Groq from "groq-sdk";
import Quiz from "../models/Quiz.js";

export const generateQuiz = async (req, res) => {
    console.log("Inside Quiz Controller");
    console.log("req.user =", req.user);
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
Generate ${numberOfQuestions} multiple-choice questions.

Topic: ${topic}
Difficulty: ${difficulty}

For each question provide:

Question

Options A-D

Correct Answer

Short Explanation

Return in Markdown format.
`;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert quiz creator.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const quiz = completion.choices[0].message.content;

        const savedQuiz = await Quiz.create({
            userId,
            topic,
            difficulty,
            numberOfQuestions,
            quiz,
        });

        res.status(201).json({
            success: true,
            quiz: savedQuiz,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};