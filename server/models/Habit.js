import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        studyHours: {
            type: Number,
            default: 0,
        },

        instagramHours: {
            type: Number,
            default: 0,
        },

        youtubeHours: {
            type: Number,
            default: 0,
        },

        gamingHours: {
            type: Number,
            default: 0,
        },

        otherSocialHours: {
            type: Number,
            default: 0,
        },

        sleepHours: {
            type: Number,
            default: 0,
        },

        exerciseMinutes: {
            type: Number,
            default: 0,
        },

        readingMinutes: {
            type: Number,
            default: 0,
        },

        waterIntake: {
            type: Number,
            default: 0,
        },

        mood: {
            type: String,
            default: "",
        },

        goal: {
            type: String,
            default: "",
        },

        notes: {
            type: String,
            default: "",
        },

        productivityScore: {
            type: Number,
            default: 0,
        },

        aiSuggestion: {
            type: String,
            default: "",
        }

    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Habit", habitSchema);