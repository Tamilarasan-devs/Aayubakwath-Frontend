import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DEFAULT_MESSAGES = [
  "0% harmful chemicals",
  "GMP & ISO certified facility",
  "Purity tested herbal ingredients",
  "Trusted by 1 million+ customers",
];

export default function AnnouncementBar({ announcements }) {
  const items = useMemo(() => {
    const messages = (announcements || [])
      .map((item) => item?.title?.trim())
      .filter(Boolean);

    return messages.length >= 2
      ? messages
      : [...new Set([...messages, ...DEFAULT_MESSAGES])];
  }, [announcements]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Reset when items count changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveIndex(0);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 2800);

    return () => window.clearInterval(intervalId);
  }, [items.length]);

  return (
    <div className="relative z-50 overflow-hidden border-b border-black/5 bg-[var(--color-sage)] text-white">
      <div className="mx-auto max-w-[1560px] px-3 py-1 sm:px-8 lg:px-10">
        <div className="flex min-h-7 items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={`${items[activeIndex]}-${activeIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="block w-full px-2 text-center text-[11px] sm:text-[13px] font-medium uppercase tracking-[0.18em] leading-snug text-white/95"
            >
              {items[activeIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
