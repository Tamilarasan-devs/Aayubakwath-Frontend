import React, { Fragment } from "react";

const STEPS = ["Address", "Review", "Confirm"];

export default function CheckoutSteps({ step }) {
  return (
    <div className="flex items-center mb-6">
      {STEPS.map((s, i) => (
        <Fragment key={s}>
          <div
            className={`flex items-center gap-2 ${i <= step ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]"}`}
          >
            <span
              className={`w-8 h-8 flex items-center justify-center font-body text-[11px]
              font-semibold tracking-wider border transition-colors rounded-full
              ${
                i === step
                  ? "bg-[var(--color-sage)] border-[var(--color-sage)] text-white"
                  : i < step
                    ? "bg-[var(--color-text)] border-[var(--color-text)] text-white"
                    : "border-[var(--color-border)] text-[var(--color-text-muted)]"
              }`}
            >
              {i + 1}
            </span>
            <span className="font-body text-[11px] tracking-[0.1em] uppercase font-medium hidden sm:block">
              {s}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`flex-1 h-px mx-4 transition-colors
              ${i < step ? "bg-[var(--color-sage)]" : "bg-[var(--color-border)]"}`}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
