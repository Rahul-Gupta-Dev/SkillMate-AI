import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/authService";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await registerUser(form);

            alert(res.data.message);

            navigate("/login");

        } catch (err) {

            console.log("ERROR:", err);

            console.log("RESPONSE:", err.response);

            console.log("DATA:", err.response?.data);

            alert(err.response?.data?.message || err.message);

        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-slate-100">

            <div className="bg-white p-10 rounded-3xl shadow-lg w-[420px]">

                <h1 className="text-3xl font-bold text-center mb-8">
                    Create Account
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <button
                        className="w-full bg-blue-600 text-white py-3 rounded-xl"
                    >
                        Register
                    </button>

                </form>

                <p className="text-center mt-5">

                    Already have an account?

                    <Link
                        to="/login"
                        className="text-blue-600 ml-2"
                    >

                        Login

                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;