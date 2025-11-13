// src/pages/CreateEvent.jsx
import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    start_date: "",
    max_participants: 0,
    status: "upcoming",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/event-service/events", form);
      alert("Event created successfully");
      navigate("/admin/dashboard");
    } catch {
      alert("Failed to create event");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f7ff]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Event</h2>
        {Object.keys(form).map((key) => (
          <input
            key={key}
            type={key.includes("date") ? "datetime-local" : "text"}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key.replace("_", " ")}
            className="border w-full p-2 mb-4 rounded-md"
            required
          />
        ))}
        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Create
        </button>
      </form>
    </div>
  );
}
