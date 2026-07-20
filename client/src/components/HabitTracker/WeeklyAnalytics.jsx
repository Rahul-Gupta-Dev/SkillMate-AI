import {
    BarChart3,
    BookOpen,
    Smartphone,
    TrendingUp,
    CalendarDays,
} from "lucide-react";

function WeeklyAnalytics() {

    const stats = [
        {
            title: "Study Hours",
            value: "32 hrs",
            color: "bg-blue-100",
            text: "text-blue-600",
            icon: BookOpen,
        },
        {
            title: "Instagram",
            value: "11 hrs",
            color: "bg-pink-100",
            text: "text-pink-600",
            icon: Smartphone,
        },
        {
            title: "Productivity",
            value: "84%",
            color: "bg-green-100",
            text: "text-green-600",
            icon: TrendingUp,
        },
        {
            title: "Weekly Streak",
            value: "6 Days",
            color: "bg-orange-100",
            text: "text-orange-600",
            icon: CalendarDays,
        },
    ];

    return (

        <div className="bg-white rounded-3xl shadow-lg p-8">

            <div className="flex items-center gap-3 mb-8">

                <BarChart3
                    size={30}
                    className="text-blue-600"
                />

                <h2 className="text-3xl font-bold">

                    Weekly Analytics

                </h2>
                <br></br><br></br>
            </div>

            {/* Summary Cards */}

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

                {stats.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div
                            key={item.title}
                            className={`${item.color} rounded-2xl p-6`}
                        >

                            <Icon
                                size={32}
                                className={item.text}
                            />

                            <p className="text-gray-600 mt-4">

                                {item.title}

                            </p>

                            <h2 className={`text-3xl font-bold mt-2 ${item.text}`}>

                                {item.value}

                            </h2>

                        </div>

                    );

                })}

            </div>
            <br></br>
            {/* Charts */}

            <div className="grid lg:grid-cols-2 gap-8 mt-10">

                <div className="border-2 border-dashed border-gray-300 rounded-2xl h-80 flex flex-col items-center justify-center">

                    <BarChart3
                        size={60}
                        className="text-gray-400"
                    />

                    <h3 className="text-2xl font-bold mt-4">

                        Weekly Study Graph

                    </h3>

                    <p className="text-gray-500 mt-2">

                        Chart.js will be connected here.

                    </p>

                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-2xl h-80 flex flex-col items-center justify-center">

                    <Smartphone
                        size={60}
                        className="text-gray-400"
                    />

                    <h3 className="text-2xl font-bold mt-4">

                        Social Media Usage

                    </h3>

                    <p className="text-gray-500 mt-2">

                        Weekly Instagram / YouTube Chart

                    </p>

                </div>

            </div>

        </div>

    );

}

export default WeeklyAnalytics;