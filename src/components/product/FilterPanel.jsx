import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500–₹1K", min: 500, max: 1000 },
  { label: "₹1K–₹2K", min: 1000, max: 2000 },
  { label: "₹2K+", min: 2000, max: Infinity },
];

const DISCOUNT_OPTIONS = [
  { label: "Any", min: 0 },
  { label: "10%+", min: 10 },
  { label: "20%+", min: 20 },
  { label: "30%+", min: 30 },
];

function FilterChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-3 py-1 font-body text-xs font-semibold tracking-wide rounded-full border transition-all duration-200
        ${
          active
            ? "bg-black text-white border-black"
            : "bg-white text-(--color-text-secondary) border-(--color-border) hover:border-black hover:text-black"
        }`}
    >
      {children}
    </button>
  );
}

export default function FilterPanel({
  showFilters,
  priceIdx,
  setPriceIdx,
  forWhom,
  setForWhom,
  discountMin,
  setDiscountMin,
  forWhomOptions,
  activeFiltersCount,
  onClearAll,
  computedCategories = [],
  category,
  setCategory,
}) {
  return (
    <AnimatePresence>
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className="bg-(--color-bg-soft) border border-(--color-border) rounded-xl p-3 sm:p-4 mt-3 space-y-4">
            {/* Categories */}
            {computedCategories.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-(--color-text-muted) mb-2">
                  Categories
                </p>
                <div className="flex flex-wrap gap-2">
                  {computedCategories.map((cat) => (
                    <FilterChip
                      key={cat.id}
                      active={category === cat.id}
                      onClick={() => setCategory(cat.id)}
                    >
                      {cat.name} <span className="ml-1 opacity-50 text-[10px]">({cat.count})</span>
                    </FilterChip>
                  ))}
                </div>
              </div>
            )}
            {/* Price Range */}
            <div>
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-(--color-text-muted) mb-2">
                Price Range
              </p>
              <div className="flex flex-wrap gap-2">
                {PRICE_RANGES.map((r, i) => (
                  <FilterChip
                    key={r.label}
                    active={priceIdx === i}
                    onClick={() => setPriceIdx(i)}
                  >
                    {r.label}
                  </FilterChip>
                ))}
              </div>
            </div>

            {/* For Whom */}
            {forWhomOptions.length > 1 && (
              <div>
                <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-(--color-text-muted) mb-2">
                  For Whom
                </p>
                <div className="flex flex-wrap gap-2">
                  {forWhomOptions.map((fw) => (
                    <FilterChip
                      key={fw}
                      active={forWhom === fw}
                      onClick={() => setForWhom(fw)}
                    >
                      {fw}
                    </FilterChip>
                  ))}
                </div>
              </div>
            )}

            {/* Discount */}
            <div>
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-(--color-text-muted) mb-2">
                Min Discount
              </p>
              <div className="flex flex-wrap gap-2">
                {DISCOUNT_OPTIONS.map((d) => (
                  <FilterChip
                    key={d.label}
                    active={discountMin === d.min}
                    onClick={() => setDiscountMin(d.min)}
                  >
                    {d.label}
                  </FilterChip>
                ))}
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <button
                onClick={onClearAll}
                className="flex items-center gap-1.5 text-xs font-semibold text-(--color-terracotta) hover:underline pt-1"
              >
                <X size={12} /> Clear all filters
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
