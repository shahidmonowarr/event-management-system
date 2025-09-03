export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  creatorId: string;
  attendees: number;
}

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
}
