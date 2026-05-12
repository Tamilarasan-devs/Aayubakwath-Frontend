import React from "react";
import { MessageCircle, Facebook, Link2 } from "lucide-react";

export default function BlogShare({ post }) {
  return (
    <div className="mt-6 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
      <p className="text-sm font-semibold text-[#111827]">
        Share this article
      </p>
      <div className="flex items-center gap-3">
        <button
          className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-stone-500 hover:bg-[var(--color-sage)] hover:border-[var(--color-sage)] hover:text-white transition-all duration-300 hover:-translate-y-1"
          title="Share on WhatsApp"
          onClick={() =>
            window.open(
              `https://wa.me/?text=${encodeURIComponent(post.title + " - " + window.location.href)}`,
              "_blank",
            )
          }
        >
          <MessageCircle size={18} />
        </button>
        <button
          className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-stone-500 hover:bg-[var(--color-sage)] hover:border-[var(--color-sage)] hover:text-white transition-all duration-300 hover:-translate-y-1"
          title="Share on Facebook"
          onClick={() =>
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
              "_blank",
            )
          }
        >
          <Facebook size={18} />
        </button>
        <button
          className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-stone-500 hover:bg-[var(--color-sage)] hover:border-[var(--color-sage)] hover:text-white transition-all duration-300 hover:-translate-y-1"
          title="Copy Link"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
          }}
        >
          <Link2 size={18} />
        </button>
      </div>
    </div>
  );
}
