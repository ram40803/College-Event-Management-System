import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import api from "../utils/api";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get("/event-service/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      {/* 🌟 HERO SECTION */}
      <section className="w-full flex flex-col items-center justify-center text-center py-24 bg-linear-to-b from-blue-50 to-white px-6">
        <div className="bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-full mb-6">
          🌟 Transform Campus Events
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Organize Campus Events <br />
          <span className="text-blue-600">Like Never Before</span>
        </h1>

        <p className="text-gray-600 mt-6 text-lg md:text-xl max-w-3xl">
          Streamline event planning, boost student engagement, and create
          unforgettable experiences with our all-in-one platform designed for
          college communities.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-10 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            ✅ <span>Community Building</span>
          </div>
          <div className="flex items-center gap-2">
            ✅ <span>Exposure</span>
          </div>
          <div className="flex items-center gap-2">
            ✅ <span>Adventure</span>
          </div>
        </div>
      </section>

      {/* 🎉 EVENTS SECTION */}
      <section className="w-full max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Upcoming Events
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading events...</p>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No events available yet.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
