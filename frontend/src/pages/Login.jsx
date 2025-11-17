import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api"; // ✅ Make sure this exists (Axios instance)

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await api.post("/user-service/users/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      // Save Login Data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user.id);

      // Notify navbar & protected routes
      window.dispatchEvent(new Event("authChange"));

      // Redirect by role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      setErrorMsg("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f0f7ff] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Welcome Back
        </h1>

        {errorMsg && (
          <p className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm border border-red-300">
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <label className="block font-medium mb-1 text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <label className="block font-medium mb-1 text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300 mb-6 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="text-center mt-4 text-gray-700">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-700 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
