"use client";

import { useEffect, useState } from "react";
import { useEventStore } from "../store/eventStore";

export default function HydrationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHydrated, setIsHydrated] = useState(false);
  const hasHydrated = useEventStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!isHydrated && hasHydrated) {
      setIsHydrated(true);
    }
  }, [isHydrated, hasHydrated]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
