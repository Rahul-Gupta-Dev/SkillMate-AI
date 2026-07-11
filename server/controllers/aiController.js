import Groq from "groq-sdk";

export const chatWithAI = async (req, res) => {
    try {

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required",
            });
        }

        // Create Groq client AFTER dotenv has loaded
        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "You are SkillMate AI, an AI tutor that explains concepts simply and helps students learn.",
                },
                {
                    role: "user",
                    content: message,
                },
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