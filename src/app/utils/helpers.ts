import { format } from "date-fns";

export const formatDate = (dateString: string): string => {
  return format(new Date(dateString), "PPP");
};

export const formatDateTime = (dateString: string): string => {
  return format(new Date(dateString), "PPP p");
};
