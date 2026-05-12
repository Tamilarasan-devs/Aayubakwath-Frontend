import React from "react";
import { getProductImageUrl, getProductCardImages } from "../../utils/productImages";

export default function ProfileWishlist({ wishlist, onRemove }) {
  if (wishlist.length === 0) {
    return (
      <div className="fade-up bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--color-bg-warm)] flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-sage)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">Your wishlist is empty</h3>
        <p className="text-[var(--color-text-muted)] text-sm">Start adding items you love!</p>
      </div>
    );
  }

  return (
    <div className="fade-up grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlist.map((item, i) => {
        const product = item.product || {};
        const { primaryImage } = getProductCardImages(product);
        const productId = product.id || item.productId;
        const name = product.productName || item.name || "Product";
        const price = Number(product.finalPrice || item.price || 0);
        const originalPrice = Number(product.price || item.originalPrice || price);
        const image = getProductImageUrl(primaryImage || item.image) || null;
        const disc = originalPrice > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

        return (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden group hover:shadow-lg transition-all duration-300 fade-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="relative overflow-hidden h-64 bg-[var(--color-bg-warm)]">
              {image ? (
                <img 
                  src={image} 
                  alt={name} 
                  loading="lazy" 
                  decoding="async" 
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-12 h-12">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              )}
              <button
                onClick={() => onRemove(productId)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-[var(--color-terracotta)] hover:bg-[var(--color-terracotta)] hover:text-white transition-all active:scale-90"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-[var(--color-text)] mb-2 text-lg line-clamp-1">{name}</h4>
              <div className="flex items-center gap-2.5 mb-5">
                <span className="text-2xl font-bold text-[var(--color-sage-deep)]">₹{price.toLocaleString("en-IN")}</span>
                {disc > 0 && (
                  <>
                    <span className="text-[13px] text-[var(--color-text-placeholder)] line-through">₹{originalPrice.toLocaleString("en-IN")}</span>
                    <span className="text-[10px] font-bold text-[var(--color-sage-deep)] bg-[var(--color-sage-light)] px-2 py-1 rounded-full uppercase tracking-wider">
                      {disc}% off
                    </span>
                  </>
                )}
              </div>
              <button className="w-full py-3.5 rounded-xl text-white text-[13px] font-bold tracking-[0.1em] uppercase transition-all bg-[var(--color-accent)] hover:bg-[var(--color-sage)] hover:shadow-lg active:scale-[0.98]">
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
