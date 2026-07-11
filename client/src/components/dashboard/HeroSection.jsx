import Button from "../ui/Button";
import Card from "../ui/Card";
import { FaChartLine, FaAtom, FaComments } from "react-icons/fa";

function HeroSection() {
    return (
        <Card className="p-10 flex items-center justify-between relative overflow-hidden">

            {/* Floating Icons */}
            <div className="absolute top-8 right-[320px] bg-blue-100 p-3 rounded-xl">
                <FaComments className="text-blue-600 text-xl" />
            </div>

            <div className="absolute bottom-12 right-[340px] bg-purple-100 p-3 rounded-xl">
                <FaAtom className="text-purple-600 text-xl" />
            </div>

            <div className="absolute top-20 right-10 bg-green-100 p-3 rounded-xl">
                <FaChartLine className="text-green-600 text-xl" />
            </div>

            {/* Left Side */}
            <div className="max-w-xl">

                <h1 className="text-6xl font-bold leading-tight">
                    Learn Smarter
                    <br />
                    with <span className="text-blue-600">AI</span>
                </h1>

                <p className="text-gray-500 mt-6 text-lg leading-8">
                    Personalized learning paths, AI-powered doubt solving,
                    quizzes, progress tracking and curated learning resources.
                </p>

                <Button className="mt-8">
                    Start Learning →
                </Button>

            </div>

            {/* Right Side */}
            <div>

                <img
                    src="/robot.png"
                    alt="Robot"
                    className="w-[320px]"
                />

            </div>

        </Card>
    );
}

export default HeroSection;