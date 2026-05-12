import React, { useRef, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { getProducts } from "../../../services/productService";
import { useQuery } from "@tanstack/react-query";

const searchPlaceholders = [
  "Joint Pain Relief",
  "Herbal Supplements",
  "Diabetes Care",
  "Heart Health",
  "Energy Boosters",
  "blood sugar",
];

export default function HeaderSearch() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const searchRef = useRef(null);

  useEffect(() => {
    const fn = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => {
    if (searchQuery) return undefined;

    const timer = window.setInterval(() => {
      setPlaceholderIndex((current) => {
        let next = Math.floor(Math.random() * searchPlaceholders.length);
        if (next === current) next = (next + 1) % searchPlaceholders.length;
        return next;
      });
    }, 2500);

    return () => window.clearInterval(timer);
  }, [searchQuery]);

  const { data: allProducts = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000,
  });

  const normalizeStringList = (value) => {
    if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (!trimmed) return [];
      if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
        try {
          const parsed = JSON.parse(trimmed);
          if (Array.isArray(parsed)) return parsed.map((v) => String(v).trim()).filter(Boolean);
        } catch {
          // ignore
        }
      }
      return trimmed.split(",").map((v) => v.trim()).filter(Boolean);
    }
    return [];
  };

  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || !searchFocused) return [];
    const q = searchQuery.toLowerCase().trim();
    const list = Array.isArray(allProducts) ? allProducts : [allProducts];
    return list
      .filter((p) => {
        const name = (p.productName || "").toLowerCase();
        const tags = normalizeStringList(p.productTags).map((t) => t.toLowerCase());
        return name.includes(q) || tags.some((t) => t.includes(q));
      })
      .slice(0, 8);
  }, [searchQuery, searchFocused, allProducts]);

  const getProductImage = (product) => {
    const image =
      product?.productImages?.[0] || product?.images?.[0] || product?.image;
    return typeof image === "string" ? image : image?.url;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/productListing?q=${encodeURIComponent(searchQuery.trim())}`,
      );
      setSearchQuery("");
      setSearchFocused(false);
    }
  };

  return (
    <div
      ref={searchRef}
      className="relative hidden min-w-[260px] max-w-[340px] flex-1 lg:block"
    >
      <form onSubmit={handleSearchSubmit}>
        <label
          className="relative flex h-11 cursor-text items-center gap-3 px-2 text-[var(--color-text-secondary)]
          transition-all duration-200"
        >
          <Search size={21} strokeWidth={1.9} className="shrink-0 text-[#6f6f6a]" />
          <div className="flex h-full min-w-0 flex-1 items-center overflow-hidden">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder={`Search ${searchPlaceholders[placeholderIndex]}`}
              className="w-full bg-transparent font-body text-[15px] font-medium text-[var(--color-text)] outline-none placeholder:text-[#a7a7a0]"
            />
          </div>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="shrink-0 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              <X size={14} />
            </button>
          )}
        </label>
      </form>
      <AnimatePresence>
        {searchFocused && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-xl)]"
          >
            {searchResults.map((product) => {
              const productImage = getProductImage(product);
              return (
                <button
                  key={product.id || product._id}
                  onClick={() => {
                    setSearchQuery("");
                    setSearchFocused(false);
                    navigate(`/product/${product.id || product._id}`);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[var(--color-bg-muted)]"
                >
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[var(--color-bg-soft)]">
                    {productImage ? (
                      <img
                        src={productImage}
                        alt={product.productName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-[var(--color-text-muted)]">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-body font-medium text-[var(--color-text)]">
                      {product.productName}
                    </p>
                    <p className="text-xs font-body font-semibold text-[var(--color-sage)]">
                      ₹{product.finalPrice}
                    </p>
                  </div>
                  <ChevronRight size={14} className="shrink-0 text-[var(--color-text-muted)]" />
                </button>
              );
            })}
            <button
              onClick={() => {
                if (searchQuery.trim()) {
                  navigate(
                    `/productListing?q=${encodeURIComponent(searchQuery.trim())}`,
                  );
                  setSearchQuery("");
                  setSearchFocused(false);
                }
              }}
              className="w-full border-t border-[var(--color-border)] px-4 py-2.5 text-xs font-body font-semibold text-[var(--color-sage)] transition-colors hover:bg-[var(--color-bg-muted)]"
            >
              {`View all results for "${searchQuery}"`}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
