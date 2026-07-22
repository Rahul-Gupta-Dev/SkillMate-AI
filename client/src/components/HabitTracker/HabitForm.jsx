import { useEffect } from "react";

import {
    createHabit,
    getTodayHabit,
    updateHabit,
} from "../../services/habitService";

import {
    BookOpen,
    Smartphone,
    HeartPulse,
    Save,
} from "lucide-react";


function HabitForm({ habitData, setHabitData }) {

    const formData = habitData;
    const setFormData = setHabitData;

    useEffect(() => {

        fetchTodayHabit();

    }, []);

    const fetchTodayHabit = async () => {

        try {

            const res = await getTodayHabit();
            console.log(res.data);
            if (res.data.habit) {

                setHabitData({

                    studyHours: res.data.habit.studyHours || "",
                    readingMinutes: res.data.habit.readingMinutes || "",
                    goal: res.data.habit.goal || "",

                    instagramHours: res.data.habit.instagramHours || "",
                    youtubeHours: res.data.habit.youtubeHours || "",
                    gamingHours: res.data.habit.gamingHours || "",
                    otherSocialHours: res.data.habit.otherSocialHours || "",

                    sleepHours: res.data.habit.sleepHours || "",
                    exerciseMinutes: res.data.habit.exerciseMinutes || "",
                    waterIntake: res.data.habit.waterIntake || "",

                    mood: res.data.habit.mood || "",
                    notes: res.data.habit.notes || "",

                });

            }

        } catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setHabitData((prev) => ({
            ...prev,
            [name]: value,
        }));


    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const today = await getTodayHabit();

            if (today.data.habit) {

                await updateHabit(formData);

                alert("Habit Updated Successfully ✅");

            } else {

                await createHabit(formData);

                alert("Habit Saved Successfully ✅");

            }

            await fetchTodayHabit();

        } catch (err) {

            console.error(err);

        }

    };



    return (

        <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-3xl font-bold mb-8">

                Daily Habit Entry

            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-10"
            >

                {/* ================= Study ================= */}

                <div>

                    <div className="flex items-center gap-3 mb-6">

                        <BookOpen className="text-blue-600" />

                        <h3 className="text-2xl font-bold">

                            Study

                        </h3>

                    </div>

                    <div className="grid md:grid-cols-2 gap-6">

                        <input
                            type="number"
                            name="studyHours"
                            max="24"
                            placeholder="Study Hours"
                            value={formData.studyHours}
                            onChange={handleChange}
                            className="border rounded-xl p-4"

                        />

                        <input
                            type="number"
                            name="readingMinutes"
                            max="1440"
                            placeholder="Reading Minutes"
                            value={formData.readingMinutes}
                            onChange={handleChange}
                            className="border rounded-xl p-4"
                        />

                    </div>

                    <textarea

                        rows="3"

                        name="goal"

                        placeholder="Today's Goal"

                        value={formData.goal}

                        onChange={handleChange}

                        className="border rounded-xl p-4 w-full mt-6"

                    />

                </div>

                {/* ================= Digital Habits ================= */}

                <div>

                    <div className="flex items-center gap-3 mb-6">

                        <Smartphone className="text-pink-600" />

                        <h3 className="text-2xl font-bold">

                            Digital Habits

                        </h3>

                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

                        <input
                            type="number"
                            name="instagramHours"
                            max="24"
                            placeholder="Instagram"
                            value={formData.instagramHours}
                            onChange={handleChange}
                            className="border rounded-xl p-4"
                        />

                        <input
                            type="number"
                            name="youtubeHours"
                            max="24"
                            placeholder="YouTube"
                            value={formData.youtubeHours}
                            onChange={handleChange}
                            className="border rounded-xl p-4"
                        />

                        <input
                            type="number"
                            name="gamingHours"
                            max="24"
                            placeholder="Gaming"
                            value={formData.gamingHours}
                            onChange={handleChange}
                            className="border rounded-xl p-4"
                        />

                        <input
                            type="number"
                            name="otherSocialHours"
                            max="24"
                            placeholder="Other Social"
                            value={formData.otherSocialHours}
                            onChange={handleChange}
                            className="border rounded-xl p-4"
                        />

                    </div>

                </div>

                {/* ================= Health ================= */}

                <div>

                    <div className="flex items-center gap-3 mb-6">

                        <HeartPulse className="text-green-600" />

                        <h3 className="text-2xl font-bold">

                            Health

                        </h3>

                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

                        <input
                            type="number"
                            name="sleepHours"
                            max="24"
                            placeholder="Sleep Hours"
                            value={formData.sleepHours}
                            onChange={handleChange}
                            className="border rounded-xl p-4"
                        />

                        <input
                            type="number"
                            name="exerciseMinutes"
                            max="300"
                            placeholder="Exercise Minutes"
                            value={formData.exerciseMinutes}
                            onChange={handleChange}
                            className="border rounded-xl p-4"
                        />

                        <input
                            type="number"
                            name="waterIntake"
                            placeholder="Water (Glasses)"
                            value={formData.waterIntake}
                            onChange={handleChange}
                            className="border rounded-xl p-4"
                        />

                        <select
                            name="mood"
                            value={formData.mood}
                            onChange={handleChange}
                            className="border rounded-xl p-4"
                        >
                            <option value="">Select Mood</option>
                            <option>😁 Excellent</option>
                            <option>😊 Happy</option>
                            <option>😐 Normal</option>
                            <option>😔 Sad</option>
                            <option>😫 Stressed</option>
                        </select>

                    </div>

                    <textarea

                        rows="4"

                        name="notes"

                        placeholder="Additional Notes"

                        value={formData.notes}

                        onChange={handleChange}

                        className="border rounded-xl p-4 w-full mt-6"

                    />

                </div>

                <button

                    type="submit"

                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl px-8 py-4 flex items-center gap-3 font-semibold transition "

                >

                    <Save size={20} />

                    Save Today's Habit

                </button>

            </form>

        </div>

    );

}

export default HabitForm;