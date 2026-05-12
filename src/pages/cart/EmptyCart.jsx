import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export default function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 flex items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-bg-soft)] border border-[var(--color-border)] mb-5">
        <ShoppingBag
          size={28}
          className="text-[var(--color-text-placeholder)]"
        />
      </div>
      <h2
        className="display-heading text-[var(--color-text)] mb-3"
        style={{ fontSize: "2rem" }}
      >
        Your cart is empty
      </h2>
      <p className="font-body text-[var(--color-text-secondary)] text-base mb-8 max-w-xs leading-relaxed">
        Looks like you haven&apos;t added anything yet. Explore our wellness
        products!
      </p>
      <button
        onClick={() => navigate("/productListing")}
        className="btn-primary"
      >
        Shop Now
      </button>
    </div>
  );
}
