import MainLayout from "../../layouts/MainLayout";
import HeroSection from "../../components/dashboard/HeroSection";
import QuickAccess from "../../components/dashboard/QuickAccess";
import RecommendedCourses from "../../components/dashboard/RecommendedCourses";

function Dashboard() {
    return (
        <MainLayout>

            <HeroSection />

            <QuickAccess />

            <RecommendedCourses />

        </MainLayout>
    );
}

export default Dashboard;