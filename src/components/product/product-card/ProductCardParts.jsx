import React, { memo } from "react";
import { FaHeart, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import {
  getProductCardImages,
  getProductImageUrl,
  isContainProductImage,
} from "../../../utils/productImages";

export const StarRating = memo(function StarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<FaStar key={i} size={14} style={{ color: "var(--color-gold)" }} />);
    } else if (i - 0.5 <= rating) {
      stars.push(
        <FaStarHalfAlt key={i} size={14} style={{ color: "var(--color-gold)" }} />,
      );
    } else {
      stars.push(
        <FaRegStar key={i} size={14} style={{ color: "var(--color-border-strong)" }} />,
      );
    }
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
});

export function ProductCardImage({ product, hov, wishlisted, onToggleWishlist, onAddToCart, adding, wishlistPending }) {
  const disc = Math.round(
    ((product.price - product.finalPrice) / product.price) * 100,
  );
  const { primaryImage, secondaryImage } = getProductCardImages(product);
  const primaryContain = isContainProductImage(primaryImage);
  const secondaryContain = isContainProductImage(secondaryImage);

  return (
    <div
      className="relative w-full overflow-hidden shrink-0 bg-white"
      style={{ paddingBottom: "120%" }}
    >
      <div className="absolute inset-0">
        <img
          src={getProductImageUrl(primaryImage)}
          alt={product.productName}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={`w-full h-full ${primaryContain ? "object-contain p-3" : "object-cover"}`}
          style={{
            opacity: hov ? 0 : 1,
            transform: primaryContain
              ? hov
                ? "scale(0.95)"
                : "scale(0.92)"
              : hov
                ? "translateY(10px) scale(1.36)"
                : "translateY(10px) scale(1.34)",
            transition: "opacity 0.5s ease, transform 0.7s ease",
            position: "absolute",
            inset: 0,
          }}
        />
        <img
          src={getProductImageUrl(secondaryImage)}
          alt={product.productName}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={`w-full h-full ${secondaryContain ? "object-contain p-3" : "object-cover"}`}
          style={{
            opacity: hov ? 1 : 0,
            transform: secondaryContain
              ? hov
                ? "scale(0.96)"
                : "scale(0.92)"
              : hov
                ? "translateY(40px) scale(1.24)"
                : "translateY(10px) scale(1.24)",
            transition: "opacity 0.5s ease, transform 0.7s ease",
            position: "absolute",
            inset: 0,
          }}
        />
      </div>

      {disc > 0 && (
        <div
          className="absolute top-0 left-0 z-10 flex flex-col items-center justify-center
          bg-[var(--color-sage)] text-white rounded-br-2xl px-2 sm:px-3 py-1 sm:py-2 min-w-[40px] sm:min-w-[52px]"
        >
          <span className="text-[14px] sm:text-[20px] font-bold leading-none tracking-tight">
            {disc}%
          </span>
          <span className="text-[8px] sm:text-[11px] font-medium tracking-[0.08em] uppercase opacity-90 mt-0.5">
            off 
          </span>
        </div>
      )}

      <button
        onClick={onToggleWishlist}
        disabled={wishlistPending}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 flex items-center justify-center rounded-full
          bg-white/90 backdrop-blur-sm border border-[var(--color-border)] transition-all duration-300
          ${wishlisted ? "text-[var(--color-terracotta)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-terracotta)]"}
          ${wishlistPending ? "animate-pulse" : ""}`}
      >
        <FaHeart size={13} />
      </button>

      <button
        onClick={onAddToCart}
        disabled={adding}
        aria-label="Add to cart"
        className="absolute bottom-2.5 right-2.5 z-10 w-9 h-9 flex items-center justify-center
          rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-sage)] text-white shadow-md border-2 border-white
          sm:hidden transition-colors active:scale-95"
      >
        <ShoppingBag size={15} />
      </button>

      <motion.div
        initial={false}
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 z-20 hidden sm:flex flex-col items-center justify-end pb-4 gap-2
          pointer-events-none"
      >
        <div
          className={`flex flex-col items-center gap-2 w-full px-4 transition-all duration-300
          ${hov ? "translate-y-0 pointer-events-auto" : "translate-y-4 pointer-events-none"}`}
        />
      </motion.div>
    </div>
  );
}

export function ProductCardInfo({ product }) {
  const disc = Math.round(
    ((product.price - product.finalPrice) / product.price) * 100,
  );
  const savings = Math.round(product.price - product.finalPrice);

  const seedRating = (id) => {
    let hash = 0;
    const str = String(id);
    for (let i = 0; i < str.length; i++)
      hash = (hash * 31 + str.charCodeAt(i)) & 0xffff;
    return (3.5 + (hash % 15) / 10).toFixed(1);
  };
  const seedReviews = (id) => {
    let hash = 0;
    const str = String(id) + "r";
    for (let i = 0; i < str.length; i++)
      hash = (hash * 37 + str.charCodeAt(i)) & 0xffff;
    return 28 + (hash % 220);
  };

  const rating =
    product.rating > 0 ? product.rating : parseFloat(seedRating(product.id));
  const reviewCount =
    product.reviewCount > 0 ? product.reviewCount : seedReviews(product.id);

  return (
    <>
      {/* {Array.isArray(product.productTags) &&
        product.productTags[0] &&
        String(product.productTags[0]).trim().toLowerCase() !== "endurance" &&
        String(product.productTags[0]).trim().toLowerCase() !==
          "not specified" && (
        <span
          className="font-body text-[8px] sm:text-[11px] tracking-[0.07em] uppercase px-1.5 sm:px-2 py-0.5
              bg-[var(--color-bg-warm)] border border-[var(--color-border)]
              text-[var(--color-text-secondary)] font-bold"
        >
          {product.productTags[0]}
        </span>
      )} */}
      <div className="px-2 sm:px-3 pt-2 sm:pt-3 pb-3 sm:pb-4 flex flex-col gap-1 sm:gap-1.5">
        <h3
          className="font-body text-[12px] sm:text-[20px] font-bold text-[var(--color-text)] leading-snug line-clamp-2
          tracking-[0.01em]"
        >
          {product.productName}
        </h3>

        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap mt-0.5">
          {product.forWhom &&
            product.forWhom !== "Not specified" &&
            String(product.forWhom).trim().toLowerCase() !== "endurance" && (
            <span className="font-futura text-[9px] sm:text-[15px] text-[var(--color-text-muted)] tracking-[0.03em] font-medium">
              {product.forWhom}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <StarRating rating={rating} />
          <span className="text-[11px] sm:text-[13px] font-bold text-[var(--color-text-secondary)]">
            {reviewCount > 0 && `(${reviewCount})`}
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 ">
          <span className="text-[14px] sm:text-[25px] font-bold text-[var(--color-text)] font-body">
            ₹{Number(product.finalPrice).toLocaleString("en-IN")}
          </span>
          {disc > 0 && (
            <span className="text-[10px] sm:text-[13px] text-[var(--color-text-placeholder)] line-through font-body">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </span>
          )}

          {disc > 0 && (
            <div className="flex-1 flex justify-end">
              <div className="inline-flex items-center bg-[var(--color-success-bg)] border border-[var(--color-sage)]/20 rounded-full px-2 sm:px-2.5 py-0.5 shadow-sm">
                <span className="text-[9px] sm:text-[18px] font-bold text-[var(--color-sage-deep)] tracking-[0.02em]">
                  Save ₹{savings.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export function ProductCardActions({ onAddToCart, adding }) {
  return (
    <button
      onClick={onAddToCart}
      disabled={adding}
      className="w-full py-2.5 text-[13px] font-bold tracking-[0.1em] uppercase bg-[var(--color-accent)] text-white border border-[var(--color-accent)] hover:bg-[var(--color-sage)] hover:border-[var(--color-sage)] transition-all duration-300
            rounded-[var(--radius-md)] flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
    >
      <ShoppingBag size={13} />
      {adding ? "Adding..." : "Add to Cart"}
    </button>
  );
}
