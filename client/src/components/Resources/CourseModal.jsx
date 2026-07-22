import { X } from "lucide-react";

function CourseModal({ course, onClose }) {

    if (!course) return null;

    return (

        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

            <div className="bg-white rounded-3xl w-[95%] max-w-6xl p-6 relative">

                <button
                    onClick={onClose}
                    className="absolute top-5 right-5"
                >
                    <X size={28} />
                </button>

                <h2 className="text-3xl font-bold mb-6">

                    {course.title}

                </h2>

                <iframe
                    className="w-full h-[600px] rounded-2xl"
                    src={`https://www.youtube.com/embed/videoseries?list=${course.playlistId}`}
                    title={course.title}
                    allowFullScreen
                />

            </div>

        </div>

    );

}

export default CourseModal;