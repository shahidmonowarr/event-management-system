"use client";

import { useRouter } from "next/navigation";
import { useEventStore } from "../store/eventStore";
import { EventFormData } from "../types/event";
import EventForm from "../conponents/EventForm";

export default function CreateEvent() {
  const router = useRouter();
  const addEvent = useEventStore((state) => state.addEvent);

  const creatorId = "user-123";

  const handleSubmit = (formData: EventFormData) => {
    addEvent(formData, creatorId);
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Create New Event
      </h1>
      <EventForm onSubmit={handleSubmit} />
    </div>
  );
}
