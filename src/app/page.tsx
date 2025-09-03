"use client";

import { useEventStore } from "./store/eventStore";

export default function Home() {
  const events = useEventStore((state) => state.events);
  console.log(events);
  return (
    <>
      <h1 className="text-4xl font-bold text-center">
        Event Management System
      </h1>
    </>
  );
}
