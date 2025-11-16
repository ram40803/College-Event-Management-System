// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f0f7ff] p-6">
      {/* Top Welcome Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-blue-900">Admin Dashboard</h1>
        <p className="text-gray-700 mt-2">Welcome, {user.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {/* Users Card */}
        <div className="backdrop-blur-xl bg-white/40 shadow-lg p-6 rounded-2xl border border-white/50">
          <h2 className="text-xl font-semibold text-blue-800">Total Users</h2>
          <p className="text-4xl font-bold mt-2 text-blue-900">42</p>
        </div>

        {/* Events Card */}
        <div className="backdrop-blur-xl bg-white/40 shadow-lg p-6 rounded-2xl border border-white/50">
          <h2 className="text-xl font-semibold text-blue-800">Total Events</h2>
          <p className="text-4xl font-bold mt-2 text-blue-900">18</p>
        </div>

        {/* Admins Card */}
        <div className="backdrop-blur-xl bg-white/40 shadow-lg p-6 rounded-2xl border border-white/50">
          <h2 className="text-xl font-semibold text-blue-800">Admins</h2>
          <p className="text-4xl font-bold mt-2 text-blue-900">3</p>
        </div>
      </div>

      {/* Management Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Manage Users */}
        <div className="backdrop-blur-xl bg-white/40 shadow-lg p-8 rounded-2xl border border-white/50">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            User Management
          </h2>
          <p className="text-gray-700 mb-6">Add, remove, and manage registered users.</p>

          <button
            onClick={() => navigate("/admin/users")}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Manage Users
          </button>
        </div>

        {/* Manage Events */}
        <div className="backdrop-blur-xl bg-white/40 shadow-lg p-8 rounded-2xl border border-white/50">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Event Management
          </h2>
          <p className="text-gray-700 mb-6">Create, modify, or delete campus events.</p>

          <button
            onClick={() => navigate("/admin/events")}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Manage Events
          </button>
        </div>

      </div>
    </div>
  );
}
