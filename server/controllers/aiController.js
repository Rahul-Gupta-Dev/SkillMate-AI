import Groq from "groq-sdk";

export const chatWithAI = async (req, res) => {
    try {

        const { messages } = req.body;

        if (!messages || messages.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Messages are required",
            });
        }

        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });

        const completion = await groq.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            messages: [

                {
                    role: "system",
                    content:
                        "You are SkillMate AI. You are a friendly AI tutor. Explain concepts in simple language with examples. When programming questions are asked, provide clean code with explanations.",
                },

                ...messages,

            ],

        });

        res.json({

            success: true,

            reply: completion.choices[0].message.content,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }
};