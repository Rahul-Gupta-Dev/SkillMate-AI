import {
    BookOpen,
    Smartphone,
    Moon,
    Dumbbell,
    Flame,
} from "lucide-react";

function HabitOverview({ habit = {} }) {

    const productivity =
        Math.max(
            0,
            Math.min(
                100,
                Math.round(
                    (Number(habit.studyHours || 0) * 10) +
                    (Number(habit.exerciseMinutes || 0) / 6) +
                    (Number(habit.readingMinutes || 0) / 6) -
                    (Number(habit.instagramHours || 0) * 8) -
                    (Number(habit.youtubeHours || 0) * 5) -
                    (Number(habit.gamingHours || 0) * 8)
                )
            )
        );

    const overviewData = [
        {
            id: 1,
            title: "Study Hours",
            value: `${habit.studyHours || 0} hr`,
            icon: BookOpen,
            bg: "bg-blue-600",
        },
        {
            id: 2,
            title: "Instagram",
            value: `${habit.instagramHours || 0} hr`,
            icon: Smartphone,
            bg: "bg-pink-500",
        },
        {
            id: 3,
            title: "Sleep",
            value: `${habit.sleepHours || 0} hr`,
            icon: Moon,
            bg: "bg-indigo-600",
        },
        {
            id: 4,
            title: "Exercise",
            value: `${habit.exerciseMinutes || 0} min`,
            icon: Dumbbell,
            bg: "bg-green-600",
        },
        {
            id: 5,
            title: "Productivity",
            value: `${productivity}%`,
            icon: Flame,
            bg: "bg-orange-500",
        },
    ];

    return (
        <section>

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-3xl font-bold">
                    Today's Overview
                </h2>

                <span className="text-gray-500">
                    Daily Performance
                </span>

            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6">

                {overviewData.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div
                            key={item.id}
                            className={`${item.bg} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition`}
                        >

                            <Icon size={34} />

                            <p className="mt-6 text-lg text-center">
                                {item.title}
                            </p>

                            <h2 className="text-2xl font-bold mt-2 text-center">
                                {item.value}
                            </h2>

                        </div>

                    );

                })}

            </div>

        </section>
    );

}

export default HabitOverview;