import MainLayout from "../../layouts/MainLayout";

import HabitHero from "../../components/HabitTracker/HabitHero";
import HabitOverview from "../../components/HabitTracker/HabitOverview";
import HabitForm from "../../components/HabitTracker/HabitForm";
import AIHabitCoach from "../../components/HabitTracker/AIHabitCoach";
import WeeklyAnalytics from "../../components/HabitTracker/WeeklyAnalytics";
import WeeklyReport from "../../components/HabitTracker/WeeklyReport";
import AchievementSection from "../../components/HabitTracker/AchievementSection";

function HabitTracker() {

    return (

        <MainLayout>

            <div className="space-y-8">

                <HabitHero />
                <br></br>

                <HabitOverview />
                <br></br>
                <HabitForm />
                <br></br>
                <AIHabitCoach />
                <br></br>
                <WeeklyAnalytics />
                <br></br>
                <WeeklyReport />
                <br></br>
                <AchievementSection />
                <br></br>

            </div>
            <br></br>

        </MainLayout>

    );

}

export default HabitTracker;