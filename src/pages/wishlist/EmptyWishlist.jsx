import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";

export default function EmptyWishlist() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center mb-5">
        <Heart size={32} className="text-gray-300" />
      </div>
      <h2 className="text-xl font-semibold text-[#111827] mb-2">
        Your wishlist is empty
      </h2>
      <p className="text-gray-400 text-sm max-w-xs mb-6">
        Save items you love and come back to them anytime.
      </p>
      <button
        onClick={() => navigate("/productListing")}
        className="flex items-center gap-2 px-6 py-3 bg-[#111827] text-white rounded-xl text-sm font-semibold hover:bg-black transition-colors shadow-sm"
      >
        Explore Products <ArrowRight size={15} />
      </button>
    </div>
  );
}
