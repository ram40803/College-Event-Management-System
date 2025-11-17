import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";

import {
  HiCalendar,
  HiUsers,
  HiSpeakerphone,
  HiCheckCircle,
  HiChartBar,
  HiUserGroup,
} from "react-icons/hi";

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
    <div className="min-h-screen bg-[#f0f7ff] px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-blue-900">Admin Dashboard</h1>
        <p className="text-gray-600 text-lg mt-2">Welcome, {user.name}</p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <FeatureCard
          icon={HiCalendar}
          title="Event Scheduling"
          description="Create and manage events easily."
          bgColor="#eaf4ff"
          iconBg="#2563eb"
          onClick={() => navigate("/admin/create-event")}
        />

        <FeatureCard
          icon={HiUsers}
          title="Registration System"
          description="Manage participant registrations."
          bgColor="#e9fff5"
          iconBg="#059669"
          onClick={() => navigate("/admin/registrations")}
        />

        <FeatureCard
          icon={HiSpeakerphone}
          title="Promotion Tools"
          description="Send announcements and promote events."
          bgColor="#fff3dd"
          iconBg="#ea580c"
          onClick={() => navigate("/admin/promotion-tools")}
        />

        <FeatureCard
          icon={HiCheckCircle}
          title="Check-In System"
          description="QR code check-in tracking."
          bgColor="#f3e7ff"
          iconBg="#7e22ce"
          onClick={() => navigate("/admin/checkin")}
        />

        <FeatureCard
          icon={HiChartBar}
          title="Analytics Dashboard"
          description="Track event performance."
          bgColor="#ffe3ea"
          iconBg="#db2777"
          onClick={() => navigate("/admin/analytics")}
        />

        <FeatureCard
          icon={HiUserGroup}
          title="Team Collaboration"
          description="Manage roles and communicate."
          bgColor="#eef2ff"
          iconBg="#1f2937"
          onClick={() => navigate("/admin/team")}
        />

      </div>
    </div>
  );
}
