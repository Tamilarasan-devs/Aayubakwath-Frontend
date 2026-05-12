export default function ProductOffers({ OFFERS }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <p className="text-[0.95rem] font-semibold text-[var(--color-text)]">
          Offers For You
        </p>
        <span className="text-[0.95rem] text-[var(--color-text-muted)] font-semibold">
          · 2 available offers
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((offer, i) => (
          <div
            key={i}
            className="group relative min-h-[96px] overflow-hidden rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-sage)] hover:shadow-2xl hover:shadow-[rgba(130,155,28,0.12)]"
          >
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1 rounded-b-xl bg-gradient-to-r from-[var(--color-sage)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <p className="mb-1 text-[1.02rem] font-semibold text-[var(--color-text)]">
              {offer.icon}
            </p>
            <p className="text-[0.95rem] leading-relaxed text-[var(--color-text-secondary)]">
              {offer.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
