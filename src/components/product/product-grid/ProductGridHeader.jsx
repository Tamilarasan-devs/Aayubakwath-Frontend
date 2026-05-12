import React from "react";
import { SlidersHorizontal } from "lucide-react";

export default function ProductGridHeader({
  sortBy,
  setSortBy,
  showFilters,
  setShowFilters,
  activeFiltersCount,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
      <div className="min-w-0">
        <h2
          className="display-heading text-(--color-text)"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
        >
          Fuel Your Day, Naturally
        </h2>
      </div>
      <div className="flex w-full sm:w-auto items-center gap-2 pt-1 sm:shrink-0">
        <button
          onClick={() => setShowFilters((v) => !v)}
          className={`flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 rounded-lg border text-xs font-semibold tracking-wide transition-all
            ${
              showFilters || activeFiltersCount > 0
                ? "bg-black text-white border-black"
                : "bg-white text-(--color-text-secondary) border-(--color-border) hover:border-black hover:text-black"
            }`}
        >
          <SlidersHorizontal size={13} />
          Filters
          {activeFiltersCount > 0 && (
            <span className="bg-white/25 text-white px-1.5 py-0.5 rounded-full text-[10px] font-semibold leading-none">
              {activeFiltersCount}
            </span>
          )}
        </button>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="min-w-0 flex-1 sm:flex-none font-body text-xs font-semibold border border-(--color-border) bg-white
            px-3 py-2 outline-none text-(--color-text) cursor-pointer hover:border-black transition-colors rounded-lg"
        >
          <option value="default">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="discount">Best Discount</option>
        </select>

      </div>
    </div>
  );
}
