export default function ProductTrustBadges() {
  return (
    <div className="w-full rounded-xl border border-[var(--color-border)] bg-white p-3.5 shadow-sm sm:p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: "🌿",
            title: "100% Natural",
            sub: "Organic extracts",
          },
          {
            icon: "🛡️",
            title: "Lab Tested",
            sub: "Quality assured",
          },
          {
            icon: "⚡",
            title: "Fast Delivery",
            sub: "4-7 business days",
          },
          {
            icon: "⏱️",
            title: "60-Day Returns",
            sub: "Hassle-free",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="group flex items-center gap-3 rounded-xl border border-transparent bg-white p-2.5 transition-all duration-500 hover:-translate-y-0.5 hover:border-[var(--color-sage)]/35 hover:bg-[var(--color-sage-light)]/40 hover:shadow-md sm:p-3"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-sage-light)] text-[var(--color-sage)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-[var(--color-sage)] group-hover:text-white">
              <span
                className="badge-float text-[16px] leading-none"
                style={{ animationDelay: `${i * 120}ms` }}
                aria-hidden="true"
              >
                {item.icon}
              </span>
            </div>
            <div>
              <span className="block text-[15px] font-semibold text-[#829b1c] transition-colors duration-500 group-hover:text-[var(--color-sage-dark)]">
                {item.title}
              </span>
              <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                {item.sub}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
