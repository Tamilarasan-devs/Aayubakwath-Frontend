import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPublicCoupons } from "../../services/couponService";
import { Tag, Copy, CheckCheck, Clock, ShoppingBag, Zap } from "lucide-react";

function formatDiscount(coupon) {
  return coupon.discountType === "PERCENT"
    ? `${coupon.discountValue}% OFF`
    : `₹${Number(coupon.discountValue).toFixed(0)} OFF`;
}

function formatExpiry(expiresAt) {
  if (!expiresAt) return null;
  const d = new Date(expiresAt);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function CouponCard({ coupon }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const expiry = formatExpiry(coupon.expiresAt);
  const isPercentage = coupon.discountType === "PERCENT";

  return (
    <div className="relative border border-dashed border-[var(--color-sage)]/40 rounded-xl overflow-hidden bg-gradient-to-br from-[#f7fce8] to-white group hover:shadow-md transition-shadow duration-200">
      {/* Left accent bar */}
      <div className="absolute left-0 inset-y-0 w-1.5 bg-[var(--color-sage)] rounded-l-xl" />

      <div className="pl-6 pr-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Discount Badge */}
        <div className="shrink-0 w-20 h-20 rounded-xl bg-[var(--color-sage)] flex flex-col items-center justify-center text-white shadow-sm">
          {isPercentage ? (
            <>
              <span className="text-2xl font-extrabold leading-none">{coupon.discountValue}%</span>
              <span className="text-[10px] font-semibold tracking-wider uppercase mt-0.5">OFF</span>
            </>
          ) : (
            <>
              <span className="text-[11px] font-semibold">Flat</span>
              <span className="text-xl font-extrabold leading-none">₹{Number(coupon.discountValue).toFixed(0)}</span>
              <span className="text-[10px] font-semibold tracking-wider uppercase">OFF</span>
            </>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-bold text-[var(--color-text)] mb-0.5">
            {coupon.description || `Get ${formatDiscount(coupon)} on your order`}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[12px] text-gray-500">
            {coupon.minOrderAmount && (
              <span className="flex items-center gap-1">
                <ShoppingBag size={11} />
                Min. order ₹{Number(coupon.minOrderAmount).toFixed(0)}
              </span>
            )}
            {coupon.maxDiscountAmount && isPercentage && (
              <span className="flex items-center gap-1">
                <Zap size={11} />
                Upto ₹{Number(coupon.maxDiscountAmount).toFixed(0)}
              </span>
            )}
            {expiry && (
              <span className="flex items-center gap-1 text-orange-500">
                <Clock size={11} />
                Expires {expiry}
              </span>
            )}
          </div>
        </div>

        {/* Code + Copy */}
        <div className="shrink-0 flex flex-col items-center gap-2">
          <div className="border border-dashed border-[var(--color-sage)] rounded-lg px-4 py-2 bg-white text-[13px] font-bold tracking-widest text-[var(--color-sage-dark)] select-all">
            {coupon.code}
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-md transition-all
              ${copied
                ? "bg-green-100 text-green-700"
                : "bg-[var(--color-sage-light)]/40 text-[var(--color-sage-dark)] hover:bg-[var(--color-sage-light)]"
              }`}
          >
            {copied ? (
              <><CheckCheck size={12} /> Copied!</>
            ) : (
              <><Copy size={12} /> Copy Code</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProfileCoupons() {
  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["publicCoupons"],
    queryFn: getPublicCoupons,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 rounded-xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (coupons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--color-sage-light)]/40 flex items-center justify-center mb-4">
          <Tag size={28} className="text-[var(--color-sage)]" />
        </div>
        <h3 className="text-[16px] font-bold text-[var(--color-text)] mb-1">No Active Coupons</h3>
        <p className="text-[13px] text-gray-500 max-w-xs">
          There are no active coupon offers right now. Check back later for exciting deals!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[13px] text-gray-500 mb-1">
        {coupons.length} active offer{coupons.length !== 1 ? "s" : ""} available · Click any code to copy it
      </p>

      {coupons.map((coupon) => (
        <CouponCard key={coupon.id} coupon={coupon} />
      ))}
    </div>
  );
}
