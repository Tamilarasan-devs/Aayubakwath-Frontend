import React from "react";
import {
  getProductCardImages,
  getProductImageUrl,
  isContainProductImage,
} from "../../../utils/productImages";

function DiscountBadge({ discount, featured = false }) {
  if (discount <= 0) return null;
  const className = featured
    ? "absolute top-4 left-4 z-10 bg-[#829b1c] text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow-sm"
    : "absolute top-3 left-3 z-10 bg-[#829b1c] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full";
  return <div className={className}>-{discount}%</div>;
}

function ProductImage({ product, featured = false }) {
  const { primaryImage: image } = getProductCardImages(product);
  const contain = isContainProductImage(image);
  const imageClass = contain
    ? featured
      ? "absolute inset-0 w-full h-full object-contain p-5 group-hover:scale-[1.02] transition-transform duration-700"
      : "w-full h-full object-contain p-4 group-hover:scale-[1.03] transition-transform duration-500"
    : featured
      ? "absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 drop-shadow-2xl"
      : "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 drop-shadow-sm";
  const wrapperClass = featured
    ? "relative flex-1 min-h-0 overflow-hidden"
    : "flex-1 flex items-center justify-center overflow-hidden";

  return (
    <div className={wrapperClass}>
      <img
        src={getProductImageUrl(image)}
        alt={product.productName}
        className={imageClass}
      />
    </div>
  );
}

function SmallProductInfo({ product, discount, saving, formatCurrency }) {
  return (
    <div className="px-4 pt-3 pb-4 space-y-1.5">
      <h3 className="font-semibold text-[var(--color-text)] text-lg leading-snug line-clamp-2">
        {product.productName}
      </h3>
      {discount > 0 && (
        <p className="text-md leading-snug text-[var(--color-text-muted)] font-medium">
          Save {discount}%* extra
        </p>
      )}
      {saving > 0 && (
        <p className="text-xs leading-snug text-[var(--color-sage)] font-semibold">
          {formatCurrency(saving)} off
        </p>
      )}
    </div>
  );
}

export default function SmallCard({ product, navigate }) {
  const originalPrice = parseFloat(product.price) || 0;
  const finalPrice = parseFloat(product.finalPrice) || 0;
  const discount = originalPrice > 0 && finalPrice > 0 && originalPrice > finalPrice
    ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
    : 0;
  const saving = Math.max(0, Math.round(originalPrice - finalPrice));

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="relative bg-[var(--color-bg-soft)] rounded-2xl overflow-hidden cursor-pointer group
        border border-[var(--color-border)] hover:border-[var(--color-sage)]/50
        hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      <DiscountBadge discount={discount} />
      <ProductImage product={product} />
      <SmallProductInfo
        product={product}
        discount={discount}
        saving={saving}
        formatCurrency={(v) => `₹${Math.round(parseFloat(v) || 0).toLocaleString()}`}
      />
    </div>
  );
}
