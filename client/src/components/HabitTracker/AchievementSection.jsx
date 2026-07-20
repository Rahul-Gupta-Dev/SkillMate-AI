import {
    Trophy,
    Flame,
    BookOpen,
    Heart,
    Star,
} from "lucide-react";

const achievements = [

    {
        title: "Study Champion",
        icon: Trophy,
        color: "bg-yellow-100",
        text: "text-yellow-600",
    },

    {
        title: "7 Day Streak",
        icon: Flame,
        color: "bg-orange-100",
        text: "text-orange-600",
    },

    {
        title: "Book Lover",
        icon: BookOpen,
        color: "bg-blue-100",
        text: "text-blue-600",
    },

    {
        title: "Healthy Habit",
        icon: Heart,
        color: "bg-green-100",
        text: "text-green-600",
    },

    {
        title: "Productivity Hero",
        icon: Star,
        color: "bg-purple-100",
        text: "text-purple-600",
    },

];

function AchievementSection() {

    return (

        <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-3xl font-bold mb-8">

                🏆 Achievements

            </h2>
            <br></br>
            <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6">

                {

                    achievements.map((item) => {

                        const Icon = item.icon;

                        return (

                            <div
                                key={item.title}
                                className={`${item.color} rounded-2xl p-6 text-center hover:scale-105 transition`}
                            >

                                <Icon
                                    size={45}
                                    className={`${item.text} mx-auto`}
                                />

                                <h3 className="font-bold mt-5">

                                    {item.title}

                                </h3>

                            </div>

                        );

                    })

                }

            </div>

        </div>

    );

}

export default AchievementSection;