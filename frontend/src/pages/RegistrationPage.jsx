import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import ConfirmModal from "../components/ConfirmModal";

export default function RegistrationPage() {
  const { id } = useParams(); // eventId from URL
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registeredId, setRegisteredId] = useState(null);
  const [modal, setModal] = useState(null); // { action: "register"/"cancel", open: true }

  const userId = localStorage.getItem("userId");

  // ---------------------------
  // FETCH EVENT DETAILS
  // ---------------------------
  useEffect(() => {
    api
      .get(`/event-service/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  // ---------------------------
  // CHECK IF USER REGISTERED
  // ---------------------------
  useEffect(() => {
    api
      .get(`/event-registration-service/registrations/user/${userId}`)
      .then((res) => {
        const match = res.data.find((r) => r.eventId === id);
        if (match) setRegisteredId(match.id);
      })
      .catch(() => {});
  }, [id, userId]);

  if (loading) return <div className="p-10 text-center text-xl">Loading event...</div>;
  if (!event) return <div className="p-10 text-center text-xl text-red-600">Event not found.</div>;

  const {
    name,
    imageUrl,
    description,
    startDate,
    endDate,
    location,
    maxParticipantsCapacity,
    currentParticipants,
    registrationStart,
    registrationEnd
  } = event;

  const now = new Date();
  const regOpen = now >= new Date(registrationStart) && now <= new Date(registrationEnd);
  const isFull = currentParticipants >= maxParticipantsCapacity;

  // ---------------------------
  // HANDLE REGISTER
  // ---------------------------
  const handleRegister = async () => {
    try {
      const res = await api.post(`/event-registration-service/registrations`, {
        userId,
        eventId: id,
      });

      setRegisteredId(res.data.id);
      setModal(null);
    } catch (err) {
      setModal(null);
    }
  };

  // ---------------------------
  // HANDLE CANCEL
  // ---------------------------
  const handleCancel = async () => {
    try {
      await api.delete(`/event-registration-service/registrations/${registeredId}`);
      setRegisteredId(null);
      setModal(null);
    } catch (err) {
      setModal(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">

        <img
          src={imageUrl}
          className="w-full h-64 object-cover"
          alt="event"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-3">{name}</h1>
          <p className="text-gray-700 mb-6">{description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Info label="Start Date" value={new Date(startDate).toLocaleString()} />
            <Info label="End Date" value={new Date(endDate).toLocaleString()} />
            <Info label="Location" value={location} />
            <Info label="Capacity" value={`${currentParticipants} / ${maxParticipantsCapacity}`} />
          </div>

          {/* -------------------- BUTTON SECTION -------------------- */}
          {registeredId ? (
            <button
              onClick={() => setModal({ action: "cancel", open: true })}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Cancel Registration
            </button>
          ) : (
            <button
              disabled={!regOpen || isFull}
              onClick={() => setModal({ action: "register", open: true })}
              className={`w-full py-3 rounded-lg font-semibold transition 
                ${regOpen && !isFull
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }
              `}
            >
              {isFull ? "Event Full" : regOpen ? "Register" : "Registration Closed"}
            </button>
          )}
        </div>
      </div>

      {/* ------------------ CONFIRMATION MODAL ------------------ */}
      {modal?.open && (
        <ConfirmModal
          title={modal.action === "register" ? "Confirm Registration" : "Cancel Registration"}
          message={
            modal.action === "register"
              ? "Do you want to register for this event?"
              : "Are you sure you want to cancel your registration?"
          }
          onConfirm={modal.action === "register" ? handleRegister : handleCancel}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}

const Info = ({ label, value }) => (
  <div className="p-4 bg-gray-100 rounded-lg">
    <p className="font-semibold text-gray-800">{label}</p>
    <p className="text-gray-600">{value}</p>
  </div>
);
