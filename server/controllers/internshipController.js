import Internship from "../models/Internship.js";

const sampleInternships = [
    {
        company: "Nova Labs",
        role: "Frontend Development Intern",
        domain: "Web Development",
        location: "Bengaluru",
        isRemote: false,
        requiredSkills: ["React", "JavaScript", "CSS", "HTML"],
        education: "B.Tech 2nd/3rd year",
        experience: "0-1 years",
        eligibility: "Students with frontend experience",
        stipend: "₹15,000/month",
        applicationDeadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12),
        description: "Build responsive landing pages and collaborate with UI engineers.",
        sourceType: "manual-sample",
        isVerified: false,
    },
    {
        company: "CodeNest",
        role: "Full Stack Intern",
        domain: "Web Development",
        location: "Remote",
        isRemote: true,
        requiredSkills: ["React", "Node.js", "MongoDB", "JavaScript"],
        education: "Any engineering student",
        experience: "0-2 years",
        eligibility: "Open to final-year students",
        stipend: "₹20,000/month",
        applicationDeadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 18),
        description: "Work on full-stack product features with mentoring support.",
        sourceType: "manual-sample",
        isVerified: false,
    },
    {
        company: "DataForge",
        role: "Data Structures Intern",
        domain: "DSA",
        location: "Pune",
        isRemote: false,
        requiredSkills: ["DSA", "C++", "Python", "Problem Solving"],
        education: "B.Tech 1st/2nd year",
        experience: "0-1 years",
        eligibility: "Strong coding ability required",
        stipend: "₹12,000/month",
        applicationDeadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        description: "Solve algorithmic and interview-style problems weekly.",
        sourceType: "manual-sample",
        isVerified: false,
    },
    {
        company: "AI Horizon",
        role: "AI/ML Research Intern",
        domain: "AI/ML",
        location: "Remote",
        isRemote: true,
        requiredSkills: ["Python", "AI/ML", "SQL", "Data Analysis"],
        education: "B.Tech / M.Tech students",
        experience: "0-1 years",
        eligibility: "Machine learning interest preferred",
        stipend: "₹18,000/month",
        applicationDeadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 26),
        description: "Explore ML pipelines, dataset preparation, and model evaluation.",
        sourceType: "manual-sample",
        isVerified: false,
    },
    {
        company: "SecureStack",
        role: "Backend Engineering Intern",
        domain: "Web Development",
        location: "Hyderabad",
        isRemote: false,
        requiredSkills: ["Node.js", "JavaScript", "MongoDB", "SQL"],
        education: "Engineering students",
        experience: "0-2 years",
        eligibility: "Prefer candidates with API work",
        stipend: "₹16,000/month",
        applicationDeadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
        description: "Build backend APIs and database integrations for student product workflows.",
        sourceType: "manual-sample",
        isVerified: false,
    },
];

const normalize = (value) => String(value || "").trim().toLowerCase();

const buildMatchData = (internship, studentProfile) => {
    const studentSkills = (studentProfile.skills || []).map(normalize);
    const requiredSkills = (internship.requiredSkills || []).map(normalize);

    const overlap = requiredSkills.filter((skill) => studentSkills.includes(skill));
    const skillMatch = requiredSkills.length
        ? Math.round((overlap.length / requiredSkills.length) * 100)
        : 0;

    const domainMatch = studentProfile.preferredDomain && internship.domain
        ? (normalize(studentProfile.preferredDomain) === normalize(internship.domain) ? 100 : 70)
        : 75;

    const experienceMatch = studentProfile.experienceLevel
        ? (normalize(studentProfile.experienceLevel).includes("beginner") ? 80 : 90)
        : 80;

    const educationMatch = studentProfile.education
        ? 85
        : 75;

    const matchPercentage = Math.min(
        100,
        Math.round(skillMatch * 0.7 + domainMatch * 0.15 + experienceMatch * 0.1 + educationMatch * 0.05)
    );

    const matchedSkills = requiredSkills.filter((skill) => studentSkills.includes(skill));
    const missingSkills = requiredSkills.filter((skill) => !studentSkills.includes(skill));

    return {
        matchPercentage,
        matchedSkills,
        missingSkills,
        reason: matchedSkills.length
            ? `Strong match for ${matchedSkills.slice(0, 3).join(", ")}`
            : "Your profile is a good starting point, but more skill alignment would improve the match.",
    };
};

const getStudentProfile = (req) => ({
    skills: ["React", "JavaScript", "Node.js", "MongoDB", "DSA"],
    preferredDomain: "Web Development",
    education: "B.Tech 2nd year",
    experienceLevel: "Beginner",
    preferredLocation: "Remote",
    ...((req.user && req.user.profile) || {}),
});

export const getInternships = async (req, res) => {
    try {
        const internships = await Internship.find({}).sort({ createdAt: -1 });

        const studentProfile = getStudentProfile(req);

        const enriched = internships.map((internship) => {
            const match = buildMatchData(internship.toObject(), studentProfile);
            const isSaved = internship.savedBy.some((userId) => userId.toString() === req.user.id.toString());

            return {
                ...internship.toObject(),
                isSaved,
                matchPercentage: match.matchPercentage,
                matchedSkills: match.matchedSkills,
                missingSkills: match.missingSkills,
                whyThisMatches: match.reason,
            };
        });

        res.json({
            success: true,
            internships: enriched,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const seedInternships = async (req, res) => {
    try {
        const count = await Internship.countDocuments();

        if (count > 0) {
            return res.json({
                success: true,
                message: "Internship data already seeded.",
                total: count,
            });
        }

        const inserted = await Internship.insertMany(sampleInternships);

        res.status(201).json({
            success: true,
            message: "Sample internship data seeded successfully.",
            internships: inserted,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const toggleSavedInternship = async (req, res) => {
    try {
        const { internshipId } = req.body;

        if (!internshipId) {
            return res.status(400).json({
                success: false,
                message: "Internship ID is required.",
            });
        }

        const internship = await Internship.findById(internshipId);

        if (!internship) {
            return res.status(404).json({
                success: false,
                message: "Internship not found.",
            });
        }

        const userId = req.user.id;
        const alreadySaved = internship.savedBy.some((id) => id.toString() === userId.toString());

        if (alreadySaved) {
            internship.savedBy = internship.savedBy.filter((id) => id.toString() !== userId.toString());
        } else {
            internship.savedBy.push(userId);
        }

        await internship.save();

        res.json({
            success: true,
            saved: !alreadySaved,
            internship,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getSavedInternships = async (req, res) => {
    try {
        const internships = await Internship.find({ savedBy: req.user.id }).sort({ createdAt: -1 });

        res.json({
            success: true,
            internships,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
