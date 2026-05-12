import React from "react";

export default function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-3 py-1.5 font-body text-[13px] font-semibold tracking-wide rounded-full border transition-all duration-200
        ${
          active
            ? "bg-black text-white border-black"
            : "bg-white text-(--color-text-secondary) border-(--color-border) hover:border-black hover:text-black"
        }`}
    >
      {children} 
    </button>
  );
}
