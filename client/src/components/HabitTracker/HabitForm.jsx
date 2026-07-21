import { createHabit } from "../../services/habitService";
import { useState } from "react";
import {
    BookOpen,
    Smartphone,
    HeartPulse,
    Save,
} from "lucide-react";


function HabitForm() {

    const [formData, setFormData] = useState({

        studyHours: "",
        readingMinutes: "",
        goal: "",

        instagramHours: "",
        youtubeHours: "",
        gamingHours: "",
        otherSocialHours: "",

        sleepHours: "",
        exerciseMinutes: "",
        waterIntake: "",
        mood: "",

        notes: ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await createHabit(formData);

            console.log(res.data);

            alert("Habit Saved Successfully ✅");

        } catch (err) {

            console.error(err);

            alert("Failed to Save Habit");

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
                            placeholder="Study Hours"
                            value={formData.studyHours}
                            onChange={handleChange}
                            className="border rounded-xl p-4"
                        />

                        <input
                            type="number"
                            name="readingMinutes"
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
                            placeholder="Instagram"
                            value={formData.instagramHours}
                            onChange={handleChange}
                            className="border rounded-xl p-4"
                        />

                        <input
                            type="number"
                            name="youtubeHours"
                            placeholder="YouTube"
                            value={formData.youtubeHours}
                            onChange={handleChange}
                            className="border rounded-xl p-4"
                        />

                        <input
                            type="number"
                            name="gamingHours"
                            placeholder="Gaming"
                            value={formData.gamingHours}
                            onChange={handleChange}
                            className="border rounded-xl p-4"
                        />

                        <input
                            type="number"
                            name="otherSocialHours"
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
                            placeholder="Sleep Hours"
                            value={formData.sleepHours}
                            onChange={handleChange}
                            className="border rounded-xl p-4"
                        />

                        <input
                            type="number"
                            name="exerciseMinutes"
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