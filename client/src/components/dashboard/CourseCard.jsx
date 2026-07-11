import Card from "../ui/Card";

function CourseCard({
    title,
    level,
    progress,
    color
}) {

    return (

        <Card className="p-5">

            <div className="text-xl font-bold">

                {title}

            </div>

            <p className="text-gray-500 mt-2">

                {level}

            </p>

            <div className="mt-5 bg-gray-200 rounded-full h-2">

                <div

                    className={`${color} h-2 rounded-full`}

                    style={{
                        width: `${progress}%`
                    }}

                />

            </div>

            <p className="mt-3 text-sm text-gray-500">

                {progress}% Completed

            </p>

        </Card>

    )

}

export default CourseCard;