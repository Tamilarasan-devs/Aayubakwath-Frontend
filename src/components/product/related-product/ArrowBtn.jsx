import React from "react";

export default function ArrowBtn({ dir, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-700 text-lg
        flex items-center justify-center cursor-pointer flex-shrink-0
        hover:bg-[#111827] hover:text-white hover:border-[#111827]
        hover:shadow-[0_4px_14px_rgba(17,24,39,0.25)]
        shadow-[0_1px_4px_rgba(0,0,0,0.07)]
        transition-all duration-200 ease-in-out"
    >
      {dir === "prev" ? "‹" : "›"}
    </button>
  );
}
