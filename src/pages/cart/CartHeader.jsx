import React from "react";

export default function CartHeader({ totalItems }) {
  return (
    <div className="border-b border-[var(--color-border)] bg-white">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-8">
        <div className="flex items-center gap-4 mb-1">
          <div className="w-8 h-px bg-[var(--color-sage)]" />
          <p className="label" style={{ fontSize: "0.6rem" }}>
            Shopping
          </p>
        </div>
        <div className="flex items-baseline gap-4">
          <h1
            className="display-heading text-[var(--color-text)]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Your Cart
          </h1>
          {totalItems > 0 && (
            <span className="font-body text-sm text-[var(--color-text-muted)]">
              {totalItems} item{totalItems !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
