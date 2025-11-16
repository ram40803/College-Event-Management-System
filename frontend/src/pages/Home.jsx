import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import api from "../utils/api";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // pagination states
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchEvents(page);
  }, [page]);

  const fetchEvents = async (pageNum) => {
    try {
      setLoading(true);

      const response = await api.get(`/event-service/events?page=${pageNum}&size=10`);

      setEvents(response.data.content);
      setTotalPages(response.data.totalPages);

    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">

      {/* 🌟 HERO SECTION */}
      <section className="w-full flex flex-col items-center justify-center text-center py-24 bg-gradient-to-b from-blue-50 to-white px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Organize Campus Events <br />
          <span className="text-blue-600">Like Never Before</span>
        </h1>

        <p className="text-gray-600 mt-6 text-lg md:text-xl max-w-3xl">
          Discover amazing events and participate with your friends!
        </p>
      </section>

      {/* 🎉 EVENTS SECTION */}
      <section className="w-full max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Upcoming Events
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading events...</p>
        ) : events.length > 0 ? (
          <>
            {/* Event cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {/* Pagination Buttons */}
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={handlePrev}
                disabled={page === 0}
                className={`px-6 py-2 rounded-lg border ${
                  page === 0
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                Previous
              </button>

              <span className="text-gray-700 font-medium">
                Page {page + 1} of {totalPages}
              </span>

              <button
                onClick={handleNext}
                disabled={page === totalPages - 1}
                className={`px-6 py-2 rounded-lg border ${
                  page === totalPages - 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">No events available yet.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
