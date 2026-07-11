import courseData from "../../data/courseData";
import CourseCard from "./CourseCard";
import SectionTitle from "./SectionTitle";

function RecommendedCourses() {

    return (

        <section className="mt-10">

            <SectionTitle
                title="Recommended For You"
                action="View All"
            />

            <div className="grid grid-cols-4 gap-6">

                {courseData.map(course => (

                    <CourseCard
                        key={course.id}
                        {...course}
                    />

                ))}

            </div>

        </section>

    )

}

export default RecommendedCourses;