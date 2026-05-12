import React from "react";
import { ArrowRight } from "lucide-react";

export default function SectionHeader({ onViewAll }) {
  return (
    <>
      <div className="flex items-center justify-center gap-4 py-2">
        <div className="w-8 h-px bg-[var(--color-sage)]" />
        <p
          className="label whitespace-nowrap"
          style={{ fontSize: "clamp(1.25rem, 4vw, 2rem)", fontWeight: "500" }}
        >
          Top Picks
        </p>
        <div className="w-8 h-px bg-[var(--color-sage)]" />
      </div>

      <div className="flex items-end justify-between mb-4 px-0 sm:px-0">
        <h2
          className="display-heading text-[var(--color-text)]"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
        >
          Best Sellers
        </h2>

        <button
          onClick={onViewAll}
          className="hidden sm:flex items-center gap-1.5 text-sm font-semibold
            text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
        >
          View all <ArrowRight size={14} />
        </button>
      </div>
    </>
  );
}
