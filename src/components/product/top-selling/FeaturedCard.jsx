import React from "react";
import { ShoppingCart } from "lucide-react";
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
    ? "relative h-[420px] xl:h-[500px] overflow-hidden bg-white"
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

function FeaturedProductInfo({ product, discount, saving, onBuy, formatCurrency }) {
  const originalPrice = parseFloat(product.price) || 0;
  const finalPrice = parseFloat(product.finalPrice) || 0;

  return (
    <div className="p-6 bg-white border-t border-[var(--color-border)] space-y-2">
      <h2 className="font-extrasemibold text-[var(--color-text)] text-xl leading-tight line-clamp-2">
        {product.productName}
      </h2>

      <div className="flex items-baseline gap-2">
        {originalPrice > finalPrice && (
          <span className="text-sm text-[var(--color-text-placeholder)] line-through font-medium">
            {formatCurrency(originalPrice)}
          </span>
        )}
        <span className="text-xl font-semibold text-[var(--color-text)]">
          {formatCurrency(finalPrice)}
        </span>
      </div>

      {discount > 0 && (
        <p className="text-sm leading-snug text-[var(--color-text-muted)] font-medium">
          Save {discount}%* extra
        </p>
      )}
      {saving > 0 && (
        <p className="text-sm leading-snug font-semibold text-[var(--color-sage)]">
          {formatCurrency(saving)}* Instant savings
        </p>
      )}

      <button
        onClick={onBuy}
        className="inline-flex items-center gap-2 bg-[var(--color-text)] text-white
          text-sm font-semibold tracking-wide px-5 py-2.5 rounded-xl
          hover:bg-black transition-colors"
      >
        <ShoppingCart size={14} />
        Buy Now
      </button>
    </div>
  );
}

export default function FeaturedCard({ product, navigate }) {
  const originalPrice = parseFloat(product.price) || 0;
  const finalPrice = parseFloat(product.finalPrice) || 0;
  const discount = originalPrice > 0 && finalPrice > 0 && originalPrice > finalPrice
    ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
    : 0;
  const saving = Math.max(0, Math.round(originalPrice - finalPrice));

  const goToProduct = () => navigate(`/product/${product.id}`);
  const handleBuy = (event) => {
    event.stopPropagation();
    goToProduct();
  };

  return (
    <div
      onClick={goToProduct}
      className="relative bg-white rounded-2xl overflow-hidden cursor-pointer group
        border border-[var(--color-border)] hover:shadow-2xl transition-all duration-500 flex flex-col"
    >
      <DiscountBadge discount={discount} featured />
      <ProductImage product={product} featured />
      <FeaturedProductInfo
        product={product}
        discount={discount}
        saving={saving}
        onBuy={handleBuy}
        formatCurrency={(v) => `₹${Math.round(parseFloat(v) || 0).toLocaleString()}`}
      />
    </div>
  );
}
