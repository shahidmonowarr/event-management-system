"use client";

import { useState, useEffect } from "react";
import { useEventStore } from "./store/eventStore";
import { Event } from "./types/event";
import { CATEGORIES } from "./utils/constants";
import EventCard from "./conponents/EventCard";

export default function Home() {
  const events = useEventStore((state) => state.events);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const rsvpToEvent = useEventStore((state) => state.rsvpToEvent);

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  useEffect(() => {
    let result = events;

    // Filter by search term
    if (searchTerm) {
      result = result.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter((event) => event.category === selectedCategory);
    }

    setFilteredEvents(result);
  }, [events, searchTerm, selectedCategory]);

  const handleRSVP = (id: string) => {
    rsvpToEvent(id);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Upcoming Events
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search events by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No events found. Try adjusting your search filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} onRSVP={handleRSVP} />
          ))}
        </div>
      )}
    </div>
  );
}
