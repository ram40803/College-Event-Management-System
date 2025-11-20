import React from "react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const {
    id,
    name,
    imageUrl,
    description,
    startDate,
    endDate,
    startRegistrationDate,
    endRegistrationDate,
    location,
    maxParticipantsCapacity,
    currentParticipants,
    organizer,
  } = event;

  // Compute event status
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  let status;
  if (now < start) status = "Upcoming";
  else if (now >= start && now <= end) status = "Ongoing";
  else status = "Completed";

  // Status colors
  const statusColors = {
    Upcoming: "bg-blue-100 text-blue-700",
    Ongoing: "bg-green-100 text-green-700",
    Completed: "bg-gray-200 text-gray-700",
  };

  // Participants percentage
  const percentage =
    maxParticipantsCapacity > 0
      ? Math.min(
          Math.round((currentParticipants / maxParticipantsCapacity) * 100),
          100
        )
      : 0;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer">

      {/* Banner Image */}
      <div className="relative">
        <img
          src={imageUrl || "/placeholder.png"}
          alt={name}
          className="w-full h-48 object-cover"
        />

        {/* Status Badge */}
        <span
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full shadow ${statusColors[status]}`}
        >
          {status}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
          {name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Event Info */}
        <div className="text-sm text-gray-500 space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <span>📅</span>
            <span>
              {new Date(startDate).toLocaleString()} →{" "}
              {new Date(endDate).toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span>📝</span>
            <span>
              Reg: {new Date(startRegistrationDate).toLocaleDateString()} →{" "}
              {new Date(endRegistrationDate).toLocaleDateString()}
            </span>
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
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>
              👥 {currentParticipants}/{maxParticipantsCapacity}
            </span>
            <span>{percentage}%</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={() => navigate(`/event-details/${id}`)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
