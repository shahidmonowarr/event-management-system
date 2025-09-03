import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Event, EventFormData } from "../types/event";

interface EventStore {
  events: Event[];
  addEvent: (eventData: EventFormData, creatorId: string) => void;
  updateEvent: (id: string, eventData: EventFormData) => void;
  deleteEvent: (id: string) => void;
  getUserEvents: (creatorId: string) => Event[];
  getEventById: (id: string) => Event | undefined;
  rsvpToEvent: (id: string) => void;
}

// Load events from localStorage
const loadEvents = (): Event[] => {
  if (typeof window === "undefined") return [];
  const storedEvents = localStorage.getItem("events");
  return storedEvents ? JSON.parse(storedEvents) : [];
};

// Save events to localStorage
const saveEvents = (events: Event[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("events", JSON.stringify(events));
  }
};

export const useEventStore = create<EventStore>((set, get) => ({
  events: loadEvents(),

  addEvent: (eventData: EventFormData, creatorId: string) => {
    const newEvent: Event = {
      id: uuidv4(),
      ...eventData,
      creatorId,
      attendees: 0,
    };

    set((state) => {
      const updatedEvents = [...state.events, newEvent];
      saveEvents(updatedEvents);
      return { events: updatedEvents };
    });
  },

  updateEvent: (id: string, eventData: EventFormData) => {
    set((state) => {
      const updatedEvents = state.events.map((event) =>
        event.id === id ? { ...event, ...eventData } : event
      );
      saveEvents(updatedEvents);
      return { events: updatedEvents };
    });
  },

  deleteEvent: (id: string) => {
    set((state) => {
      const updatedEvents = state.events.filter((event) => event.id !== id);
      saveEvents(updatedEvents);
      return { events: updatedEvents };
    });
  },

  getUserEvents: (creatorId: string) => {
    return get().events.filter((event) => event.creatorId === creatorId);
  },

  getEventById: (id: string) => {
    return get().events.find((event) => event.id === id);
  },

  rsvpToEvent: (id: string) => {
    set((state) => {
      const updatedEvents = state.events.map((event) =>
        event.id === id ? { ...event, attendees: event.attendees + 1 } : event
      );
      saveEvents(updatedEvents);
      return { events: updatedEvents };
    });
  },
}));
