import React, { useState } from "react";
import api from "../utils/api";

const EventCreate = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    maxParticipantsCapacity: "",
    startDate: "",
    endDate: "",
    startRegistrationDate: "",
    endRegistrationDate: "",
    location: "",
    organizer: "",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Create event without image
      const eventResponse = await api.post("/event-service/events", formData);
      const eventId = eventResponse.data.id;

      // 2️⃣ Upload image, if selected
      if (image) {
        const formDataImg = new FormData();
        formDataImg.append("file", image);

        await api.post(
          `/event-service/events/${eventId}/upload-image`,
          formDataImg,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      setMessage("🎉 Event created successfully!");
      setFormData({
        name: "",
        description: "",
        maxParticipantsCapacity: "",
        startDate: "",
        endDate: "",
        startRegistrationDate: "",
        endRegistrationDate: "",
        location: "",
        organizer: "",
      });
      setImage(null);

    } catch (error) {
      setMessage("❌ Failed to create event.");
      console.error("Create event error:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 py-14 px-6">
      <div className="w-full max-w-3xl bg-white p-10 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          Create New Event
        </h1>

        {message && (
          <div className="mb-5 text-center py-3 bg-blue-100 text-blue-700 rounded-lg font-medium">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* NAME */}
          <div>
            <label className="font-medium text-gray-700">Event Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg mt-1"
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="font-medium text-gray-700">Event Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full mt-1"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              rows="4"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg mt-1"
            ></textarea>
          </div>

          {/* DATE FIELDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-medium text-gray-700">Start Date</label>
              <input
                type="datetime-local"
                name="startDate"
                required
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg mt-1"
              />
            </div>

            <div>
              <label className="font-medium text-gray-700">End Date</label>
              <input
                type="datetime-local"
                name="endDate"
                required
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg mt-1"
              />
            </div>
          </div>

          {/* REGISTRATION DATES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-medium text-gray-700">
                Registration Start Date
              </label>
              <input
                type="datetime-local"
                name="startRegistrationDate"
                required
                value={formData.startRegistrationDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg mt-1"
              />
            </div>

            <div>
              <label className="font-medium text-gray-700">
                Registration End Date
              </label>
              <input
                type="datetime-local"
                name="endRegistrationDate"
                required
                value={formData.endRegistrationDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg mt-1"
              />
            </div>
          </div>

          {/* CAPACITY */}
          <div>
            <label className="font-medium text-gray-700">
              Max Participants
            </label>
            <input
              type="number"
              name="maxParticipantsCapacity"
              required
              value={formData.maxParticipantsCapacity}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg mt-1"
            />
          </div>

          {/* LOCATION */}
          <div>
            <label className="font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg mt-1"
            />
          </div>

          {/* ORGANIZER */}
          <div>
            <label className="font-medium text-gray-700">Organizer</label>
            <input
              type="text"
              name="organizer"
              required
              value={formData.organizer}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-xl"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventCreate;
