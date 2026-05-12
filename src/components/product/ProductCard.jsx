import React, { useState, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../../services/cartService";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../services/wishlistService";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import {
  ProductCardImage,
  ProductCardInfo,
  ProductCardActions,
} from "./product-card/ProductCardParts";

const ProductCard = memo(function ProductCard({
  product,
  animDelay = 0,
  sectionVisible = true,
  wishlistSet,
}) {
  const { isAuthenticated } = useAuth();
  const [hov, setHov] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!sectionVisible) return;
    const t = setTimeout(() => setCardVisible(true), animDelay * 1000);
    return () => clearTimeout(t);
  }, [sectionVisible, animDelay]);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }
    if (adding) return;
    setAdding(true);

    qc.setQueryData(["cart"], (old) => {
      if (!old) return old;
      const items = Array.isArray(old) ? old : (old.items ?? []);
      const existing = items.find((i) => i.productId === product.id);
      const updatedItems = existing
        ? items.map((i) =>
            i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [...items, { productId: product.id, quantity: 1, product }];
      return Array.isArray(old)
        ? updatedItems
        : { ...old, items: updatedItems };
    });

    toast.success("Item added to cart!");

    try {
      await addToCart({ productId: product.id, quantity: 1 });
      qc.invalidateQueries({ queryKey: ["cart"] });
    } catch (err) {
      qc.invalidateQueries({ queryKey: ["cart"] });
      if (err.response?.status === 401) {
        toast.error("Please login first.");
        navigate("/login");
      } else toast.error("Failed to add to cart.");
    } finally {
      setAdding(false);
    }
  };

  const wishlisted = wishlistSet ? wishlistSet.has(product.id) : false;

  const wishlistMut = useMutation({
    mutationFn: () =>
      wishlisted
        ? removeFromWishlist(product.id)
        : addToWishlist({ productId: product.id }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist");
    },
    onError: (err) => {
      if (err.response?.status === 401) {
        toast.error("Please login first.");
        navigate("/login");
      } else toast.error("Failed to update wishlist.");
    },
  });

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }
    wishlistMut.mutate();
  };

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => navigate(`/product/${product.id}`)}
      className="relative flex flex-col cursor-pointer select-none overflow-hidden h-full
        bg-white rounded-[var(--radius-lg)] border border-[var(--color-border)] group
        hover:shadow-lg hover:border-[var(--color-sage)] transition-all duration-300
        transform-gpu"
      style={{
        opacity: sectionVisible ? (cardVisible ? 1 : 0) : 1,
        transform:
          sectionVisible && !cardVisible
            ? "translateY(12px)"
            : "translateY(0px)",
        transition:
          "opacity 420ms ease, transform 520ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease, border-color 300ms ease",
      }}
    >
      <ProductCardImage
        product={product}
        hov={hov}
        wishlisted={wishlisted}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        adding={adding}
        wishlistPending={wishlistMut.isPending}
      />
      <ProductCardInfo product={product} />
      <div className="px-2 sm:px-3 pb-3 sm:pb-4">
        <ProductCardActions onAddToCart={handleAddToCart} adding={adding} />
      </div>
    </div>
  );
});

export default ProductCard;
