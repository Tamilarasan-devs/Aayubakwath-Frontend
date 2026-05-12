import React from "react";
import pure from "../assets/images/pure.jpeg";
import health from "../assets/images/health.jpeg";
import safe from "../assets/images/safe.jpeg";
import ht from "../assets/images/ht.jpeg";

const cards = [
  {
    title: "Pure Formulation",
    desc: "Advanced botanical blends inspired by herbal traditions.",
    image: pure,
    color: "brand-red",
  },
  {
    title: "Daily Wellness",
    desc: "Designed to support daily vitality, balance, and overall wellbeing.  ",
    image: health,
    color: "brand-gold",
  },
  {
    title: "Herbal Innovation",
    desc: "Carefully formulated for modern health and wellness lifestyles.",
    image: safe,
    color: "emerald-600",
  },
  {
    title: "Refined Quality",
    desc: "Formulated with strict quality control and nutraceutical expertise.",
    image: ht,
    color: "indigo-600",
  },
];

export default function OurBusiness() {
  return (
    <section className="pt-8 pb-2 md:pt-12 md:pb-3 bg-transparent">
      <div className="text-center max-w-3xl mx-auto mb-10 px-4">
        <h2
          className="display-heading text-[var(--color-text)] mb-4"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
        >
          The Philosophy Of Extraction
        </h2>
        <p className="font-body text-[clamp(1.08rem,1.4vw,1.28rem)] font-medium text-[var(--color-text-secondary)] leading-[1.9] tracking-[-0.012em]">
          We harmonize native organic botanical wisdom with rigorous,
          state-of-the-art modern processing standards to yield uncompromising
          health solutions.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-3 lg:px-4 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => (
          <div
            key={i}
            className="flex h-full flex-col bg-white"
          >
            <div className="w-full overflow-hidden rounded-2xl bg-white">
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full object-cover object-center"
              />
            </div>

            <div className="flex min-h-[132px] flex-1 flex-col justify-center px-7 py-4">
              <h3 className="mb-3 text-[1.7rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#111827]">
                {card.title}
              </h3>
              <p className="text-[1.08rem] font-semibold leading-[1.75] tracking-[-0.01em] text-[#5c6980]">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
