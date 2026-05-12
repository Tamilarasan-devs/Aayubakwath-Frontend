export default function ProductPackSelector({ PACKS, packIdx, setPackIdx }) {
  return (
    <div className="mb-5">
      <p className="text-sm tracking-[0.2em] uppercase text-[var(--color-text-muted)] font-semibold mb-3">
        Choose Pack
      </p>
      <div className="space-y-2">
        {PACKS.map((p, i) => {
          const isSel = packIdx === i;
          const pDisc = p.orig
            ? Math.round(((p.orig - p.price) / p.orig) * 100)
            : 0;
          return (
            <button
              key={i}
              onClick={() => setPackIdx(i)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all text-left
                ${
                  isSel
                    ? "border-[var(--color-sage)] bg-white shadow-sm"
                    : "border-[var(--color-border)] bg-white hover:border-[var(--color-sage)]/60"
                }`}
            >
              {/* Radio circle */}
              <div
                className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors
                ${isSel ? "border-[var(--color-sage)]" : "border-gray-300"}`}
              >
                {isSel && (
                  <div className="w-2 h-2 rounded-full bg-[var(--color-sage)]" />
                )}
              </div>
              {/* Label */}
              <span className="flex-1 text-sm font-semibold text-[var(--color-text)]">
                {p.qty} Capsules
                <span className="text-[var(--color-text-secondary)] font-medium">
                  {" "}
                  · ₹{p.price.toLocaleString()}
                  {pDisc > 0 && <> @{pDisc}% off</>}
                </span>
              </span>
              {/* Badge */}
              {p.tag && (
                <span className="text-[1rem] font-semibold tracking-wide text-[var(--color-sage)] border border-[var(--color-sage)] bg-[var(--color-sage-light)] px-4 py-1 rounded-lg shrink-0">
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
