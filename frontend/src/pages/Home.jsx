import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import api from "../utils/api";
import EventSection from "../components/EventSection";

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

      const response = await api.get(`/event-service/events?page=${pageNum}&size=9`);

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

      <EventSection />
    </div>
  );
};

export default Home;
