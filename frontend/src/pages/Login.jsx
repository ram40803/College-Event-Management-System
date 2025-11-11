// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/user-service/users/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.userId);
      navigate(data.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
    } catch (err) {
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f7ff]">
      <form onSubmit={handleLogin} className="bg-white p-8 shadow-lg rounded-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Email" className="border w-full p-2 mb-4 rounded-md" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" className="border w-full p-2 mb-4 rounded-md" required />
        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
}
