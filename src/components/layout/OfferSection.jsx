import React from "react";
import { Award, Leaf, MapPin, ShieldCheck, TrendingUp, Users } from "lucide-react";

export default function OffersSection() {
  const qualityPillars = [
    { icon: Leaf, label: "Traditional Herbal Composition" },
    { icon: ShieldCheck, label: "Scientifically Tested Blend" },
    { icon: ShieldCheck, label: "No Synthetic Harsh Ingredients" },
    { icon: Award, label: "FSSAI Approved Standards" },
    { icon: Leaf, label: "Pure Vegan Wellness Capsules Standards" },
  ];

  const partnershipStats = [
    { icon: Users, val: "50+", label: "Active Dealers" },
    { icon: MapPin, val: "28", label: "States Covered" },
    { icon: Award, val: "99%", label: "Satisfaction Rate" },
    { icon: TrendingUp, val: "₹50lakh+", label: "Partner Revenue" },
  ];

  const offers = [
    {
      title: "20% Off Your First Order",
      description: "Sign up and enjoy 20% off your first purchase!",
      cta: "Claim Now",
      bg: "bg-[#f3f6f2]", // light subtle green
      btn: "#03349a", // deep red accent
    },
    {
      title: "Buy 3 Get 1 Free",
      description: "Select products are available in this amazing deal.",
      cta: "Shop Now",
      bg: "bg-[#e8f0d8]", // soft olive-green
      btn: "#829b1c", // olive accent
    },
    {
      title: "Free Shipping Over $50",
      description: "Get your order delivered for free when you spend $50+.",
      cta: "Learn More",
      bg: "bg-[#f9ede6]", // light beige
      btn: "#c9643a", // orange accent
    },
  ];

  return (
    <section className="bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Quality strip */}
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm">
          <div className="h-2 bg-[var(--color-sage)]" />
          <div className="grid grid-cols-2 divide-x divide-y divide-[var(--color-border)] md:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
            {qualityPillars.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="group flex min-h-[92px] items-center justify-center gap-3 px-4 py-6 text-center transition-all duration-500 hover:bg-[var(--color-sage-light)]/40"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-sage-light)] text-[var(--color-sage)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-[var(--color-sage)] group-hover:text-white">
                    <Icon size={18} />
                  </div>
                  <span className="text-sm font-semibold text-[var(--color-text-muted)] transition-colors duration-500 group-hover:text-[var(--color-sage)]">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Partnership stats card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm lg:p-12">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
            {partnershipStats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="group text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-sage-light)] text-[var(--color-sage)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-[var(--color-sage)] group-hover:text-white">
                    <Icon size={24} />
                  </div>
                  <p className="mb-1 font-display text-3xl font-black text-[#111827] transition-colors group-hover:text-[var(--color-sage)] lg:text-4xl">
                    {s.val}
                  </p>
                  <p className="text-[13px] font-semibold uppercase tracking-widest text-gray-500">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center mb-6 mt-10">
        <h2 className="text-3xl md:text-4xl font-semibold mb-2 bg-gradient-to-r from-[#1a0a0a] via-[#03349a] to-[#c9643a] bg-clip-text text-transparent">
          Special Offers & Discounts
        </h2>
        <div className="w-24 h-1 bg-[#c9643a] mx-auto rounded-full mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Don’t miss out on our limited-time deals and exclusive promotions!
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((offer, index) => (
          <div
            key={index}
            className={`${offer.bg} rounded-2xl shadow-lg p-8 flex flex-col justify-between transform transition hover:scale-105 duration-300`}
          >
            <div>
              <h3 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-[#1a0a0a] via-[#03349a] to-[#c9643a] bg-clip-text text-transparent">
                {offer.title}
              </h3>
              <p className="text-gray-700 text-sm md:text-base opacity-90">
                {offer.description}
              </p>
            </div>
            <button
              style={{ backgroundColor: offer.btn }}
              className="mt-6 px-5 py-3 text-white font-semibold rounded-full hover:opacity-90 transition"
            >
              {offer.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
