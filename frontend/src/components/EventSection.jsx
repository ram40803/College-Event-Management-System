import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const EventSection = () => {
  const navigate = useNavigate();

  // STATES
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("ALL"); // ALL | UPCOMING | ONGOING | COMPLETED

  const [message, setMessage] = useState("");

  const isAdmin = localStorage.getItem("role") === "ADMIN";

  useEffect(() => {
    loadEvents(page);
  }, [page, filter]);

  const loadEvents = async (pageNum) => {
    try {
      setLoading(true);

      let url = `/event-service/events?page=${pageNum}&size=6`;

      // Apply search
      if (keyword.trim() !== "") {
        url = `/event-service/events/search?keyword=${keyword}&page=${pageNum}&size=6`;
      }

      // Fetch data
      const response = await api.get(url);

      let data = response.data.content;

      // Apply filter manually (backend doesn't support)
      data = data.filter((e) => {
        const now = new Date();
        const start = new Date(e.startDate);
        const end = new Date(e.endDate);

        if (filter === "UPCOMING") return now < start;
        if (filter === "ONGOING") return now >= start && now <= end;
        if (filter === "COMPLETED") return now > end;
        return true;
      });

      setEvents(data);
      setTotalPages(response.data.totalPages);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await api.delete(`/event-service/events/${id}`);

      setMessage("Event deleted successfully!");
      loadEvents(page);

      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to delete event.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleSearch = () => {
    setPage(0);
    loadEvents(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      {/* Toast message */}
      {message && (
        <div className="mb-4 bg-green-100 text-green-700 px-4 py-2 rounded-lg text-center">
          {message}
        </div>
      )}

      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        All Events
      </h1>

      {/* Search + Filter Row */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

        {/* Search Bar + Button */}
        <div className="flex md:flex-row items-center gap-3 w-full mx-auto">

          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search events..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          {["ALL", "UPCOMING", "ONGOING", "COMPLETED"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white border hover:bg-gray-100"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Events */}
      {loading ? (
        <p className="text-center text-gray-600">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-600">No events found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="relative">
                {/* Event Card */}
                <EventCard event={event} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className={`px-6 py-2 rounded-lg border ${page === 0
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
              disabled={page >= totalPages - 1}
              onClick={() => setPage(page + 1)}
              className={`px-6 py-2 rounded-lg border ${page >= totalPages - 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
                }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EventSection;


