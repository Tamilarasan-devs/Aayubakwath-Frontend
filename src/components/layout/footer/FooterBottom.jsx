import React from "react";

export default function FooterBottom() {
  return (
    <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-soft)]">
      <div className="mx-auto max-w-[1400px] px-2 py-2.5 lg:px-3">
        <p className="m-0 text-center font-body text-base text-[var(--color-text-muted)]">
          © 2026{" "}
          <span className="font-semibold text-[var(--color-text)] transition-colors hover:text-[var(--color-sage)] cursor-pointer">
            Aayubakwath
          </span>
          . All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
