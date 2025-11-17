// src/components/EventSection.jsx

import React from "react";
import EventCard from "./EventCard";
import dummyEvents from "../data/dummyEvents";

const EventSection = () => {
  return (
    <div className="py-10 px-4 md:px-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        All Events
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventSection;
