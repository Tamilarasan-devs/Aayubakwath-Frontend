export default function ProductPricing({ pack, product, discPct }) {
  return (
    <div className="bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-xl p-4 mb-4">
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-4xl font-semibold text-[var(--color-text)] tracking-tight">
          ₹
          {(
            pack.price ?? parseFloat(product.finalPrice)
          ).toLocaleString()}
        </span>
        {pack.orig && (
          <span className="text-lg text-[var(--color-text-placeholder)] line-through font-medium">
            ₹{pack.orig.toLocaleString()}
          </span>
        )}
        {discPct > 0 && (
          <span className="text-lg font-semibold italic text-[var(--color-sage)]">
            ({discPct}% OFF)
          </span>
        )}
      </div>
      <p className="text-xs text-[var(--color-text-muted)] mt-1.5 font-medium">
        MRP (incl. of all taxes)
      </p>
    </div>
  );
}
