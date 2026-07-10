import {
    FaRobot,
    FaCalendarAlt,
    FaClipboardList,
    FaChartLine,
} from "react-icons/fa";

const quickAccessData = [
    {
        id: 1,
        title: "AI Tutor",
        description: "Ask doubts and get instant explanations",
        icon: FaRobot,
        path: "/ai-tutor",
    },
    {
        id: 2,
        title: "Study Plan",
        description: "Personalized learning roadmap",
        icon: FaCalendarAlt,
        path: "/study-plan",
    },
    {
        id: 3,
        title: "Quizzes",
        description: "Practice quizzes and test yourself",
        icon: FaClipboardList,
        path: "/quiz",
    },
    {
        id: 4,
        title: "Progress",
        description: "Track your learning progress",
        icon: FaChartLine,
        path: "/progress",
    },
];

export default quickAccessData;