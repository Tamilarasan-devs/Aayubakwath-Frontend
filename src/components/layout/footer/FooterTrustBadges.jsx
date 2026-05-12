import React from "react";
import { ShieldCheck, Leaf, Award, BadgeCheck } from "lucide-react";

const trustBadges = [
  { icon: <Leaf size={16} />, label: "100% Pure & Natural" },
  { icon: <ShieldCheck size={16} />, label: "ISO Certified" },
  { icon: <Award size={16} />, label: "GMP Certified" },
  { icon: <BadgeCheck size={16} />, label: "FSSAI Approved" },
];

export default function FooterTrustBadges() {
  return (
    <div className="max-w-[260px]">
      <h4 className="label mb-4 border-b border-[var(--color-border)] pb-2.5 text-base text-[var(--color-text-muted)]">
        Trusted standards
      </h4>
      <ul className="m-0 list-none space-y-4 p-0">
        {trustBadges.map((b, i) => (
          <li key={i}>
            <div className="group inline-flex items-center gap-2 font-body text-[1.14rem] text-[var(--color-text)]">
              <span className="w-0 group-hover:w-2.5 h-px bg-[var(--color-sage)] transition-all duration-300" />
              <span
                className="text-[var(--color-sage)] transition-colors duration-200 group-hover:text-[var(--color-sage-dark)]"
                aria-hidden="true"
              >
                {b.icon}
              </span>
              <span className="font-normal transition-colors duration-200 group-hover:text-[var(--color-sage)]">
                {b.label}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
