"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useEventStore } from "@/app/store/eventStore";
import { Event, EventFormData } from "@/app/types/event";
import EventForm from "@/app/conponents/EventForm";

export default function EditEvent() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;
  const getEventById = useEventStore((state) => state.getEventById);
  const updateEvent = useEventStore((state) => state.updateEvent);
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (eventId) {
      const foundEvent = getEventById(eventId);
      setEvent(foundEvent || null);
    }
  }, [eventId, getEventById]);

  const handleSubmit = (formData: EventFormData) => {
    if (event) {
      updateEvent(event.id, formData);
      router.push("/my-events");
    }
  };

  if (!event) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Event not found.</p>
      </div>
    );
  }

  // Convert Event to EventFormData
  const initialData: EventFormData = {
    title: event.title,
    description: event.description,
    date: event.date,
    location: event.location,
    category: event.category,
  };

  return (
    <div className="max-w-2xl mx-auto">
      <EventForm
        onSubmit={handleSubmit}
        initialData={initialData}
        isEditing={true}
      />
    </div>
  );
}
