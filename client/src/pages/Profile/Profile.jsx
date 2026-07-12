import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { getProfile } from "../../services/profileService";
import { useAuth } from "../../context/AuthContext";

function Profile() {

    const [profile, setProfile] = useState(null);

    const { logout } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const res = await getProfile();

                setProfile(res.data);

            } catch (error) {

                console.error(error);

            }

        };

        fetchProfile();

    }, []);

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    if (!profile) {

        return (

            <MainLayout>

                <h1 className="text-2xl">

                    Loading...

                </h1>

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <div className="max-w-3xl mx-auto">

                <div className="bg-white rounded-3xl shadow-xl p-10">

                    <div className="text-center">

                        <div className="w-28 h-28 bg-blue-600 rounded-full mx-auto flex items-center justify-center text-white text-5xl font-bold">

                            {profile.user.name.charAt(0)}

                        </div>

                        <h1 className="text-4xl font-bold mt-5">

                            {profile.user.name}

                        </h1>

                        <p className="text-gray-500">

                            {profile.user.email}

                        </p>

                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-10">

                        <div className="bg-blue-100 rounded-2xl p-6">

                            <h2 className="font-semibold">

                                Study Plans

                            </h2>

                            <p className="text-4xl font-bold mt-3">

                                {profile.studyPlans}

                            </p>

                        </div>

                        <div className="bg-green-100 rounded-2xl p-6">

                            <h2 className="font-semibold">

                                Quizzes

                            </h2>

                            <p className="text-4xl font-bold mt-3">

                                {profile.quizzes}

                            </p>

                        </div>

                    </div>

                    <div className="mt-10">

                        <h2 className="font-semibold">

                            Member Since

                        </h2>

                        <p className="text-gray-600 mt-2">

                            {new Date(profile.user.createdAt).toDateString()}

                        </p>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="mt-10 w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl"
                    >

                        Logout

                    </button>

                </div>

            </div>

        </MainLayout>

    );

}

export default Profile;