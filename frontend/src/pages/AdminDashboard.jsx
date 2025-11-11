// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/event-service/events/")
      .then((res) => setEvents(res.data))
      .catch(() => alert("Failed to load events"));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/event-service/events/${id}`);
      setEvents(events.filter((e) => e.id !== id));
      alert("Event deleted successfully");
    } catch {
      alert("Failed to delete event");
    }
  };

  return (
    <div className="p-6 bg-[#f0f7ff] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => navigate("/admin/create-event")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="font-semibold text-lg mb-2">{event.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{event.category}</p>
            <p className="text-sm mb-2">{event.location}</p>
            <div className="flex justify-between">
              <button
                onClick={() => navigate(`/admin/edit-event/${event.id}`)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
