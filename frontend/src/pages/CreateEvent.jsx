import React, { useState } from "react";
import api from "../utils/api";

const CreateEvent = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    organizer: "",
    maxParticipantsCapacity: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" | "error"


  // Handle text inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image upload preview
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Create event without image first
      const eventRes = await api.post("/event-service/events", form);

      const eventId = eventRes.data.id;

      // 2️⃣ If image selected → upload image and update event
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        await api.post(
          `/event-service/events/${eventId}/upload-image`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      setMessage("Event created successfully!");
      setMessageType("success");

      setForm({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        location: "",
        organizer: "",
        maxParticipantsCapacity: "",
      });

      setImageFile(null);
      setImagePreview(null);

    } catch (error) {
      console.error(error);
      setMessage("Error creating event. Try again.");
      setMessageType("error");

    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-6">

      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        Create New Event
      </h1>

      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-3xl">

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* IMAGE UPLOAD */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Event Poster
            </label>

            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="block w-full text-sm text-gray-600"
              />
            </div>

            {/* IMAGE PREVIEW */}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 w-full h-60 object-cover rounded-xl shadow"
              />
            )}
          </div>

          {/* EVENT NAME */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Event Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* DATE ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                End Date & Time
              </label>
              <input
                type="datetime-local"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          </div>

          {/* LOCATION + ORGANIZER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Organizer
              </label>
              <input
                type="text"
                name="organizer"
                value={form.organizer}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          </div>

          {/* CAPACITY */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Max Participants
            </label>
            <input
              type="number"
              name="maxParticipantsCapacity"
              value={form.maxParticipantsCapacity}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
