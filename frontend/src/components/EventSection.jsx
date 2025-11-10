import { MapPin, Calendar, Users } from "lucide-react";

const events = [
  {
    title: "Tech Fest 2025",
    date: "Nov 25, 2025",
    location: "Auditorium Hall",
    attendees: "120+",
    image: "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=900&q=60",
  },
  {
    title: "Cultural Night",
    date: "Dec 10, 2025",
    location: "Main Ground",
    attendees: "300+",
    image: "https://images.unsplash.com/photo-1556767576-5ec41e3d8f43?auto=format&fit=crop&w=900&q=60",
  },
  {
    title: "Sports Meet",
    date: "Jan 5, 2026",
    location: "Sports Complex",
    attendees: "200+",
    image: "https://images.unsplash.com/photo-1603816245457-91bedd0d84f3?auto=format&fit=crop&w=900&q=60",
  },
];

export default function EventSection() {
  return (
    <section id="events" className="py-16 px-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">Upcoming Events</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <div key={index} className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
            <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <div className="flex items-center text-gray-600 text-sm gap-2 mb-1">
                <Calendar className="w-4 h-4" /> {event.date}
              </div>
              <div className="flex items-center text-gray-600 text-sm gap-2 mb-1">
                <MapPin className="w-4 h-4" /> {event.location}
              </div>
              <div className="flex items-center text-gray-600 text-sm gap-2">
                <Users className="w-4 h-4" /> {event.attendees}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
