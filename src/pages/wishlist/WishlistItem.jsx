import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Trash2 } from "lucide-react";
import { getProductImageUrl, isContainProductImage } from "../../utils/productImages";

const BADGE_STYLES = {
  Bestseller: "bg-gray-100 text-gray-700 border border-gray-200",
  New: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "Top Rated": "bg-gray-100 text-gray-700 border border-gray-200",
  Limited: "bg-gray-100 text-gray-700 border border-gray-200",
};

function StarRow({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3 h-3" viewBox="0 0 20 20">
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            fill={i < Math.round(rating || 4.5) ? "#f59e0b" : "#e5e7eb"}
          />
        </svg>
      ))}
    </div>
  );
}

export default function WishlistItem({
  item,
  onRemove,
  onAddToCart,
  isRemoving,
  inCart,
}) {
  const navigate = useNavigate();
  const product = item.product;
  if (!product) return null;

  const discount = Math.round(
    ((product.price - product.finalPrice) / product.price) * 100,
  );
  const badge = product.offerTags?.[0];
  const primaryImage = product.productImages?.[0];
  const containImage = isContainProductImage(primaryImage);

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
      style={{
        opacity: isRemoving ? 0.5 : 1,
        transform: isRemoving ? "scale(0.95)" : "scale(1)",
        transition:
          "opacity 0.35s ease, transform 0.35s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden bg-gray-50  cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={
            getProductImageUrl(primaryImage) ||
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop"
          }
          alt={product.productName}
          loading="lazy"
          decoding="async"
          className={`w-full h-full transition-transform duration-500 ${
            containImage
              ? "object-contain p-4 group-hover:scale-[1.03]"
              : "object-cover group-hover:scale-105"
          }`}
        />

        {badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full ${BADGE_STYLES[badge] || "bg-gray-100 text-gray-700 border border-gray-200"}`}
          >
            {badge}
          </span>
        )}

        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-[#111827] text-white text-[10px] font-extrasemibold px-2 py-1 rounded-full shadow">
            -{discount}%
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(product.id);
          }}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 hover:bg-red-50 hover:text-red-500 text-gray-400"
          title="Remove from wishlist"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
            {product.forWhom || "Holistic Care"}
          </p>
          <h2
            className="text-sm font-semibold text-[#111827] leading-snug cursor-pointer hover:text-gray-600 transition-colors"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            {product.productName}
          </h2>

          <div className="flex items-center gap-2 mt-1.5">
            <StarRow rating={4.7} />
            <span className="text-[10px] text-gray-400 font-medium">(1.2k)</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-base font-extrasemibold text-[#111827]">
            ₹{product.finalPrice}
          </span>
          <span className="text-xs text-gray-400 line-through">₹{product.price}</span>
          {product.price > product.finalPrice && (
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
              Save ₹{product.price - product.finalPrice}
            </span>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={() => onAddToCart(product)}
          disabled={inCart}
          className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 ${inCart ? "bg-emerald-600 text-white" : "bg-[#111827] text-white hover:bg-black shadow-md"}`}
        >
          {inCart ? (
            <>✓ Added</>
          ) : (
            <>
              <ShoppingBag size={13} /> Add to Bag
            </>
          )}
        </button>
      </div>
    </div>
  );
}
