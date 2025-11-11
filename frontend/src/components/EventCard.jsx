import React from "react";

const EventCard = ({ event }) => {
  const {
    id,
    title,
    description,
    date,
    location,
    capacity,
    registered,
    status,
    image,
    category,
  } = event;

  const percentage = Math.min(Math.round((registered / capacity) * 100), 100);

  const statusColors = {
    Ongoing: "bg-green-100 text-green-700",
    Upcoming: "bg-yellow-100 text-yellow-700",
    Completed: "bg-gray-200 text-gray-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />

        {/* Category Tag */}
        <span className="absolute bottom-2 left-2 bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
          {category}
        </span>

        {/* Status Badge */}
        <span
          className={`absolute top-2 right-2 text-xs font-medium px-3 py-1 rounded-full ${
            statusColors[status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>

        <div className="text-sm text-gray-500 space-y-1 mb-3">
          <div className="flex items-center gap-2">
            <span>📅</span>
            <span>{new Date(date).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span>{location}</span>
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>
            👥 {registered} / {capacity}
          </span>
          <span>{percentage}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;

