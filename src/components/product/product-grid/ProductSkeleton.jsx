import React from "react";

export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white overflow-hidden border border-(--color-border) animate-pulse rounded-[var(--radius-lg)]"
        >
          <div
            className="w-full bg-(--color-bg-soft)"
            style={{ paddingBottom: "133.33%" }}
          />
          <div className="p-2 sm:p-4 space-y-2 sm:space-y-3">
            <div className="h-3 sm:h-4 bg-(--color-bg-muted) w-3/4 rounded" />
            <div className="h-2 sm:h-3 bg-(--color-bg-muted) w-full rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
