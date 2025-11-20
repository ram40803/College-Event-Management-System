import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function UpdateEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    maxParticipantsCapacity: "",
    location: "",
    organizer: "",
    startDate: "",
    endDate: "",
    startRegistrationDate: "",
    endRegistrationDate: "",
    imageUrl: ""
  });

  const [message, setMessage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Load event details
  const fetchEvent = async () => {
    try {
      const res = await api.get(`/event-service/events/${id}`);
      const data = res.data;

      // format datetime-local fields correctly
      const formatDate = (dateStr) => dateStr ? dateStr.slice(0, 16) : "";

      setEventData({
        ...data,
        startDate: formatDate(data.startDate),
        endDate: formatDate(data.endDate),
        startRegistrationDate: formatDate(data.startRegistrationDate),
        endRegistrationDate: formatDate(data.endRegistrationDate),
      });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to load event details." });
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  // Update event handler
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/event-service/events/${id}`, eventData);
      setMessage({ type: "success", text: "Event updated successfully!" });

      setTimeout(() => navigate(`/event-details/${id}`), 1500);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Event update failed." });
    }
  };

  // Upload image
  const handleImageUpload = async () => {
    if (!imageFile) {
      setMessage({ type: "error", text: "Please select an image." });
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const res = await api.post(
        `/event-service/events/${id}/upload-image`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setEventData((prev) => ({ ...prev, imageUrl: res.data.imageUrl }));

      setMessage({ type: "success", text: "Image uploaded successfully!" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Image upload failed." });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Event</h2>

      {message && (
        <div
          className={`p-3 mb-4 text-center rounded-lg ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          placeholder="Event Name"
          value={eventData.name}
          onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
          className="w-full p-3 border rounded-lg"
          required
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          rows="4"
          value={eventData.description}
          onChange={(e) =>
            setEventData({ ...eventData, description: e.target.value })
          }
          className="w-full p-3 border rounded-lg"
        />

        {/* Location & Organizer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Location"
            value={eventData.location}
            onChange={(e) =>
              setEventData({ ...eventData, location: e.target.value })
            }
            className="p-3 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Organizer"
            value={eventData.organizer}
            onChange={(e) =>
              setEventData({ ...eventData, organizer: e.target.value })
            }
            className="p-3 border rounded-lg"
          />
        </div>

        {/* Capacity */}
        <input
          type="number"
          placeholder="Max Participants"
          value={eventData.maxParticipantsCapacity}
          onChange={(e) =>
            setEventData({
              ...eventData,
              maxParticipantsCapacity: e.target.value,
            })
          }
          className="w-full p-3 border rounded-lg"
        />

        {/* Dates Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Start Date</label>
            <input
              type="datetime-local"
              value={eventData.startDate}
              onChange={(e) =>
                setEventData({ ...eventData, startDate: e.target.value })
              }
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">End Date</label>
            <input
              type="datetime-local"
              value={eventData.endDate}
              onChange={(e) =>
                setEventData({ ...eventData, endDate: e.target.value })
              }
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Registration Start Date</label>
            <input
              type="datetime-local"
              value={eventData.startRegistrationDate}
              onChange={(e) =>
                setEventData({
                  ...eventData,
                  startRegistrationDate: e.target.value,
                })
              }
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Registration End Date</label>
            <input
              type="datetime-local"
              value={eventData.endRegistrationDate}
              onChange={(e) =>
                setEventData({
                  ...eventData,
                  endRegistrationDate: e.target.value,
                })
              }
              className="w-full p-3 border rounded-lg"
            />
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="mt-6">
          <label className="block mb-2 text-gray-700 font-medium">
            Event Banner Image
          </label>

          {eventData.imageUrl && (
            <img
              src={eventData.imageUrl}
              alt="Event"
              className="w-full h-56 object-cover rounded-lg mb-3 shadow"
            />
          )}

          <div className="flex items-center gap-3">
            <input
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="border p-2 rounded-lg"
            />

            <button
              type="button"
              onClick={handleImageUpload}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Upload
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition mt-4"
        >
          Update Event
        </button>
      </form>
    </div>
  );
}
