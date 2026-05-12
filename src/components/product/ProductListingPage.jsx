import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { getWishlist } from "../../services/wishlistService";
import { getProducts } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { useAuth } from "../../hooks/useAuth";
import ProductCard from "./ProductCard";
import Banner from "../layout/Banner";
import OfferScrollBar from "../layout/OfferScrollBar";
import FirstBanner from "../layout/banner/FirstBanner";
import FilterPanel from "./FilterPanel";
import cate1 from "../../assets/images/allCate/cate1.jpg";
import cate3 from "../../assets/images/allCate/cate2.jpg";
import cate2 from "../../assets/images/allCate/cate3.jpg";
import cate4 from "../../assets/images/allCate/cate4.jpg";
import cate5 from "../../assets/images/allCate/cate5.jpg";
import cate6 from "../../assets/images/allCate/cate6.jpg";
import { Search, X, SlidersHorizontal } from "lucide-react";

const FALLBACK_EMOJIS = ["🌿", "❤️", "🛡️", "🌱", "✨", "💊", "🔋", "🧘", "🧴", "🥣"];
const FALLBACK_IMAGES = [cate1, cate3, cate2, cate4, cate5, cate6];
const EMPTY_LIST = [];
const CATEGORY_NAME_OVERRIDES = {
  cardio: "Blood Cholesterol",
  metabolic: "Blood Sugar",
  mind: "Brain Tonic",
  daily: "General Health",
  energy: "Vitality",
};

const calcDiscount = (p, f) =>
  Math.round(((parseFloat(p) - parseFloat(f)) / parseFloat(p)) * 100);

const normalizeStringList = (value) => {
  if (Array.isArray(value)) {
    return value.map((v) => String(v).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.map((v) => String(v).trim()).filter(Boolean);
        }
      } catch {
        // Fall back to comma-separated parsing.
      }
    }
    return trimmed.split(",").map((v) => v.trim()).filter(Boolean);
  }
  return [];
};

const getCollectionName = (category) => {
  const byId = CATEGORY_NAME_OVERRIDES[category?.id];
  if (byId) return byId;

  const value = String(category?.name || "").toLowerCase();
  if (value.includes("cholesterol") || value.includes("heart")) return "Blood Cholesterol";
  if (value.includes("sugar") || value.includes("metabolic")) return "Blood Sugar";
  if (value.includes("brain") || value.includes("mind")) return "Brain Tonic";
  if (value.includes("general") || value.includes("daily")) return "General Health";
  if (value.includes("vitality") || value.includes("energy")) return "Vitality";
  return category?.name || "";
};

function SkeletonCard() {
  return (
    <div className="bg-white overflow-hidden border border-(--color-border) animate-pulse rounded-lg">
      <div className="w-full bg-(--color-bg-soft)" style={{ paddingBottom: "133.33%" }} />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-(--color-bg-muted) w-3/4 rounded" />
        <div className="h-3 bg-(--color-bg-muted) w-full rounded" />
      </div>
    </div>
  );
}

function EmptyState({ search, onClear }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <p className="text-4xl mb-4">🔍</p>
      <h3 className="display-heading text-(--color-text) mb-2" style={{ fontSize: "1.8rem" }}>
        No products found
      </h3>
      <p className="font-body text-(--color-text-secondary) text-sm mb-6">
        {search ? `No results for "${search}"` : "Try adjusting your filters"}
      </p>
      <button onClick={onClear} className="btn-primary">Clear filters</button>
    </div>
  );
}

export default function ProductListingPage() {
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState("default");
  const [offerTag, setOfferTag] = useState("All");
  const [priceIdx, setPriceIdx] = useState(0);
  const [forWhom, setForWhom] = useState("All");
  const [discountMin, setDiscountMin] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const { data: rawProducts, isLoading: loading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const products = useMemo(() => {
    const source = rawProducts ?? EMPTY_LIST;
    return Array.isArray(source) ? source : [source];
  }, [rawProducts]);

  const { data: wishlistData } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    enabled: isAuthenticated,
  });
  const wishlistSet = useMemo(() => {
    const items = wishlistData?.data || [];
    return new Set(items.map((w) => w.productId || w.product?.id || w.product?._id));
  }, [wishlistData]);

  const { data: rawCategories = EMPTY_LIST } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  useEffect(() => {
    const t = setTimeout(() => {
      const catParam = searchParams.get("category");
      if (catParam) setCategory(catParam);

      const qParam = searchParams.get("q");
      if (qParam !== null) setSearch(qParam);
    }, 0);

    return () => clearTimeout(t);
  }, [searchParams]);

  const computedCategories = useMemo(() => {
    const allItem = { id: "all", name: "All Products", emoji: "🌿", img: cate6, count: products.length };
    const dynamic = (rawCategories || []).map((cat, idx) => ({
      id: cat.id,
      name: getCollectionName(cat),
      emoji: FALLBACK_EMOJIS[idx % FALLBACK_EMOJIS.length],
      img: cat.image || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length],
      count: products.filter((p) => p.categoryId === cat.id).length,
    }));
    return [allItem, ...dynamic];
  }, [rawCategories, products]);

  const offerTags = useMemo(() => {
    const s = new Set(["All"]);
    products.filter(Boolean).forEach((p) => {
      normalizeStringList(p.offerTags).forEach((t) => s.add(t));
    });
    return [...s];
  }, [products]);

  const forWhomOptions = useMemo(() => {
    const s = new Set(["All"]);
    products.filter(Boolean).forEach((p) => {
      if (p.forWhom && p.forWhom !== "Not specified") s.add(p.forWhom);
    });
    return [...s];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const range = [
      { label: "All Prices", min: 0, max: Infinity },
      { label: "Under ₹500", min: 0, max: 500 },
      { label: "₹500–₹1K", min: 500, max: 1000 },
      { label: "₹1K–₹2K", min: 1000, max: 2000 },
      { label: "₹2K+", min: 2000, max: Infinity },
    ][priceIdx];
    let list = products.filter((p) => {
      const matchCat = category === "all" || p.categoryId === category;
      const q = search.toLowerCase();
      const productTags = normalizeStringList(p.productTags);
      const offerTagList = normalizeStringList(p.offerTags);
      const matchQ = !q || p.productName.toLowerCase().includes(q) || productTags.some((t) => t.toLowerCase().includes(q));
      const matchTag = offerTag === "All" || offerTagList.includes(offerTag);
      const price = parseFloat(p.finalPrice);
      const matchPrice = price >= range.min && price < range.max;
      const matchForWhom = forWhom === "All" || p.forWhom === forWhom;
      const disc = p.price > 0 ? Math.round(((p.price - p.finalPrice) / p.price) * 100) : 0;
      const matchDiscount = disc >= discountMin;
      return matchCat && matchQ && matchTag && matchPrice && matchForWhom && matchDiscount;
    });
    if (sortBy === "price-asc") list = [...list].sort((a, b) => +a.finalPrice - +b.finalPrice);
    if (sortBy === "price-desc") list = [...list].sort((a, b) => +b.finalPrice - +a.finalPrice);
    if (sortBy === "discount") list = [...list].sort((a, b) => calcDiscount(b.price, b.finalPrice) - calcDiscount(a.price, a.finalPrice));
    if (sortBy === "newest") list = [...list].reverse();
    return list;
  }, [products, category, search, offerTag, sortBy, priceIdx, forWhom, discountMin]);

  const activeFiltersCount =
    (category !== "all" ? 1 : 0) +
    (priceIdx !== 0 ? 1 : 0) +
    (forWhom !== "All" ? 1 : 0) +
    (discountMin !== 0 ? 1 : 0) +
    (offerTag !== "All" ? 1 : 0) +
    (sortBy !== "default" ? 1 : 0);

  const activeCategoryName = computedCategories.find((c) => c.id === category)?.name ?? "All Products";

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setOfferTag("All");
    setSortBy("default");
    setPriceIdx(0);
    setForWhom("All");
    setDiscountMin(0);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full mb-0"><Banner /></div>
      <div className="border-b border-(--color-border)"><OfferScrollBar /></div>
      <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-6 sm:py-10"><FirstBanner /></div>

      {/* Sticky filter bar */}
      <div className="sticky top-0 z-30 bg-white/92 backdrop-blur-xl border-b border-(--color-border)">
        <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-3.5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search - Left Side */}
            <div className="flex-1 w-full max-w-md">
              <label className="flex items-center gap-3 w-full border border-(--color-border) bg-gray-50/50 px-4 py-2.5 cursor-text rounded-xl focus-within:border-black focus-within:bg-white focus-within:ring-1 focus-within:ring-black transition-all duration-300 group">
                <Search size={16} className="text-(--color-text-muted) group-focus-within:text-black transition-colors shrink-0" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 text-sm font-medium bg-transparent text-(--color-text) placeholder:text-(--color-text-placeholder) outline-none"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="shrink-0 text-(--color-text-muted) hover:text-black transition-colors">
                    <X size={14} />
                  </button>
                )}
              </label>
            </div>

            {/* Actions - Right Side */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Filters toggle */}
              <button
                onClick={() => setShowFilters((v) => !v)}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-xl border text-[11px] font-bold tracking-[0.05em] uppercase transition-all duration-300
                  ${showFilters || activeFiltersCount > 0
                    ? "bg-black text-white border-black shadow-lg shadow-black/10"
                    : "bg-white text-(--color-text-secondary) border-(--color-border) hover:border-black hover:text-black"}`}
              >
                <SlidersHorizontal size={14} className={showFilters ? "animate-pulse" : ""} />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[10px] font-bold leading-none ml-1">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              <div className="relative flex-1 md:flex-none min-w-[140px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none font-bold text-[11px] tracking-[0.05em] uppercase border border-(--color-border) bg-white px-5 py-2.5 outline-none text-(--color-text) cursor-pointer hover:border-black transition-all duration-300 rounded-xl"
                >
                  <option value="default">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="discount">Best Discount</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-(--color-text-muted)">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Offer tags */}
          {offerTags.length > 1 && (
            <div className="flex items-center gap-2 mt-3 overflow-x-auto scrollbar-none">
              <span className="label text-(--color-text-muted) shrink-0" style={{ fontSize: ".7rem" }}>Offers:</span>
              {offerTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setOfferTag(tag)}
                  className={`shrink-0 px-3 py-1 font-semibold text-[.7rem] tracking-[0.1em] uppercase border transition-all rounded-md
                    ${offerTag === tag ? "bg-black text-white border-black" : "bg-transparent text-(--color-text-secondary) border-(--color-border) hover:border-black hover:text-black"}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          <FilterPanel
            showFilters={showFilters}
            priceIdx={priceIdx}
            setPriceIdx={setPriceIdx}
            forWhom={forWhom}
            setForWhom={setForWhom}
            discountMin={discountMin}
            setDiscountMin={setDiscountMin}
            forWhomOptions={forWhomOptions}
            activeFiltersCount={activeFiltersCount}
            onClearAll={clearFilters}
            computedCategories={computedCategories}
            category={category}
            setCategory={setCategory}
          />
        </div>
      </div>

      <AnimatePresence>
        {category !== "all" && (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-(--color-bg-soft) border-b border-(--color-border) overflow-hidden"
            style={{ height: 140 }}
          >
            <div className="max-w-[1400px] mx-auto px-3 lg:px-4 h-full flex items-end pb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-6 h-px bg-(--color-sage)" />
                  <p className="label text-(--color-text-muted)" style={{ fontSize: "0.55rem" }}>Browsing</p>
                </div>
                <h1 className="display-heading text-(--color-text)" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
                  {activeCategoryName}
                </h1>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-8 sm:py-10 pb-12">
        {category === "all" && (
          <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center gap-4 py-4">
          <div className="w-8 h-px bg-[var(--color-sage)]" />
          <p
            className="label whitespace-nowrap"
            style={{ fontSize: "clamp(1.25rem, 4vw, 2rem)", fontWeight: "500" }}
          >
            Browse
          </p>
          <div className="w-8 h-px bg-[var(--color-sage)]" />
        </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
          {/* <div>
            <h1 className="display-heading text-(--color-text)" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
              {category === "all" ? "All Products" : category}
            </h1>
          </div> */}
          <span className="font-body text-sm text-(--color-text-secondary) pb-1">
            {/* <span className="font-semibold text-(--color-text)">{filteredProducts.length}</span> premium products */}
            {activeFiltersCount > 0 && (
              <button 
                onClick={clearFilters} 
                className="ml-3 text-(--color-sage) hover:text-(--color-sage-dark) font-bold text-xs uppercase tracking-wider transition-colors border-b border-(--color-sage)/30"
              >
                Clear all
              </button>
            )}
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredProducts.length === 0 ? (
          <EmptyState search={search} onClear={clearFilters} />
        ) : (
          <motion.div
            key={`${category}-${offerTag}-${sortBy}`}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.filter(Boolean).map((product, idx) => (
                <motion.div
                  key={product.id || idx}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: idx * 0.03, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProductCard product={product} animDelay={idx * 0.07} sectionVisible={true} wishlistSet={wishlistSet} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
