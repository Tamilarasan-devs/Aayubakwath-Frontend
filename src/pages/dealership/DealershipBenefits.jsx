import React from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

const benefits = [
  "Exclusive tiered discounts on every order",
  "Dedicated account manager for your business",
  "Transparent trusted collaboration",
  "Priority shipping with pan-India network",
  "Flexible payment terms and credit options",
  "Early access to new product launches",
];

export default function DealershipBenefits() {
  return (
    <Reveal delay={0.1}>
      <div className="clean-card rounded-2xl p-8 lg:p-10 border border-gray-100 shadow-sm relative overflow-hidden group hover:border-[var(--color-sage)] hover:shadow-2xl hover:shadow-[rgba(130,155,28,0.12)] transition-all duration-500 hover:-translate-y-2">
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 bg-gradient-to-br from-[var(--color-sage)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl bg-gradient-to-r from-[var(--color-sage)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center bg-[var(--color-sage-light)] text-[var(--color-sage)]">
            <Sparkles size={24} />
          </div>
          <h3 className="font-display text-[1.75rem] font-semibold text-[#111827] mb-3 leading-tight">
            Let&apos;s grow together
          </h3>
          <div className="w-8 h-0.5 rounded-full mb-6 bg-[var(--color-sage)]" />
          <ul className="space-y-4 m-0 p-0 list-none">
            {benefits.map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 text-[1.08rem] leading-[1.65] text-gray-600 font-medium"
              >
                <span className="text-[var(--color-sage)] mt-0.5 flex-shrink-0">
                  <CheckCircle2 size={18} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
