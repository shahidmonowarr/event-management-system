import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { Event, EventFormData } from "../types/event";

interface EventStore {
  events: Event[];
  addEvent: (eventData: EventFormData, creatorId: string) => void;
  updateEvent: (id: string, eventData: EventFormData) => void;
  deleteEvent: (id: string) => void;
  rsvpToEvent: (id: string) => void;
  getUserEvents: (creatorId: string) => Event[];
  getEventById: (id: string) => Event | undefined;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

// Default events data
const defaultEvents: Event[] = [
  {
    id: uuidv4(),
    title: "Tech Conference 2025",
    description:
      "Annual technology conference featuring talks from industry leaders about the latest trends in software development, AI, and cloud computing.",
    date: "2025-06-15T09:00:00",
    location: "Convention Center, Hall A",
    category: "Conference",
    creatorId: "system",
    attendees: 42,
  },
  {
    id: uuidv4(),
    title: "React Workshop for Beginners",
    description:
      "Hands-on workshop to learn React fundamentals. Bring your laptop and we'll build a small application together.",
    date: "2025-05-20T14:00:00",
    location: "Tech Hub, Room 302",
    category: "Workshop",
    creatorId: "system",
    attendees: 18,
  },
  {
    id: uuidv4(),
    title: "Developer Meetup: AI & Machine Learning",
    description:
      "Casual networking event for developers interested in AI and machine learning technologies. Food and drinks provided.",
    date: "2025-05-25T18:30:00",
    location: "Downtown Coffee Shop",
    category: "Meetup",
    creatorId: "system",
    attendees: 25,
  },
  {
    id: uuidv4(),
    title: "Web Performance Optimization Seminar",
    description:
      "Learn techniques to improve your website loading times and overall performance from industry experts.",
    date: "2025-06-05T10:00:00",
    location: "Business Center, Suite 200",
    category: "Seminar",
    creatorId: "system",
    attendees: 15,
  },
];

// Create the store with persistence
export const useEventStore = create<EventStore>()(
  persist(
    (set, get) => ({
      events: [],
      hasHydrated: false,

      setHasHydrated: (state) => {
        set({ hasHydrated: state });
      },

      addEvent: (eventData: EventFormData, creatorId: string) => {
        const newEvent: Event = {
          id: uuidv4(),
          ...eventData,
          creatorId,
          attendees: 0,
        };

        set((state) => ({
          events: [newEvent, ...state.events],
        }));
      },

      updateEvent: (id: string, eventData: EventFormData) => {
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, ...eventData } : event
          ),
        }));
      },

      deleteEvent: (id: string) => {
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        }));
      },

      rsvpToEvent: (id: string) => {
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id
              ? { ...event, attendees: event.attendees + 1 }
              : event
          ),
        }));
      },

      getUserEvents: (creatorId: string) => {
        return get().events.filter((event) => event.creatorId === creatorId);
      },

      getEventById: (id: string) => {
        return get().events.find((event) => event.id === id);
      },
    }),
    {
      name: "event-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // If no events in storage, initialize with default events
          if (!state.events || state.events.length === 0) {
            state.events = defaultEvents;
          }
          state.setHasHydrated(true);
        }
      },
    }
  )
);
