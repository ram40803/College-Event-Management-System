import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import MessageBanner from "../components/MessageBanner.jsx";

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState("");
  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);

  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchEventDetails();
    checkRegistrationStatus();
  }, []);

  const fetchEventDetails = async () => {
    try {
      const response = await api.get(`/event-service/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error("Error loading event:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkRegistrationStatus = async () => {
    try {
      const response = await api.get(
        `/event-registration-service/registrations/check`,
        { params: { eventId: id, userId } }
      );

      if (response.data.exists) {
        setIsRegistered(true);
        setRegistrationId(response.data.record.id);
      }
    } catch (error) {
      console.error("Error checking registration status:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const res = await api.post(`/event-registration-service/registrations`, {
        eventId: id,
        userId,
      });

      setMessageType("success");
      setMessage("Registered successfully!");
      setIsRegistered(true);
      setRegistrationId(res.data.registration.id);
    } catch (error) {
      setMessageType("error");
      setMessage(error.response?.data?.message || "Registration failed.");
    }
  };

  const handleCancelRegistration = async () => {
    try {
      await api.delete(
        `/event-registration-service/registrations/${registrationId}`
      );

      setMessageType("success");
      setMessage("Registration cancelled.");
      setIsRegistered(false);
    } catch (error) {
      setMessageType("error");
      setMessage("Cancel registration failed.");
    }
  };

  const handleDeleteEvent = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await api.delete(`/event-service/events/${id}`);

      setMessageType("success");
      setMessage("Event deleted successfully!");

      setTimeout(() => navigate("/"), 1200);
    } catch (error) {
      setMessageType("error");
      setMessage("Failed to delete event.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!event) return <p className="text-center mt-10">Event not found.</p>;

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">

      {message && (
        <MessageBanner
          type={messageType}
          message={message}
          onClose={() => {
            setMessage("");
            setMessageType("");
          }}
        />
      )}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Event Banner */}
        <img
          src={event.imageUrl}
          alt={event.name}
          className="w-full h-80 object-cover"
        />

        <div className="p-6">

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {event.name}
          </h1>

          <p className="text-gray-700 text-lg mb-5">
            {event.description}
          </p>

          {/* Dates */}
          <div className="space-y-2 text-gray-700">
            <p>📅 <b>Start:</b> {new Date(event.startDate).toLocaleString()}</p>
            <p>📅 <b>End:</b> {new Date(event.endDate).toLocaleString()}</p>

            <p>📝 <b>Registration Start:</b> {new Date(event.startRegistrationDate).toLocaleString()}</p>
            <p>📝 <b>Registration End:</b> {new Date(event.endRegistrationDate).toLocaleString()}</p>

            <p>📍 <b>Location:</b> {event.location}</p>
            <p>👤 <b>Organizer:</b> {event.organizer}</p>
          </div>

          {/* Participants */}
          <div className="mt-5">
            <p className="text-gray-700">
              👥 <b>{event.currentParticipants}</b> / {event.maxParticipantsCapacity}
            </p>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{
                  width: `${Math.min(
                    (event.currentParticipants / event.maxParticipantsCapacity) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-8 flex gap-4">

            {/* Student Buttons */}
            {role === "student" && (
              isRegistered ? (
                <button
                  onClick={handleCancelRegistration}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                >
                  Cancel Registration
                </button>
              ) : (
                <button
                  onClick={handleRegister}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Register Now
                </button>
              )
            )}

            {/* Admin Buttons */}
            {role === "admin" && (
              <>
                <button
                  onClick={() => navigate(`/admin/update-event/${id}`)}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  Edit Event
                </button>

                <button
                  onClick={handleDeleteEvent}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete Event
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
