import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function UserDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = localStorage.getItem("userId");

  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!userId) return;

    fetchUserRegistrations();
  }, []);

  const fetchUserRegistrations = async () => {
    try {
      const res = await api.get(
        `/event-registration-service/registrations/user/${userId}`
      );

      const registrationList = res.data;
      setRegistrations(registrationList);

      const eventPromises = registrationList.map((reg) =>
        api.get(`/event-service/events/${reg.eventId}`)
      );

      const eventResponses = await Promise.all(eventPromises);
      const eventData = eventResponses.map((e) => e.data);

      setEvents(eventData);
    } catch (error) {
      console.log("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const upcomingEvents = events.filter(
    (e) => new Date(e.startDate) > new Date()
  );

  const pastEvents = events.filter(
    (e) => new Date(e.startDate) <= new Date()
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading Dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">

        {/* USER PROFILE CARD */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
          <p className="text-gray-600">{user.email}</p>

          <div className="mt-4 flex gap-3">
            {/* <button
              onClick={() => navigate("/edit-profile")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit Profile
            </button> */}

            <Link
              to="/events"
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
            >
              View All Events
            </Link>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">Total Registrations</p>
            <p className="text-3xl font-bold">{registrations.length}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">Upcoming Events</p>
            <p className="text-3xl font-bold">{upcomingEvents.length}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">Past Events</p>
            <p className="text-3xl font-bold">{pastEvents.length}</p>
          </div>
        </div>

        {/* UPCOMING EVENTS */}
        <h2 className="text-xl font-bold mb-3">Upcoming Registered Events</h2>
        <div className="space-y-4 mb-10">
          {upcomingEvents.length === 0 && (
            <p className="text-gray-500">You have no upcoming events.</p>
          )}

          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow p-4 flex gap-4"
            >
              <img
                src={event.imageUrl}
                alt={event.name}
                className="w-32 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="text-lg font-bold">{event.name}</h3>
                <p className="text-gray-500 text-sm">
                  {new Date(event.startDate).toLocaleString()}
                </p>
                <Link
                  to={`/events/${event.id}`}
                  className="text-blue-700 font-semibold mt-2 inline-block"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* PAST EVENTS */}
        <h2 className="text-xl font-bold mb-3">Past Events</h2>
        <div className="space-y-4">
          {pastEvents.length === 0 && (
            <p className="text-gray-500">No past events found.</p>
          )}

          {pastEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow p-4 flex gap-4"
            >
              <img
                src={event.imageUrl}
                alt={event.name}
                className="w-32 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="text-lg font-bold">{event.name}</h3>
                <p className="text-gray-500 text-sm">
                  {new Date(event.startDate).toLocaleString()}
                </p>
                <Link
                  to={`/events/${event.id}`}
                  className="text-blue-700 font-semibold mt-2 inline-block"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}