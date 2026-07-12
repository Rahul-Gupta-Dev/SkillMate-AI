import mongoose from "mongoose";

const studyPlanSchema = new mongoose.Schema(
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

        duration: {
            type: String,
            required: true,
        },

        level: {
            type: String,
            required: true,
        },

        dailyHours: {
            type: Number,
            required: true,
        },

        goal: {
            type: String,
            required: true,
        },

        plan: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("StudyPlan", studyPlanSchema);