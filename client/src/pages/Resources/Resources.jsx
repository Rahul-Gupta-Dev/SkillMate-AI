import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";

import courses from "../../data/courseData";

import CourseCard from "../../components/Resources/CourseCard";
import CourseModal from "../../components/Resources/CourseModal";

function Resources() {

    const [search, setSearch] = useState("");

    const [selectedCourse, setSelectedCourse] = useState(null);

    const filteredCourses = courses.filter((course) =>
        course.title.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <MainLayout>

            <div className="space-y-8">

                {/* Header */}

                <div>

                    <h1 className="text-5xl font-bold">

                        Learning Resources

                    </h1>

                    <p className="text-gray-500 mt-3 text-lg">

                        Learn from the best free YouTube playlists.

                    </p>

                </div>

                {/* Search */}

                <input

                    type="text"

                    placeholder="Search Course..."

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                    className="w-full p-4 rounded-2xl border border-gray-300"

                />

                {/* Grid */}

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                    {

                        filteredCourses.map((course) => (

                            <CourseCard

                                key={course.id}

                                course={course}

                                onOpen={setSelectedCourse}

                            />

                        ))

                    }

                </div>

                <CourseModal

                    course={selectedCourse}

                    onClose={() => setSelectedCourse(null)}

                />

            </div>
            <br></br>
        </MainLayout>

    );

}

export default Resources;