// src/pages/UserDashboard.jsx

import { useState } from "react";
import dummyEvents from "../data/dummyEvents";
import EventSection from "../components/EventSection";

export default function UserDashboard() {
  const [search, setSearch] = useState("");

  // Search filter using event.name
  const filtered = dummyEvents.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  // Categorizing using backend status values
  const categorized = {
    Ongoing: filtered.filter((e) => e.status === "Ongoing"),
    Open: filtered.filter((e) => e.status === "Open"),
    Completed: filtered.filter((e) => e.status === "Completed"),
    Cancelled: filtered.filter((e) => e.status === "Cancelled"),
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Events</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-8 border rounded-lg shadow-sm"
      />

      {/* Ongoing Events */}
      <h2 className="text-2xl font-semibold mb-4">🔥 Ongoing Events</h2>
      <EventSection/>


    </div>
  );
}
