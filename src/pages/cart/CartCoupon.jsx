import React from "react";

export default function CartCoupon({
  coupon,
  setCoupon,
  onApply,
  isPending,
  error,
  success,
}) {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-px bg-[var(--color-sage)]" />
        <p className="label" style={{ fontSize: "0.6rem" }}>
          Have a Coupon?
        </p>
      </div>
      <div className="flex gap-2">
        <input
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onApply()}
          placeholder="Enter coupon code"
          className="flex-1 h-11 px-4 border border-[var(--color-border)] rounded-lg
            font-body text-sm text-[var(--color-text)] bg-white outline-none
            focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all placeholder:text-[var(--color-text-placeholder)]"
        />
        <button
          onClick={onApply}
          className="btn-primary h-11 px-6 text-[11px]"
        >
          {isPending ? "Applying..." : "Apply"}
        </button>
      </div>
      {error && (
        <p className="font-body text-[12px] text-[var(--color-terracotta)] mt-2">
          {error}
        </p>
      )}
      {success && (
        <p className="font-body text-[12px] text-[var(--color-sage)] mt-2">
          {success}
        </p>
      )}
    </div>
  );
}
