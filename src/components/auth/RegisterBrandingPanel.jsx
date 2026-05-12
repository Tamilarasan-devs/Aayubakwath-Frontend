import React from "react";
import panelBg from "../../assets/images/New/fgsfwerw.png";
import logo from "../../assets/images/logo.jpg";

export default function RegisterBrandingPanel() {
  return (
    <div
      className="relative hidden overflow-hidden bg-[#2f3328] lg:flex lg:w-[42%] lg:flex-col"
      style={{
        backgroundImage: `url(${panelBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.86)_0%,rgba(255,255,255,0.62)_55%,rgba(255,255,255,0.74)_100%)]" />
      <div className="relative z-10 flex h-full flex-col justify-between p-7 lg:p-8">
        <div className="flex flex-col items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/25 bg-white p-1.5 shadow-sm">
            <img src={logo} alt="Aayubakwath" className="h-full w-full rounded-xl object-cover" />
          </div>
          <div>
            <p className="font-display text-xl font-semibold tracking-tight text-[#111827]">
              Aayubakwath
            </p>
            <p className="font-body text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--color-sage-dark)]">
              Ayurvedic Wellness
            </p>
          </div>
        </div>

        <div className="pt-6">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-sage)]/25 bg-white/55 px-3 py-1.5 shadow-[0_10px_24px_rgba(17,24,39,0.08)] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-sage)]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-dark)]">
              Member Access
            </span>
          </div>
          <h2 className="mb-3 font-display text-[clamp(1.85rem,2.8vw,2.45rem)] font-semibold leading-[1.05] tracking-tight text-[#111827]">
            Start with
            <br />
            <span className="text-[#111827]/80">clean wellness.</span>
          </h2>
          <p className="max-w-[320px] font-body text-[15px] font-medium leading-relaxed text-[#111827]/80">
            Create your profile for faster checkout, order updates, and
            customer support.
          </p>

          <div className="mt-4 grid gap-2.5">
            {["Safe account creation", "Trusted customer support"].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-[var(--color-sage)]/22 bg-white/60 px-4 py-2.5 text-sm font-semibold text-[#111827] shadow-[0_10px_26px_rgba(17,24,39,0.08)] backdrop-blur-sm"
              >
                <span className="h-2 w-2 rounded-full bg-[var(--color-sage)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
