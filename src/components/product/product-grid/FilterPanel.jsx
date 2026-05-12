import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Chip from "./Chip";

const PRICE_RANGES = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500–₹1K", min: 500, max: 1000 },
  { label: "₹1K–₹2K", min: 1000, max: 2000 },
  { label: "₹2K+", min: 2000, max: Infinity },
];

export default function FilterPanel({
  showFilters,
  priceIdx,
  setPriceIdx,
  activeFiltersCount,
  onClearAll,
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
          <div className="bg-(--color-bg-soft) border border-(--color-border) rounded-xl p-3 sm:p-4 mb-4 space-y-3">
            {/* Category */}
            {/* <div>
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-(--color-text-muted) mb-2">
                Category
              </p>
              <div className="flex flex-wrap gap-2">
                <Chip active={category === "all"} onClick={() => setCategory("all")}>
                  All
                </Chip>
                {categories
                  .filter((c) => c.name?.trim())
                  .map((c) => (
                    <Chip
                      key={c.id}
                      active={category === c.id}
                      onClick={() => setCategory(c.id)}
                    >
                      {c.name}
                    </Chip>
                  ))}
              </div>
            </div> */}

            {/* Price Range */}
            <div>
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-(--color-text-muted) mb-2">
                Price Range
              </p>
              <div className="flex flex-wrap gap-2">
                {PRICE_RANGES.map((r, i) => (
                  <Chip
                    key={r.label}
                    active={priceIdx === i}
                    onClick={() => setPriceIdx(i)}
                  >
                    {r.label}
                  </Chip>
                ))}
              </div>
            </div>

            {/* For Whom */}
            {/* {forWhomOptions.length > 1 && (
              <div>
                <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-(--color-text-muted) mb-2">
                  For Whom
                </p>
                <div className="flex flex-wrap gap-2">
                  {forWhomOptions.map((fw) => (
                    <Chip
                      key={fw}
                      active={forWhom === fw}
                      onClick={() => setForWhom(fw)}
                    >
                      {fw}
                    </Chip>
                  ))}
                </div>
              </div>
            )} */}

            {/* Discount */}
            {/* <div>
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-(--color-text-muted) mb-2">
                Min Discount
              </p>
              <div className="flex flex-wrap gap-2">
                {DISCOUNT_OPTIONS.map((d) => (
                  <Chip
                    key={d.label}
                    active={discountMin === d.min}
                    onClick={() => setDiscountMin(d.min)}
                  >
                    {d.label}
                  </Chip>
                ))}
              </div>
            </div> */}

            {/* Clear */}
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
