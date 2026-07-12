import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import studyPlanRoutes from "./routes/studyPlanRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";

dotenv.config();
console.log("Groq Key Loaded:", !!process.env.GROQ_API_KEY);
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/study-plan", studyPlanRoutes);
app.use("/api/quiz", quizRoutes);

app.get("/", (req, res) => {

    res.json({
        message: "SkillMate AI Backend Running 🚀"
    });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});