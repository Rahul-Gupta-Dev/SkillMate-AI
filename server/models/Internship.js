import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            required: true,
        },

        domain: {
            type: String,
            required: true,
        },

        location: {
            type: String,
            default: "Remote",
        },

        isRemote: {
            type: Boolean,
            default: false,
        },

        requiredSkills: [String],

        education: {
            type: String,
            default: "Any graduate",
        },

        experience: {
            type: String,
            default: "0-1 years",
        },

        eligibility: {
            type: String,
            default: "Open to eligible students",
        },

        stipend: {
            type: String,
            default: "Unpaid",
        },

        applicationDeadline: {
            type: Date,
            required: true,
        },

        description: {
            type: String,
            default: "",
        },

        sourceType: {
            type: String,
            default: "manual-sample",
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        savedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Internship = mongoose.model("Internship", internshipSchema);

export default Internship;
