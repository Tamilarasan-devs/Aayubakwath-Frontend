import React from "react";
import { Package, ShoppingBag } from "lucide-react";

export default function WishlistSummaryBar({ count, totalSaved, onAddAll }) {
  return (
    <div className="mt-10 bg-white border border-gray-100 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
          <Package size={18} className="text-gray-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#111827]">
            {count} item{count !== 1 ? "s" : ""} in wishlist
          </p>
          <p className="text-xs text-gray-400">
            Total potential savings:{" "}
            <span className="text-emerald-600 font-semibold">
              ₹{totalSaved.toFixed(0)}
            </span>
          </p>
        </div>
      </div>
      <button
        onClick={onAddAll}
        className="flex items-center gap-2 px-6 py-3 bg-[#111827] text-white rounded-xl text-sm font-semibold hover:bg-black transition-colors shadow-sm"
      >
        <ShoppingBag size={15} /> Add All to Bag
      </button>
    </div>
  );
}
