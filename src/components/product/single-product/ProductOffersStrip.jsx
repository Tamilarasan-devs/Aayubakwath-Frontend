import { motion } from "framer-motion";

export default function ProductOffersStrip({ OFFERS, fadeInUp }) {
  return (
    <motion.div
      {...fadeInUp}
      className="border-y border-[var(--color-border)] bg-white"
    >
      <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-5">
        <div className="flex gap-6 overflow-x-auto scrollbar-none">
          {OFFERS.map((offer, i) => (
            <div key={i} className="flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 bg-white border border-[var(--color-border)] flex items-center justify-center rounded-lg shadow-sm">
                <span className="text-xs">{offer.icon.charAt(0)}</span>
              </div>
              <div>
                <span className="text-xs tracking-[0.15em] uppercase text-[var(--color-text)] block font-semibold">
                  {offer.icon}
                </span>
                <span className="text-xs text-[var(--color-text-secondary)] font-semibold">
                  {offer.body}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
