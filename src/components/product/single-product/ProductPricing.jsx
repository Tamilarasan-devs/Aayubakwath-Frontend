export default function ProductPricing({ pack, product, discPct }) {
  return (
    <div className="bg-gradient-to-r from-[var(--color-sage-light)]/30 via-white to-[var(--color-bg-soft)] border border-[var(--color-sage)]/30 rounded-2xl p-4.5 mb-4 shadow-sm">
      <div className="flex items-baseline gap-2.5 flex-wrap">
        <span className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] tracking-tight">
          ₹
          {(
            pack.price ?? parseFloat(product.finalPrice)
          ).toLocaleString()}
        </span>
        {pack.orig && (
          <span className="text-base sm:text-lg text-[var(--color-text-placeholder)] line-through font-medium">
            ₹{pack.orig.toLocaleString()}
          </span>
        )}
        {discPct > 0 && (
          <span className="text-sm sm:text-base font-bold italic text-[var(--color-sage)] bg-white px-2.5 py-0.5 rounded-full border border-[var(--color-sage)]/30 shadow-xs">
            ({discPct}% OFF)
          </span>
        )}
      </div>
      <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 font-semibold tracking-wide uppercase">
        MRP (incl. of all taxes)
      </p>
    </div>
  );
}
