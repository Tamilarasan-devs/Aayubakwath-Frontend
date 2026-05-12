import React from "react";

export default function ProfileHero({ user, orders, wishlist, addresses }) {
  const nameParts = (user.name || "").split(" ");
  const firstName = nameParts[0] || "Guest";
  const lastName = nameParts[1] || "";
  const avatar = nameParts[0]?.charAt(0)?.toUpperCase() || "G";

  return (
    <div className="relative overflow-hidden bg-[var(--color-bg-warm)] border-b border-[var(--color-border)]">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row min-h-[240px]">
        {/* Left — Light themed info block */}
        <div className="relative lg:w-[55%] overflow-hidden px-8 lg:px-12 py-12 flex flex-col justify-center bg-white border-r border-[var(--color-border)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-sage-light)] rounded-full -translate-y-1/2 translate-x-1/3 opacity-40 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex items-center gap-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl shrink-0 flex items-center justify-center text-4xl font-bold bg-gradient-to-br from-[var(--color-sage)] to-[var(--color-sage-dark)] text-white shadow-[0_10px_30px_rgba(130,155,28,0.25)] border-4 border-white ring-1 ring-[var(--color-border)] overflow-hidden group">
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]" />
                <span className="relative z-10">{avatar}</span>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-md border border-[var(--color-border)]">
                <div className="bg-[var(--color-sage)] text-white p-1 rounded-full">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-2.5 h-2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>
            </div>
            <div>

              <h1 className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] leading-tight tracking-tight">
                {firstName} <span className="text-[var(--color-text-muted)] font-medium">{lastName}</span>
              </h1>
              <div className="flex items-center gap-2.5 mt-2">
                <div className="w-2 h-2 rounded-full bg-[var(--color-sage)]" />
                <p className="text-[var(--color-text-muted)] text-[13px] font-medium">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — stats with new theme */}
        <div className="flex-1 flex items-center justify-around px-8 lg:px-12 py-10 gap-6 bg-[var(--color-bg-warm)]/50">
          {[
            {
              label: "Total Orders",
              value: orders.length,
              color: "var(--color-sage-deep)",
              bg: "var(--color-sage-light)",
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              ),
            },
            {
              label: "Wishlist",
              value: wishlist.length,
              color: "var(--color-sage-deep)",
              bg: "var(--color-sage-light)",
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0" className="w-5 h-5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              ),
            },
            {
              label: "Addresses",
              value: addresses.length,
              color: "var(--color-sage-deep)",
              bg: "var(--color-sage-light)",
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              ),
            },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform hover:scale-110 duration-300 shadow-sm" style={{ background: s.bg, color: s.color }}>
                {s.icon}
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold" style={{ color: "var(--color-text)" }}>
                  {s.value}
                </p>
                <p className="text-[var(--color-text-muted)] text-[10px] tracking-widest uppercase font-bold mt-1">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
