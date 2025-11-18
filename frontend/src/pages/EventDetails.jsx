import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const response = await api.get(`/event-service/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error("Error fetching event details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "UPCOMING":
        return "bg-blue-100 text-blue-700";
      case "ONGOING":
        return "bg-green-100 text-green-700";
      case "COMPLETED":
        return "bg-gray-300 text-gray-700";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <p className="text-gray-600 text-xl">Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <p className="text-red-500 text-xl">Event not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 pt-10 pb-20">

      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden">

        {/* EVENT IMAGE */}
        <div className="w-full h-80 bg-gray-200">
          <img
            src={event.imageUrl || "/placeholder.jpg"}
            alt={event.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="p-10">

          {/* TITLE + STATUS */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-extrabold text-gray-900">
              {event.name}
            </h1>

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                event.status
              )}`}
            >
              {event.status}
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            {event.description}
          </p>

          {/* DETAILS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

            <div className="space-y-3">
              <h2 className="font-bold text-gray-800 text-xl">Event Details</h2>
              <p className="text-gray-600">
                <strong>Date:</strong> <br />
                {event.startDate.replace("T", " ")} <br />→ <br />
                {event.endDate.replace("T", " ")}
              </p>

              <p className="text-gray-600">
                <strong>Location:</strong> {event.location}
              </p>

              <p className="text-gray-600">
                <strong>Organizer:</strong> {event.organizer}
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-bold text-gray-800 text-xl">Participants</h2>

              <p className="text-gray-600">
                <strong>Capacity:</strong>{" "}
                {event.currentParticipants} / {event.maxParticipantsCapacity}
              </p>

              {/* PROGRESS BAR */}
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{
                    width: `${
                      (event.currentParticipants /
                        event.maxParticipantsCapacity) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* CTA BUTTON */}
          <div className="mt-8 flex justify-center">
            <button
              className="px-8 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition"
            >
              Register Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventDetails;
