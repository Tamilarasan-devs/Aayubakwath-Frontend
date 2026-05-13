import React from "react";
import promoBg from "../../../assets/images/luxury_promo_bg.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getPublicCoupons } from "../../../services/couponService";

export default function FirstBanner() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const { data: coupons = [] } = useQuery({
    queryKey: ["publicCoupons"],
    queryFn: getPublicCoupons,
    staleTime: 5 * 60 * 1000,
  });

  // Pick first active coupon; fall back to a placeholder while loading
  const activeCoupon = coupons[0] || null;
  const couponCode = activeCoupon?.code ?? "—";

  const discountLabel =
    activeCoupon?.discountType === "PERCENT"
      ? `Save ${activeCoupon.discountValue}% On Your First Order`
      : activeCoupon?.discountValue
      ? `Save ₹${Number(activeCoupon.discountValue).toFixed(0)} On Your First Order`
      : "Save On Your First Order";

  const handleClaimOffer = (e) => {
    e.stopPropagation();

    // If not logged in → go to login, then redirect back to profile coupons
    if (!isAuthenticated) {
      navigate(`/login?redirect=${encodeURIComponent("/profile?tab=Coupons")}`);
      return;
    }

    // Navigate to profile with Coupons tab pre-selected via router state
    navigate("/profile", { state: { tab: "Coupons" } });
  };

  return (
    <div
      className="w-full overflow-hidden relative bg-white group cursor-pointer"
      onClick={() => navigate("/productListing")}
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={promoBg}
          alt="Promo Background"
          className="w-full h-full object-cover opacity-80 scale-105 transition-transform duration-700 group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 to-transparent mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-20 py-7 sm:py-10 md:py-16 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-5 md:gap-8 bg-gradient-to-r from-white/50 to-transparent">
        <div>
          <h2 className="text-3xl md:text-[42px] font-display font-medium tracking-tight text-[var(--color-text)] mb-2 leading-tight">
            Welcome to Aayubakwath
          </h2>
          <p className="text-lg text-[var(--color-text)] font-semibold uppercase tracking-[0.12em] mb-3 font-body">
            {discountLabel}
          </p>
          <p className="text-[var(--color-text-secondary)] font-medium text-[15px] font-body">
            Use code{" "}
            <span className="font-semibold text-white bg-black px-2 py-0.5 rounded-sm mx-1 shadow-sm border border-[var(--color-border)] tracking-[0.06em]">
              {couponCode}
            </span>{" "}
            at checkout to claim your wellness gift.
          </p>
        </div>

        <button
          type="button"
          onClick={handleClaimOffer}
          className="btn-solid flex-shrink-0 px-8 py-4 text-[12px] tracking-[0.1em] uppercase shadow-[var(--shadow-lg)]
            group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-xl)] transition-all duration-300"
        >
          Claim Offer
        </button>
      </div>
    </div>
  );
}
