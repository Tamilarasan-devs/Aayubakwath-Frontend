import React, { useState, useEffect } from "react";
import { applyCoupon } from "../../services/couponService";
import { toast } from "react-toastify";
import { Tag, X, CheckCircle2, Loader2 } from "lucide-react";

export default function OrderSummary({ cartItems, subtotal, shipping, onPlaceOrder, isPending }) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedCode = localStorage.getItem("applied_coupon_code");
    if (!savedCode) return;

    const code = savedCode.trim().toUpperCase();
    if (!code) return;

    let cancelled = false;
    setIsLoading(true);

    (async () => {
      try {
        const result = await applyCoupon(code);
        if (cancelled) return;
        setAppliedCoupon(result);
      } catch {
        if (cancelled) return;
        localStorage.removeItem("applied_coupon_code");
        setAppliedCoupon(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleApplyCoupon = async (codeToApply = couponCode) => {
    const code = (codeToApply || "").trim().toUpperCase();
    if (!code) return;

    setIsLoading(true);
    try {
      const result = await applyCoupon(code);
      setAppliedCoupon(result);
      localStorage.setItem("applied_coupon_code", code);
      if (codeToApply === couponCode) {
        toast.success(`Coupon "${code}" applied!`);
        setCouponCode("");
      }
    } catch (error) {
      localStorage.removeItem("applied_coupon_code");
      setAppliedCoupon(null);
      if (codeToApply === couponCode) {
        toast.error(error.response?.data?.message || "Invalid coupon code");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    localStorage.removeItem("applied_coupon_code");
    toast.info("Coupon removed");
  };

  const discountAmount = appliedCoupon?.discountAmount || 0;
  const finalTotal = subtotal + shipping - discountAmount;

  return (
    <div className="bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-[var(--radius-lg)] overflow-hidden lg:sticky lg:top-24">
      <div className="bg-[var(--color-text)] px-6 py-5 rounded-t-[var(--radius-lg)]">
        <h2
          className="display-heading text-white"
          style={{ fontSize: "1.4rem" }}
        >
          Order Summary
        </h2>
      </div>

      <div className="px-6 pt-5 pb-3 max-h-64 overflow-y-auto space-y-4 border-b border-[var(--color-border)]">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4 items-center">
            <div className="w-14 h-14 shrink-0 bg-white rounded-[var(--radius-md)] flex items-center justify-center overflow-hidden border border-[var(--color-border)]">
              <img
                src={
                  item.product?.productImages?.[0]?.url ||
                  item.product?.image
                }
                alt={item.product?.productName}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body font-medium text-[var(--color-text)] text-sm line-clamp-1">
                {item.product?.productName}
              </p>
              <p className="font-body text-[12px] text-[var(--color-text-muted)] mt-0.5">
                Qty: {item.quantity}
              </p>
            </div>
            <p className="font-body font-semibold text-[var(--color-text)] text-sm shrink-0">
              ₹
              {(
                item.quantity *
                parseFloat(
                  item.product?.finalPrice || item.product?.price || 0,
                )
              ).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Coupon Section */}
      <div className="px-6 py-5 border-b border-[var(--color-border)]">
        {appliedCoupon ? (
          <div className="flex items-center justify-between bg-[var(--color-sage-light)]/20 border border-[var(--color-sage)]/30 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[var(--color-sage)]" />
              <div>
                <p className="text-sm font-bold text-[var(--color-text)] leading-none uppercase">
                  {appliedCoupon.couponCode}
                </p>
                <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                  Coupon applied successfully
                </p>
              </div>
            </div>
            <button 
              onClick={handleRemoveCoupon}
              className="p-1 hover:bg-white/50 rounded-full text-[var(--color-text-muted)] hover:text-red-500 transition-all"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
              Have a coupon?
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-placeholder)]" />
                <input
                  type="text"
                  placeholder="Enter Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[var(--color-border)] rounded-lg text-sm font-body outline-none focus:border-[var(--color-accent)] transition-all"
                />
              </div>
              <button
                onClick={() => handleApplyCoupon()}
                disabled={isLoading || !couponCode.trim()}
                className="bg-[var(--color-text)] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-black transition-all disabled:opacity-50"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Apply"}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-5 space-y-2.5">
        <div className="flex justify-between font-body text-sm">
          <span className="text-[var(--color-text-secondary)]">Subtotal</span>
          <span className="font-medium text-[var(--color-text)]">
            ₹{subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between font-body text-sm">
          <span className="text-[var(--color-text-secondary)]">Shipping</span>
          <span
            className={`font-semibold ${shipping === 0 ? "text-[var(--color-sage)]" : "text-[var(--color-text)]"}`}
          >
            {shipping === 0 ? "Free" : `₹${shipping}`}
          </span>
        </div>
        
        {appliedCoupon && (
          <div className="flex justify-between font-body text-sm text-[var(--color-sage)]">
            <span className="font-medium italic">Discount ({appliedCoupon.couponCode})</span>
            <span className="font-bold">
              - ₹{discountAmount.toFixed(2)}
            </span>
          </div>
        )}

        <div className="flex justify-between pt-3 mt-1 border-t border-[var(--color-border)]">
          <span
            className="display-heading text-[var(--color-text)]"
            style={{ fontSize: "1.1rem" }}
          >
            Total
          </span>
          <span
            className="display-heading text-[var(--color-text)]"
            style={{ fontSize: "1.5rem" }}
          >
            ₹{finalTotal.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="px-6 pb-6">
        <button
          onClick={onPlaceOrder}
          disabled={isPending}
          className="btn-sage w-full py-4 text-[13px]"
        >
          {isPending
            ? "Processing..."
            : "Place Order (Cash on Delivery)"}
        </button>
      </div>
    </div>
  );
}
