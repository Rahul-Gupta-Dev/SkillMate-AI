import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        topic: {
            type: String,
            required: true,
        },

        difficulty: {
            type: String,
            required: true,
        },

        numberOfQuestions: {
            type: Number,
            required: true,
        },

        quiz: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Quiz", quizSchema);