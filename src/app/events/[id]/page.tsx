"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEventStore } from "@/app/store/eventStore";
import { Event } from "@/app/types/event";
import { formatDateTime } from "@/app/utils/helpers";

export default function EventDetails() {
  const params = useParams();
  const eventId = params.id as string;
  const getEventById = useEventStore((state) => state.getEventById);
  const [event, setEvent] = useState<Event | null>(null);
  const rsvpToEvent = useEventStore((state) => state.rsvpToEvent);
  // Subscribe to store updates to get the latest event data
  const events = useEventStore((state) => state.events);

  useEffect(() => {
    if (eventId) {
      const foundEvent = getEventById(eventId);
      setEvent(foundEvent || null);
    }
  }, [eventId, getEventById, events]);

  if (!event) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Event not found.</p>
        <Link
          href="/"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          Back to events
        </Link>
      </div>
    );
  }

  const handleRSVP = () => {
    rsvpToEvent(event.id);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Link
        href="/"
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        &larr; Back to events
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
              {event.category}
            </span>
          </div>

          <p className="text-gray-600 mb-8">{event.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center text-gray-700">
              <svg
                className="w-6 h-6 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div>
                <p className="font-medium">Date & Time</p>
                <p>{formatDateTime(event.date)}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-700">
              <svg
                className="w-6 h-6 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>
                <p className="font-medium">Location</p>
                <p>{event.location}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-700">
              <svg
                className="w-6 h-6 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <div>
                <p className="font-medium">Attendees</p>
                <p>{event.attendees} people attending</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handleRSVP}
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              RSVP to this event
            </button>

            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Browse all events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
