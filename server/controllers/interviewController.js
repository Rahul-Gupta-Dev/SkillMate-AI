import Groq from "groq-sdk";
import Interview from "../models/Interview.js";

const parseStructuredJSON = (rawText) => {
    if (!rawText) {
        throw new Error("No response received from AI");
    }

    const cleaned = String(rawText)
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

    try {
        return JSON.parse(cleaned);
    } catch (error) {
        const startIndex = cleaned.indexOf("{");
        const endIndex = cleaned.lastIndexOf("}");

        if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
            return JSON.parse(cleaned.slice(startIndex, endIndex + 1));
        }

        throw new Error("Failed to parse AI response");
    }
};

const fallbackQuestions = (category, difficulty, interviewType, count) => {
    const base = [
        "Explain the core concepts behind this topic and how you would apply them in a real project.",
        "Describe a scenario where this concept fails and how you would debug or improve it.",
        "Compare two approaches and explain which one is better in performance, readability, and maintainability.",
        "What trade-offs would you consider when choosing a solution for a production-ready problem?",
        "Walk through how you would structure a solution step by step and justify each decision.",
    ];

    return Array.from({ length: count }, (_, index) => ({
        type: interviewType || "Technical",
        question: `${category} ${difficulty} question ${index + 1}: ${base[index % base.length]}`,
        expectedAnswerType: "text",
    }));
};

const buildQuestionPrompt = ({ category, difficulty, interviewType, numberOfQuestions }) => `
Generate exactly ${numberOfQuestions} interview questions for a student preparing for ${category} interviews.
Difficulty: ${difficulty}
Interview type: ${interviewType}

Return valid JSON only as an array of objects.
Each object must have:
- type
- question
- expectedAnswerType

Example format:
[
  {
    "type": "Technical",
    "question": "Explain the difference between ...",
    "expectedAnswerType": "text"
  }
]

Rules:
- Use realistic interview-style questions.
- Keep them concise but high-quality.
- No markdown, no comments, no explanation outside JSON.
`;

const buildEvaluationPrompt = ({ category, question, answer, difficulty }) => `
You are an expert interviewer evaluating a candidate answer.

Category: ${category}
Difficulty: ${difficulty}
Question: ${question}
Candidate answer: ${answer}

Return ONLY valid JSON in this format:
{
  "score": 8,
  "correctness": "Good",
  "strengths": ["clear explanation", "good structure"],
  "weaknesses": ["missing example", "did not mention trade-offs"],
  "feedback": "Your answer was mostly correct and structured well. You explained the main concept clearly.",
  "improvedAnswer": "A stronger answer would explain ..."
}

Rules:
- score must be an integer between 0 and 10.
- correctness must be one of: "Excellent", "Good", "Average", "Needs improvement".
- strengths and weaknesses must be arrays of short strings.
- improvedAnswer should be a polished sample answer in 2-4 sentences.
`;

const getSummary = (session) => {
    const strengths = [...new Set(session.answers.flatMap((answer) => answer.strengths || []))];
    const weaknesses = [...new Set(session.answers.flatMap((answer) => answer.weaknesses || []))];
    const suggestions = [
        "Review the concepts that appeared in weaker answers and practice them again.",
        "Use a structured approach: define the concept, explain trade-offs, and provide one example.",
        "Practice timed answers to improve clarity and confidence.",
    ];

    const readiness = Math.min(100, Math.max(0, Math.round(session.accuracy || 0)));

    return {
        strengths,
        weaknesses,
        suggestions,
        readiness,
    };
};

export const generateInterview = async (req, res) => {
    try {
        const { category, difficulty, interviewType, numberOfQuestions } = req.body;
        const userId = req.user.id;

        if (!userId || !category || !difficulty || !interviewType || !numberOfQuestions) {
            return res.status(400).json({
                success: false,
                message: "Category, difficulty, interview type, and number of questions are required.",
            });
        }

        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        let questions = [];

        try {
            const completion = await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert technical interview coach. Generate realistic interview questions in valid JSON only.",
                    },
                    {
                        role: "user",
                        content: buildQuestionPrompt({
                            category,
                            difficulty,
                            interviewType,
                            numberOfQuestions,
                        }),
                    },
                ],
            });

            const aiResponse = completion.choices?.[0]?.message?.content;
            const parsed = parseStructuredJSON(aiResponse);

            if (Array.isArray(parsed) && parsed.length > 0) {
                questions = parsed.slice(0, Number(numberOfQuestions));
            }
        } catch (error) {
            console.error("AI question generation failed:", error.message);
            questions = fallbackQuestions(category, difficulty, interviewType, Number(numberOfQuestions));
        }

        const session = await Interview.create({
            userId,
            category,
            difficulty,
            interviewType,
            numberOfQuestions: questions.length,
            questions: questions.map((question) => ({
                type: question.type || interviewType,
                question: question.question,
                expectedAnswerType: question.expectedAnswerType || "text",
            })),
        });

        res.status(201).json({
            success: true,
            session,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const evaluateInterviewAnswer = async (req, res) => {
    try {
        const { sessionId, questionIndex, answer } = req.body;

        if (!sessionId || questionIndex === undefined || !answer || !answer.trim()) {
            return res.status(400).json({
                success: false,
                message: "Session ID, question index, and answer are required.",
            });
        }

        const session = await Interview.findById(sessionId);

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Interview session not found.",
            });
        }

        if (session.userId.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized.",
            });
        }

        const question = session.questions[questionIndex];

        if (!question) {
            return res.status(400).json({
                success: false,
                message: "Invalid question index.",
            });
        }

        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        let evaluation = {
            score: 0,
            correctness: "Needs improvement",
            strengths: ["Answer attempted", "Could be more structured"],
            weaknesses: ["Missing depth and examples"],
            feedback: "Your answer was submitted, but it needs more technical depth and a clearer structure.",
            improvedAnswer: "A stronger answer would include a concise definition, an example, and the main trade-offs involved.",
        };

        try {
            const completion = await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: "You are a strict but fair interview judge. Evaluate the answer and return valid JSON only.",
                    },
                    {
                        role: "user",
                        content: buildEvaluationPrompt({
                            category: session.category,
                            question: question.question,
                            answer,
                            difficulty: session.difficulty,
                        }),
                    },
                ],
            });

            const aiResponse = completion.choices?.[0]?.message?.content;
            evaluation = parseStructuredJSON(aiResponse);
        } catch (error) {
            console.error("AI evaluation failed:", error.message);
        }

        const score = Math.max(0, Math.min(10, Number(evaluation.score) || 0));
        const normalizedEntry = {
            questionIndex,
            question: question.question,
            answer,
            score,
            correctness: evaluation.correctness || "Needs improvement",
            strengths: Array.isArray(evaluation.strengths) ? evaluation.strengths : ["Answer attempted"],
            weaknesses: Array.isArray(evaluation.weaknesses) ? evaluation.weaknesses : ["Needs more detail"],
            feedback: evaluation.feedback || "Your answer has room for improvement.",
            improvedAnswer: evaluation.improvedAnswer || "A stronger answer would provide a clear explanation and example.",
            createdAt: new Date(),
        };

        session.answers.push(normalizedEntry);

        const totalQuestions = session.questions.length;
        const attemptedQuestions = session.answers.length;
        const correctAnswers = session.answers.filter((item) => item.score >= 6).length;
        const totalScore = session.answers.reduce((sum, item) => sum + Number(item.score || 0), 0);

        session.questionsAttempted = attemptedQuestions;
        session.correctAnswers = correctAnswers;
        session.totalScore = totalScore;
        session.accuracy = totalQuestions ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

        if (attemptedQuestions >= totalQuestions) {
            session.completed = true;
            session.completedAt = new Date();
            session.summary = getSummary(session);
        }

        await session.save();

        res.json({
            success: true,
            evaluation: normalizedEntry,
            session,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getInterviewSummary = async (req, res) => {
    try {
        const userId = req.user.id;
        const sessions = await Interview.find({ userId }).sort({ createdAt: -1 });

        const totalQuestions = sessions.reduce((sum, item) => sum + (item.numberOfQuestions || 0), 0);
        const totalCorrect = sessions.reduce((sum, item) => sum + (item.correctAnswers || 0), 0);
        const averageAccuracy = sessions.length
            ? Math.round(
                sessions.reduce((sum, item) => sum + (item.accuracy || 0), 0) / sessions.length
            )
            : 0;

        const latestSession = sessions[0];
        const readiness = latestSession?.summary?.readiness || averageAccuracy || 0;

        res.json({
            success: true,
            summary: {
                totalSessions: sessions.length,
                totalQuestions,
                totalCorrect,
                averageAccuracy,
                readiness,
                interviewStreak: Math.min(sessions.length, 7),
                recentSessions: sessions.slice(0, 5),
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getInterviewHistory = async (req, res) => {
    try {
        const sessions = await Interview.find({ userId: req.user.id }).sort({ createdAt: -1 });

        res.json({
            success: true,
            sessions,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getInterviewById = async (req, res) => {
    try {
        const session = await Interview.findById(req.params.id);

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Interview session not found.",
            });
        }

        if (session.userId.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized.",
            });
        }

        res.json({
            success: true,
            session,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
