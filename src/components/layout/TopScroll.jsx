import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAnnouncements } from "../../services/announcementService";

export default function TopScroll() {
  const [index, setIndex] = useState(0);

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: getAnnouncements,
  });

  // Automatic sliding
  useEffect(() => {
    if (announcements.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [announcements]);

  const nextSlide = () => setIndex((prev) => (prev + 1) % announcements.length);

  const prevSlide = () =>
    setIndex(
      (prev) => (prev - 1 + announcements.length) % announcements.length,
    );

  // Don't reserve space while loading — avoids layout shift
  if (isLoading || announcements.length === 0) return null;

  return (
    <div className="bg-[#111827] text-white py-2.5 flex justify-center border-b border-gray-800">
      <div className="flex items-center w-full max-w-3xl justify-between px-4">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="text-[10px] text-gray-500 hover:text-white transition-colors"
          aria-label="Previous announcement"
        >
          ❮
        </button>

        {/* Message */}
        <div className="flex-1 text-center px-4">
          <h2 className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-300">
            {announcements[index]?.title}
          </h2>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="text-[10px] text-gray-500 hover:text-white transition-colors"
          aria-label="Next announcement"
        >
          ❯
        </button>
      </div>
    </div>
  );
}
