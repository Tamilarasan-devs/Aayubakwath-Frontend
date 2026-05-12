import React from "react";
import {
  Shield,
  RefreshCw,
  BadgeCheck,
  MessageCircle,
} from "lucide-react";

export default function CartSummary({
  mrpTotal,
  savings,
  discount,
  delivery,
  total,
  totalItems,
  appliedCoupon,
  onRemoveCoupon,
  onCheckout,
}) {
  return (
    <div className="w-full lg:w-80 xl:w-96 shrink-0 lg:sticky lg:top-24">
      <div className="bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-[var(--radius-lg)] overflow-hidden">
        <div className="px-6 py-5 bg-[var(--color-text)] rounded-t-[var(--radius-lg)]">
          <h2
            className="display-heading text-white"
            style={{ fontSize: "1.4rem" }}
          >
            Summary
          </h2>
          <p className="font-body text-[11px] tracking-[0.08em] text-white/40 mt-1">
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="px-6 py-5 space-y-3">
          <div className="flex justify-between font-body text-sm">
            <span className="text-[var(--color-text-secondary)]">MRP Total</span>
            <span className="font-medium text-[var(--color-text)]">
              ₹{mrpTotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between font-body text-sm">
            <span className="text-[var(--color-text-secondary)]">
              Product Discount
            </span>
            <span className="font-semibold text-[var(--color-sage)]">
              − ₹{savings.toLocaleString()}
            </span>
          </div>
          {appliedCoupon && (
            <div className="flex justify-between font-body text-sm">
              <span className="text-[var(--color-text-secondary)] flex items-center gap-1.5">
                Coupon ({appliedCoupon.code})
                <button
                  onClick={onRemoveCoupon}
                  className="text-[var(--color-terracotta)] hover:opacity-70 transition-opacity text-xs leading-none"
                >
                  ✕
                </button>
              </span>
              <span className="font-semibold text-[var(--color-sage)]">
                − ₹{discount.toLocaleString()}
              </span>
            </div>
          )}
          <div className="flex justify-between font-body text-sm">
            <span className="text-[var(--color-text-secondary)]">Delivery</span>
            <span
              className={`font-semibold ${delivery === 0 ? "text-[var(--color-sage)]" : "text-[var(--color-text)]"}`}
            >
              {delivery === 0 ? "FREE" : `₹${delivery}`}
            </span>
          </div>

          <div className="border-t border-[var(--color-border)] pt-4 mt-1">
            <div className="flex justify-between items-baseline">
              <span
                className="display-heading text-[var(--color-text)]"
                style={{ fontSize: "1.1rem" }}
              >
                Total
              </span>
              <span
                className="display-heading text-[var(--color-text)]"
                style={{ fontSize: "1.6rem" }}
              >
                ₹{total.toLocaleString()}
              </span>
            </div>
            {savings + discount > 0 && (
              <p className="font-body text-[12px] text-[var(--color-sage)] font-medium mt-1 text-right">
                You save ₹{(savings + discount).toLocaleString()} on this order
              </p>
            )}
          </div>

          <button
            onClick={onCheckout}
            className="btn-sage w-full py-4 mt-1 text-[12px]"
          >
            Proceed to Checkout
          </button>

          <div className="grid grid-cols-3 gap-2 pt-1">
            {[
              { icon: <Shield size={13} />, label: "Secure Payment" },
              { icon: <RefreshCw size={13} />, label: "Easy Returns" },
              { icon: <BadgeCheck size={13} />, label: "100% Genuine" },
            ].map((b) => (
              <div
                key={b.label}
                className="flex flex-col items-center text-center bg-white py-3 px-1 gap-1.5 rounded-lg border border-[var(--color-border)]"
              >
                <span className="text-[var(--color-text-muted)]">{b.icon}</span>
                <span className="font-body text-[9px] font-medium text-[var(--color-text-secondary)] leading-tight tracking-[0.02em]">
                  {b.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 pt-1 flex-wrap">
            {["VISA", "MC", "UPI", "EMI"].map((p) => (
              <div
                key={p}
                className="px-2.5 py-1 border border-[var(--color-border)] bg-white rounded-sm font-body text-[10px]
                  font-semibold text-[var(--color-text-muted)] tracking-wider"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 bg-[var(--color-bg-soft)] border border-[var(--color-border)] p-4 flex items-center gap-3 rounded-[var(--radius-lg)]">
        <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shrink-0 border border-[var(--color-border)]">
          <MessageCircle
            size={15}
            className="text-[var(--color-text-muted)]"
          />
        </div>
        <div>
          <p className="font-body text-sm font-semibold text-[var(--color-text)]">
            Need help?
          </p>
          <p className="font-body text-[12px] text-[var(--color-text-secondary)]">
            Chat with us or call{" "}
            <span className="font-semibold text-[var(--color-text)]">
              1800-000-1234
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
