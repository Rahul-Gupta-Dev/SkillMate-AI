import {
    BookOpen,
    User,
    PlayCircle,
} from "lucide-react";

function CourseCard({ course, onOpen }) {

    return (

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300 hover:-translate-y-2">

            {/* Thumbnail */}

            <div className="relative h-52 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-blue-500 flex flex-col justify-center items-center text-white overflow-hidden">

                <BookOpen size={70} />

                <h2 className="text-3xl font-extrabold mt-5">

                    {course.thumbnailTitle}

                </h2>

                <p className="text-sm mt-3 opacity-90">

                    {course.thumbnailSubTitle}

                </p>

                <div className="absolute top-5 right-5 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs">

                    FREE

                </div>

            </div>

            {/* Body */}

            <div className="p-6">

                <h2 className="text-2xl font-bold">

                    {course.title}

                </h2>

                <div className="flex items-center gap-2 text-gray-500 mt-3">

                    <User size={18} />

                    {course.instructor}

                </div>

                <div className="flex justify-between mt-6">

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                        {course.level}

                    </span>

                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">

                        {course.category}

                    </span>

                </div>

                <button

                    onClick={() => onOpen(course)}

                    className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold"

                >

                    <PlayCircle size={20} />

                    Start Learning

                </button>

            </div>

        </div>

    );

}

export default CourseCard;