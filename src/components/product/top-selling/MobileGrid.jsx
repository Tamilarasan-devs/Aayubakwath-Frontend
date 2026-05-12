import React from "react";
import SmallCard from "./SmallCard";

export default function MobileGrid({ products, isLoading, navigate }) {
  if (isLoading) {
    return (
      <div className="lg:hidden grid grid-cols-1 min-[420px]:grid-cols-2 gap-3">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="h-52 bg-[var(--color-bg-soft)] rounded-2xl animate-pulse border border-[var(--color-border)]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="lg:hidden grid grid-cols-1 min-[420px]:grid-cols-2 gap-3">
      {products.map((product, index) => (
        <div
          key={product.id}
          className={index === 2 ? "min-[420px]:col-span-2" : ""}
        >
          <SmallCard product={product} navigate={navigate} />
        </div>
      ))}
    </div>
  );
}
