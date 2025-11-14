import React from "react";

const EventCard = ({ event }) => {
  const {
    id,
    name,
    description,
    date,
    location,
    status,
    maxParticipantsCapacity,
    currentParticipants,
    organizer,
  } = event;

  // Compute participant percentage
  const percentage = Math.min(
    Math.round((currentParticipants / maxParticipantsCapacity) * 100),
    100
  );

  // Status colors based on backend 'status' value
  const statusColors = {
    Open: "bg-green-100 text-green-700",
    Ongoing: "bg-yellow-100 text-yellow-700",
    Completed: "bg-gray-200 text-gray-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg">
      {/* Image placeholder (optional if backend adds image later) */}
      <div className="relative">
        <img
          src={`https://source.unsplash.com/600x400/?conference,event,${name}`}
          alt={name}
          className="w-full h-48 object-cover"
        />

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
        <h3 className="text-lg font-bold text-gray-800 mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {description}
        </p>

        <div className="text-sm text-gray-500 space-y-1 mb-3">
          <div className="flex items-center gap-2">
            <span>📅</span>
            <span>{new Date(date).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>👤</span>
            <span>Organizer: {organizer}</span>
          </div>
        </div>

        {/* Participants Progress Bar */}
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>
            👥 {currentParticipants} / {maxParticipantsCapacity}
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
