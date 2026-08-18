export default function ProductPackSelector({ PACKS, packIdx, setPackIdx }) {
  return (
    <div className="mb-5">
      <p className="text-xs tracking-[0.18em] uppercase text-[var(--color-text-muted)] font-semibold mb-2.5">
        Choose Pack
      </p>
      <div className="space-y-2.5">
        {PACKS.map((p, i) => {
          const isSel = packIdx === i;
          const pDisc = p.orig
            ? Math.round(((p.orig - p.price) / p.orig) * 100)
            : 0;
          return (
            <button
              key={i}
              onClick={() => setPackIdx(i)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left
                ${
                  isSel
                    ? "border-[var(--color-sage)] bg-gradient-to-r from-[var(--color-sage-light)]/20 to-white shadow-sm"
                    : "border-[var(--color-border)] bg-white hover:border-[var(--color-sage)]/60"
                }`}
            >
              {/* Radio circle */}
              <div
                className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors
                ${isSel ? "border-[var(--color-sage)] bg-white" : "border-gray-300"}`}
              >
                {isSel && (
                  <div className="w-2 h-2 rounded-full bg-[var(--color-sage)]" />
                )}
              </div>
              {/* Label */}
              <span className="flex-1 text-sm sm:text-base font-semibold text-[var(--color-text)]">
                {p.qty} Capsules
                <span className="text-[var(--color-text-secondary)] font-medium text-xs sm:text-sm">
                  {" "}
                  · ₹{p.price.toLocaleString()}
                  {pDisc > 0 && <span className="text-[var(--color-sage)] font-semibold"> @{pDisc}% off</span>}
                </span>
              </span>
              {/* Badge */}
              {p.tag && (
                <span className="text-xs font-semibold tracking-wider uppercase text-[var(--color-sage)] border border-[var(--color-sage)]/40 bg-[var(--color-sage-light)] px-3 py-0.5 rounded-lg shrink-0">
                  {p.tag}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
