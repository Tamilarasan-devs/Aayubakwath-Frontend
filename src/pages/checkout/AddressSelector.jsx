import React from "react";
import { Phone } from "lucide-react";

export default function AddressSelector({ addresses, selectedAddress, onSelect }) {
  if (addresses.length === 0) return null;

  return (
    <div className="flex flex-col gap-0 mb-8 border border-[var(--color-border)] rounded-[var(--radius-lg)] overflow-hidden divide-y divide-[var(--color-border)]">
      {addresses.map((addr) => {
        const isSelected =
          selectedAddress?.id === addr.id || selectedAddress === addr.details;

        return (
          <div
            key={addr.id}
            onClick={() => onSelect(addr)}
            className={`relative flex items-start gap-4 px-5 py-4 cursor-pointer transition-all duration-200
              ${
                isSelected
                  ? "bg-[var(--color-sage)]/5 border-l-4 border-l-[var(--color-sage)]"
                  : "bg-white border-l-4 border-l-transparent hover:bg-gray-50"
              }`}
          >
            {/* Radio */}
            <div className="mt-0.5 flex-shrink-0">
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all
                  ${isSelected ? "border-[var(--color-sage)]" : "border-gray-400"}`}
              >
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-[var(--color-sage)]" />
                )}
              </div>
            </div>

            {/* Address body */}
            <div className="flex-1 min-w-0">
              {/* Name + badges row */}
              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                <span className="font-body font-bold text-[var(--color-text)] text-[14px]">
                  {addr.name || "Receiver Name"}
                </span>

                <span
                  className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                    isSelected
                      ? "bg-[var(--color-sage)]/20 text-[var(--color-sage)]"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {addr.addressType || addr.label || "Home"}
                </span>

                {addr.isDefault && (
                  <span className="text-[9px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-sm border border-amber-200">
                    Default
                  </span>
                )}
              </div>

              {/* Address lines */}
              <p className="font-body text-[13px] text-[var(--color-text-secondary)] leading-snug">
                {addr.doorNumber && `${addr.doorNumber}, `}
                {addr.area || addr.street || addr.details}
                {addr.landmark && `, ${addr.landmark}`}
              </p>
              <p className="font-body text-[13px] text-[var(--color-text-secondary)] leading-snug">
                {addr.city}, {addr.state} &nbsp;–&nbsp;
                <span className="font-semibold text-[var(--color-text)]">
                  {addr.postalCode}
                </span>
              </p>

              {/* Phone */}
              {addr.phone && (
                <p className="font-body text-[12px] text-[var(--color-text-muted)] mt-1 flex items-center gap-1">
                  <Phone size={10} className="text-[var(--color-sage)]" />
                  {addr.phone}
                </p>
              )}

              {/* Deliver CTA — only shown when selected */}
              {isSelected && (
                <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-[var(--color-sage)]">
                  ✓ Delivering to this address
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

