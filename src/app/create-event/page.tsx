"use client";

import { useRouter } from "next/navigation";
import { useEventStore } from "../store/eventStore";
import { EventFormData } from "../types/event";
import EventForm from "../conponents/EventForm";
import { creatorId } from "../utils/constants";

export default function CreateEvent() {
  const router = useRouter();
  const addEvent = useEventStore((state) => state.addEvent);

  const handleSubmit = (formData: EventFormData) => {
    addEvent(formData, creatorId);
    router.push("/my-events");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <EventForm onSubmit={handleSubmit} />
    </div>
  );
}
