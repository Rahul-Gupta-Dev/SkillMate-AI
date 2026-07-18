import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import AITutor from "../pages/AITutor/AITutor";
import StudyPlan from "../pages/StudyPlan/StudyPlan";
import Quiz from "../pages/Quiz/Quiz";
import Progress from "../pages/Progress/Progress";
import Resources from "../pages/Resources/Resources";
import Profile from "../pages/Profile/Profile";
import ProtectedRoute from "./ProtectedRoute";

function AppRouter() {
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/ai-tutor" element={<AITutor />} />

                <Route path="/study-plan" element={<StudyPlan />} />

                <Route path="/quiz" element={<Quiz />} />

                <Route path="/progress" element={<Progress />} />

                <Route path="/resources" element={<Resources />} />

<Route path="/habit-tracker" element={<HabitTracker />} />

                <Route path="/profile" element={<Profile />} />

            </Routes>

        </BrowserRouter>
    );
}

export default AppRouter;