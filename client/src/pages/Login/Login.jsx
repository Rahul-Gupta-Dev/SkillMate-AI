import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
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
            const res = await loginUser(form);

            // Save token using AuthContext
            login(res.data.token);

            alert("Login Successful");

            navigate("/");

        } catch (err) {
            alert(err.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-slate-100">
            <div className="bg-white p-10 rounded-3xl shadow-lg w-[420px]">

                <h1 className="text-3xl font-bold text-center mb-8">
                    Welcome Back
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">

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
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                    >
                        Login
                    </button>

                </form>

                <p className="text-center mt-5">
                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-blue-600 ml-2 hover:underline"
                    >
                        Register
                    </Link>

                </p>

            </div>
        </div>
    );
}

export default Login;