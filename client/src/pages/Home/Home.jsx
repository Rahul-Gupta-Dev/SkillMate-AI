import MainLayout from "../../layouts/MainLayout";
import HeroSection from "../../components/dashboard/HeroSection";
import QuickAccess from "../../components/dashboard/QuickAccess";

function Home() {
    return (
        <MainLayout>

            <HeroSection />

            <QuickAccess />

        </MainLayout>
    );
}

export default Home;