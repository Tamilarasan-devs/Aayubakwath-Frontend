import React from "react";
import { Heart, Sparkles } from "lucide-react";

export default function WishlistHeader({ count, totalSaved }) {
  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#111827] flex items-center justify-center shadow-sm">
            <Heart size={17} className="text-white fill-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-[#111827] leading-none">
              My Wishlist
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {count} saved item{count !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {count > 0 && (
          <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2">
            <Sparkles size={14} className="text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-700">
              You&apos;re saving{" "}
              <span className="text-sm">₹{totalSaved.toFixed(0)}</span> total
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
