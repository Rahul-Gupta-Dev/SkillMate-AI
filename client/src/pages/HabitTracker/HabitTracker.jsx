import { useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import HabitHero from "../../components/HabitTracker/HabitHero";
import HabitOverview from "../../components/HabitTracker/HabitOverview";
import HabitForm from "../../components/HabitTracker/HabitForm";
import AIHabitCoach from "../../components/HabitTracker/AIHabitCoach";
import WeeklyAnalytics from "../../components/HabitTracker/WeeklyAnalytics";
import WeeklyReport from "../../components/HabitTracker/WeeklyReport";
import AchievementSection from "../../components/HabitTracker/AchievementSection";

function HabitTracker() {

    const [habitData, setHabitData] = useState({

        studyHours: 0,
        readingMinutes: 0,
        goal: "",

        instagramHours: 0,
        youtubeHours: 0,
        gamingHours: 0,
        otherSocialHours: 0,

        sleepHours: 0,
        exerciseMinutes: 0,
        waterIntake: 0,

        mood: "",
        notes: "",

    });

    return (

        <MainLayout>

            <div className="space-y-8">

                <HabitHero />

                <HabitOverview habit={habitData} />

                <HabitForm
                    habitData={habitData}
                    setHabitData={setHabitData}
                />

                <AIHabitCoach />

                <WeeklyAnalytics />

                <WeeklyReport />

                <AchievementSection />

            </div>

        </MainLayout>

    );

}

export default HabitTracker;