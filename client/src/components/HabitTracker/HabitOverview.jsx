import {
    BookOpen,
    Smartphone,
    Moon,
    Dumbbell,
    Flame,
} from "lucide-react";

const overviewData = [
    {
        id: 1,
        title: "Study Hours",
        value: "5 hr",
        icon: BookOpen,
        bg: "bg-blue-600",
    },
    {
        id: 2,
        title: "Instagram",
        value: "2 hr",
        icon: Smartphone,
        bg: "bg-pink-500",
    },
    {
        id: 3,
        title: "Sleep",
        value: "7 hr",
        icon: Moon,
        bg: "bg-indigo-600",
    },
    {
        id: 4,
        title: "Exercise",
        value: "30 min",
        icon: Dumbbell,
        bg: "bg-green-600",
    },
    {
        id: 5,
        title: "Productivity",
        value: "82%",
        icon: Flame,
        bg: "bg-orange-500",
    },
];

function HabitOverview() {

    return (

        <section>

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-3xl font-bold">

                    Today's Overview

                </h2>
                <br></br><br></br>
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
                            className={`${item.bg} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition duration-300 hover:-translate-y-1`}
                        >

                            <div className="flex justify-between items-start">

                                <Icon size={34} />


                            </div>

                            <p className="mt-6 text-lg space-y-5 flex flex-col items-center">

                                {item.title}

                            </p>

                            <h2 className="text-2xl font-bold mt-2 space-y-5 flex flex-col items-center">

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