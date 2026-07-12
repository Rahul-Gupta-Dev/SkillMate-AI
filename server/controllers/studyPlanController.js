import Groq from "groq-sdk";
import StudyPlan from "../models/StudyPlan.js";

export const generateStudyPlan = async (req, res) => {
    try {
        const { userId, topic, duration, level, dailyHours, goal } = req.body;

        if (!userId || !topic || !duration || !level || !dailyHours || !goal) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });

        const prompt = `
Create a personalized study plan.

Topic: ${topic}
Duration: ${duration}
Level: ${level}
Daily Study Time: ${dailyHours} hour(s)
Goal: ${goal}

Instructions:
- Divide the plan day by day.
- Mention topics for each day.
- Give daily practice tasks.
- Suggest one mini project if applicable.
- Keep the language simple.
`;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert learning mentor who creates structured study roadmaps.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const plan = completion.choices[0].message.content;

        const studyPlan = await StudyPlan.create({
            userId,
            topic,
            duration,
            level,
            dailyHours,
            goal,
            plan,
        });

        res.status(201).json({
            success: true,
            message: "Study Plan Generated Successfully",
            studyPlan,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};