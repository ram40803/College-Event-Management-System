// src/pages/UserDashboard.jsx
import { useEffect, useState } from "react";
import api from "../utils/api";

export default function UserDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    api
      .get(`/event-registration-service/registrations/user/${userId}`)
      .then((res) => setRegistrations(res.data))
      .catch(() => alert("Failed to load registrations"));
  }, [userId]);

  return (
    <div className="p-6 bg-[#f0f7ff] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Registrations</h1>

      {registrations.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        <ul className="space-y-4">
          {registrations.map((reg) => (
            <li
              key={reg.id}
              className="bg-white p-4 rounded-xl shadow-md border border-gray-200"
            >
              <p>
                <strong>Event:</strong> {reg.eventTitle}
              </p>
              <p>
                <strong>Status:</strong> {reg.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
