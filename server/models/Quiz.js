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

        questions: [
            {
                question: String,

                options: [String],

                answer: String,

                explanation: String,
            },
        ],

        score: {
            type: Number,
            default: 0,
        },

        percentage: {
            type: Number,
            default: 0,
        },

        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Quiz", quizSchema);