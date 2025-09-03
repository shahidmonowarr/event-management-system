"use client";

import Link from "next/link";
import { useEventStore } from "../store/eventStore";
import EventCard from "../conponents/EventCard";
import { creatorId } from "../utils/constants";

export default function MyEvents() {
  const getUserEvents = useEventStore((state) => state.getUserEvents);
  const deleteEvent = useEventStore((state) => state.deleteEvent);

  const userEvents = getUserEvents(creatorId);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      deleteEvent(id);
      window.location.reload();
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Events</h1>
        <Link
          href="/create-event"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Create New Event
        </Link>
      </div>

      {userEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">
            You haven't created any events yet.
          </p>
          <Link
            href="/create-event"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-block"
          >
            Create your first event
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {userEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              showActions={true}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
