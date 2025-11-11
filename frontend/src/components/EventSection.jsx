import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";

const EventSection = () => {
  const [events, setEvents] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  // Example local data (replace with API call later)
  useEffect(() => {
    const sampleEvents = [
      {
        id: 1,
        title: "Tech Fest 2025",
        description:
          "Annual technology festival featuring coding competitions, hackathons, and tech talks from industry experts.",
        date: "2025-10-29T12:28:00",
        location: "Main Auditorium",
        capacity: 500,
        registered: 342,
        status: "Ongoing",
        category: "technical",
        image:
          "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80",
      },
      {
        id: 2,
        title: "Music Carnival",
        description:
          "Experience soulful melodies and electrifying performances by campus bands.",
        date: "2025-11-20T18:00:00",
        location: "Open Ground",
        capacity: 800,
        registered: 200,
        status: "Upcoming",
        category: "cultural",
        image:
          "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=800&q=80",
      },
      {
        id: 3,
        title: "Sports Meet 2025",
        description:
          "Inter-college sports tournament featuring multiple disciplines and prizes.",
        date: "2025-10-01T09:00:00",
        location: "College Stadium",
        capacity: 1000,
        registered: 900,
        status: "Completed",
        category: "sports",
        image:
          "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80",
      },
      {
        id: 4,
        title: "Art Exhibition",
        description:
          "Explore creativity and imagination through student art displays.",
        date: "2025-09-05T10:00:00",
        location: "Art Gallery",
        capacity: 300,
        registered: 100,
        status: "Cancelled",
        category: "exhibition",
        image:
          "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
      },
      {
        id: 5,
        title: "Literature Week",
        description:
          "A week-long celebration of poetry, storytelling, and creative writing.",
        date: "2025-11-15T14:00:00",
        location: "Auditorium Hall B",
        capacity: 400,
        registered: 250,
        status: "Upcoming",
        category: "literary",
        image:
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
      },
      {
        id: 6,
        title: "Entrepreneurship Summit",
        description:
          "Connect with startup founders, attend workshops, and pitch your innovative ideas.",
        date: "2025-11-25T11:00:00",
        location: "Innovation Hub",
        capacity: 600,
        registered: 420,
        status: "Ongoing",
        category: "business",
        image:
          "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
      },
    ];

    // Sorting order
    const order = ["Ongoing", "Upcoming", "Completed", "Cancelled"];
    const sorted = [...sampleEvents].sort(
      (a, b) => order.indexOf(a.status) - order.indexOf(b.status)
    );
    setEvents(sorted);
  }, []);

  const loadMore = () => setVisibleCount((prev) => prev + 6);

  return (
    <section className="py-16 px-8 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Explore Events
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.slice(0, visibleCount).map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {visibleCount < events.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={loadMore}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default EventSection;
