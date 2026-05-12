import React from "react";
import SmallCard from "./SmallCard";
import FeaturedCard from "./FeaturedCard";

const DESKTOP_GRID_STYLE = {
  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.35fr) minmax(0, 1fr)",
  gridTemplateRows: "minmax(240px, auto) minmax(240px, auto)",
};

const DESKTOP_SLOTS = [
  { key: "top-left", productIndex: 0, gridColumn: 1, gridRow: 1, delay: 0.1 },
  { key: "bottom-left", productIndex: 1, gridColumn: 1, gridRow: 2, delay: 0.2 },
  { key: "featured", productIndex: 2, gridColumn: 2, gridRow: "1 / 3", featured: true },
  { key: "top-right", productIndex: 3, gridColumn: 3, gridRow: 1, delay: 0.1 },
  { key: "bottom-right", productIndex: 4, gridColumn: 3, gridRow: 2, delay: 0.2 },
];

function DesktopSlot({ slot, products, isLoading, navigate }) {
  const product = slot.featured
    ? products[slot.productIndex] ?? products[0]
    : products[slot.productIndex];

  return (
    <div className="min-w-0" style={{ gridColumn: slot.gridColumn, gridRow: slot.gridRow }}>
      {isLoading ? (
        slot.featured ? (
          <div className="bg-white rounded-2xl animate-pulse h-full border border-[var(--color-border)] flex flex-col">
            <div className="flex-1 bg-[var(--color-bg-soft)] rounded-t-2xl" />
            <div className="p-6 space-y-3">
              <div className="h-5 bg-[var(--color-bg-muted)] rounded w-2/3" />
              <div className="h-4 bg-[var(--color-bg-muted)] rounded w-1/3" />
              <div className="h-10 bg-[var(--color-bg-muted)] rounded-xl w-28 mt-2" />
            </div>
          </div>
        ) : (
          <div className="bg-[var(--color-bg-soft)] rounded-2xl animate-pulse h-full border border-[var(--color-border)]">
            <div className="h-3/5 bg-[var(--color-bg-muted)] rounded-t-2xl" />
            <div className="p-4 space-y-2">
              <div className="h-3 bg-[var(--color-bg-muted)] rounded w-3/4" />
              <div className="h-2 bg-[var(--color-bg-muted)] rounded w-1/2" />
            </div>
          </div>
        )
      ) : product ? (
        slot.featured ? (
          <FeaturedCard product={product} navigate={navigate} />
        ) : (
          <SmallCard product={product} navigate={navigate} />
        )
      ) : null}
    </div>
  );
}

export default function DesktopGrid({ products, isLoading, navigate }) {
  return (
    <div className="hidden lg:grid gap-4 items-stretch" style={DESKTOP_GRID_STYLE}>
      {DESKTOP_SLOTS.map((slot) => (
        <DesktopSlot
          key={slot.key}
          slot={slot}
          products={products}
          isLoading={isLoading}
          navigate={navigate}
        />
      ))}
    </div>
  );
}
