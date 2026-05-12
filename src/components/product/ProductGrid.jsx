import React, { useMemo, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getWishlist } from "../../services/wishlistService";
import { getProducts } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { useAuth } from "../../hooks/useAuth";
import ProductCard from "../product/ProductCard";
import Chip from "./product-grid/Chip";
import FilterPanel from "./product-grid/FilterPanel";
import ProductGridHeader from "./product-grid/ProductGridHeader";
import ProductSkeleton from "./product-grid/ProductSkeleton";

const PRICE_RANGES = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500–₹1K", min: 500, max: 1000 },
  { label: "₹1K–₹2K", min: 1000, max: 2000 },
  { label: "₹2K+", min: 2000, max: Infinity },
];

export default function ProductGrid() {
  const { isAuthenticated } = useAuth();
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [priceIdx, setPriceIdx] = useState(0);
  const [forWhom, setForWhom] = useState("All");
  const [discountMin, setDiscountMin] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const {
    data: products = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 60000,
  });

  const { data: wishlistData } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    enabled: isAuthenticated,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const wishlistSet = useMemo(() => {
    const items = wishlistData?.data || [];
    return new Set(
      items.map((w) => w.productId || w.product?.id || w.product?._id),
    );
  }, [wishlistData]);

  const forWhomOptions = useMemo(() => {
    const s = new Set(["All"]);
    products.filter(Boolean).forEach((p) => {
      if (p.forWhom && p.forWhom !== "Not specified") s.add(p.forWhom);
    });
    return [...s];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const range = PRICE_RANGES[priceIdx];
    let list = products.filter((p) => {
      const price = parseFloat(p.finalPrice);
      const disc =
        p.price > 0
          ? Math.round(((p.price - p.finalPrice) / p.price) * 100)
          : 0;
      return (
        (category === "all" || p.categoryId === category) &&
        (forWhom === "All" || p.forWhom === forWhom) &&
        price >= range.min &&
        price < range.max &&
        disc >= discountMin
      );
    });
    if (sortBy === "price-asc")
      list = [...list].sort((a, b) => +a.finalPrice - +b.finalPrice);
    if (sortBy === "price-desc")
      list = [...list].sort((a, b) => +b.finalPrice - +a.finalPrice);
    if (sortBy === "discount")
      list = [...list].sort(
        (a, b) =>
          (b.price - b.finalPrice) / b.price -
          (a.price - a.finalPrice) / a.price,
      );
    if (sortBy === "newest") list = [...list].reverse();
    return list;
  }, [products, category, forWhom, priceIdx, discountMin, sortBy]);

  const activeFiltersCount =
    (category !== "all" ? 1 : 0) +
    (priceIdx !== 0 ? 1 : 0) +
    (forWhom !== "All" ? 1 : 0) +
    (discountMin !== 0 ? 1 : 0) +
    (sortBy !== "default" ? 1 : 0);

  const clearAll = useCallback(() => {
    setCategory("all");
    setSortBy("default");
    setPriceIdx(0);
    setForWhom("All");
    setDiscountMin(0);
  }, []);

  if (error)
    return (
      <p className="text-center text-(--color-terracotta) p-8 font-body">
        Failed to load products.
      </p>
    );

  return (
    <div>
      <div className="flex items-center justify-center gap-4 py-4">
        <div className="w-8 h-px bg-[var(--color-sage)]" />
        <p
          className="label whitespace-nowrap text-center"
          style={{
            fontSize: "clamp(1.25rem, 4vw, 2rem)",
            fontWeight: "500",
          }}
        >
          Our Products
        </p>
        <div className="w-8 h-px bg-[var(--color-sage)]" />
      </div>

      <ProductGridHeader
        sortBy={sortBy}
        setSortBy={setSortBy}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        activeFiltersCount={activeFiltersCount}
      />

      <FilterPanel
        showFilters={showFilters}
        category={category}
        setCategory={setCategory}
        priceIdx={priceIdx}
        setPriceIdx={setPriceIdx}
        forWhom={forWhom}
        setForWhom={setForWhom}
        discountMin={discountMin}
        setDiscountMin={setDiscountMin}
        categories={categories}
        forWhomOptions={forWhomOptions}
        activeFiltersCount={activeFiltersCount}
        onClearAll={clearAll}
      />

      {/* Category quick pills (always visible) */}
      {!showFilters && categories.length > 0 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-none mb-4 pb-0.5" >
          <Chip active={category === "all"} onClick={() => setCategory("all")}>
            All 
          </Chip>
          {categories
            .filter((c) => c.name?.trim())
            .map((c) => (
              <Chip
                key={c.id}
                active={category === c.id}
                onClick={() => setCategory(c.id)}
                
              >
                {c.name}
              </Chip>
            ))}
        </div>
      )}

      {/* Result count */}
      {!loading && (
        <p className="text-xs text-(--color-text-muted) font-medium mb-3">
          <span className="font-semibold text-(--color-text)">
            {filteredProducts.length}
          </span>{" "}
          products
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAll}
              className="ml-2 text-(--color-sage) hover:underline"
            >
              Clear filters
            </button>
          )}
        </p>
      )}

      {/* Grid */}
      {loading ? (
        <ProductSkeleton />
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-3xl mb-3">🔍</p>
          <p className="font-body text-(--color-text-secondary) text-sm mb-4">
            No products match your filters
          </p>
          <button onClick={clearAll} className="btn-primary">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {filteredProducts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.05,
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <ProductCard
                product={p}
                animDelay={i * 0.06}
                sectionVisible={true}
                wishlistSet={wishlistSet}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
