import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        difficulty: {
            type: String,
            required: true,
        },

        interviewType: {
            type: String,
            required: true,
        },

        numberOfQuestions: {
            type: Number,
            required: true,
            default: 5,
        },

        questions: [
            {
                type: {
                    type: String,
                    required: true,
                },
                question: {
                    type: String,
                    required: true,
                },
                expectedAnswerType: {
                    type: String,
                    default: "text",
                },
            },
        ],

        answers: [
            {
                questionIndex: {
                    type: Number,
                    required: true,
                },

                question: {
                    type: String,
                    required: true,
                },

                answer: {
                    type: String,
                    required: true,
                },

                score: {
                    type: Number,
                    default: 0,
                },

                correctness: {
                    type: String,
                    default: "Needs improvement",
                },

                strengths: [String],
                weaknesses: [String],
                feedback: String,
                improvedAnswer: String,

                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],

        totalScore: {
            type: Number,
            default: 0,
        },

        correctAnswers: {
            type: Number,
            default: 0,
        },

        questionsAttempted: {
            type: Number,
            default: 0,
        },

        accuracy: {
            type: Number,
            default: 0,
        },

        completed: {
            type: Boolean,
            default: false,
        },

        summary: {
            strengths: [String],
            weaknesses: [String],
            suggestions: [String],
            readiness: {
                type: Number,
                default: 0,
            },
        },

        startedAt: {
            type: Date,
            default: Date.now,
        },

        completedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;
