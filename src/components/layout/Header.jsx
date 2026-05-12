import logo from "../../assets/images/logo.jpg";
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser, FaTruck } from "react-icons/fa";
import { Menu, Search, X, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../services/cartService";
import { getWishlist } from "../../services/wishlistService";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { getAnnouncements } from "../../services/announcementService";
import { useAuth } from "../../hooks/useAuth";
import AnnouncementBar from "./header/AnnouncementBar";
import CartPopup from "./header/CartPopup";
import { mapCartPreviewItems } from "./header/cartPreviewUtils";
import HeaderSearch from "./header/HeaderSearch";
import MobileMenu from "./header/MobileMenu";
import cardiacBottle from "../../assets/images/raw/Blood cholesterol.png";
import diabeticBottle from "../../assets/images/raw/Blood sugar.png";
import vitalityBottle from "../../assets/images/raw/Vitality.png";
import generalBottle from "../../assets/images/raw/General health.png";
import brainBottle from "../../assets/images/raw/Brain Tonic.png";
import { getProducts } from "../../services/productService";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/aboutpage" },
  { label: "Shop", href: "/productListing" },
  { label: "Partnership", href: "/dealership" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const BadgeCount = ({ n }) => (
  <span
    className="absolute -top-1 -right-1.5 min-w-[16px] h-4 flex items-center justify-center
    rounded-full bg-[var(--color-sage)] text-white font-semibold text-[9px] leading-none"
  >
    {n}
  </span>
);

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [shopTop, setShopTop] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const mobileSearchRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef(null);
  const headerRef = useRef(null);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target))
        setDropdown(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setMobileOpen(false);
      setCartOpen(false);
      setShopOpen(false);
      setMobileSearchOpen(false);
      setMobileSearchQuery("");
    }, 0);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
      if (e.key === "Escape") setShopOpen(false);
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, cartOpen]);

  useEffect(() => {
    if (mobileSearchOpen && mobileSearchRef.current) {
      mobileSearchRef.current.focus();
    }
  }, [mobileSearchOpen]);

  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    retry: false,
    enabled: isAuthenticated,
  });
  const cartCount =
    cartData?.data?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const cartItems = mapCartPreviewItems(cartData);
  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const { data: wishlistData } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    retry: false,
    enabled: isAuthenticated,
  });
  const wishlistCount = wishlistData?.data?.length || 0;

  const { data: announcements = [] } = useQuery({
    queryKey: ["announcements"],
    queryFn: getAnnouncements,
  });

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    setDropdown(false);
    navigate("/login");
  };

  const mobileSearchResults = (() => {
    if (!mobileSearchQuery.trim()) return [];
    const q = mobileSearchQuery.toLowerCase().trim();
    const list = Array.isArray(products) ? products : [];
    return list
      .filter((p) => {
        const name = (p.productName || "").toLowerCase();
        const tags = normalizeStringList(p.productTags).map((t) => t.toLowerCase());
        return name.includes(q) || tags.some((t) => t.includes(q));
      })
      .slice(0, 6);
  })();

  const getProductImage = (product) => {
    const image =
      product?.productImages?.[0] || product?.images?.[0] || product?.image;
    return typeof image === "string" ? image : image?.url;
  };

  const handleMobileSearchSubmit = (e) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      navigate(
        `/productListing?q=${encodeURIComponent(mobileSearchQuery.trim())}`,
      );
      setMobileSearchQuery("");
      setMobileSearchOpen(false);
    }
  };

  const headerBg = scrolled
    ? "bg-white/95 border-b border-[var(--color-border)] shadow-[0_10px_30px_rgba(17,24,39,0.08)] backdrop-blur-xl"
    : "bg-white border-b border-[var(--color-border)]";

  const syncShopTop = () => {
    const el = headerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setShopTop(Math.round(rect.bottom + 10));
  };

  const shopMenuItems = [
    {
      image: cardiacBottle,
      eyebrow: "Cardiac Support",
      cta: "Heart Care",
      q: "cholesterol",
      preferredNames: ["Blood Cholesterol Balance", "Blood Cholesterol"],
      productHints: ["blood cholesterol balance", "blood cholesterol", "cholesterol"],
    },
    {
      image: diabeticBottle,
      eyebrow: "Diabetic Support",
      cta: "Sugar Care",
      q: "sugar",
      preferredNames: ["Blood Sugar", "Blood Sugar Balance"],
      productHints: ["blood sugar", "blood sugar balance"],
    },
    {
      image: vitalityBottle,
      eyebrow: "Energy & Stamina",
      cta: "Vitality",
      q: "vitality",
      preferredNames: ["Vitality Power Plus", "Vitality Support", "Vitality"],
      productHints: ["vitality power plus", "vitality support", "vitality"],
    },
    {
      image: generalBottle,
      eyebrow: "Everyday Care",
      cta: "General Wellness",
      q: "general health",
      preferredNames: ["General Health", "Daily Herbal Care", "Herbal Detox"],
      productHints: ["general health", "daily herbal care", "herbal detox"],
    },
    {
      image: brainBottle,
      eyebrow: "Cognitive Performance",
      cta: "Brain Tonic",
      q: "brain tonic",
      preferredNames: ["Brain Tonic", "Memory Focus", "Brain"],
      productHints: ["brain tonic", "brain"],
    },
  ];

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

	  const handleShopMenuClick = (item) => {
	    const list = Array.isArray(products) ? products : [];
	    const preferred = (item.preferredNames || []).map((n) =>
	      String(n || "").toLowerCase().trim(),
	    );
    const exactMatch = preferred.length
      ? list.find((p) =>
          preferred.includes(String(p?.productName || "").toLowerCase().trim()),
        )
      : null;

    const normalizedHints = (item.productHints || []).map((hint) =>
      String(hint).toLowerCase(),
    );

    const matchedByHints = normalizedHints.reduce((found, hint) => {
      if (found) return found;
      return list.find((product) => {
        const searchableParts = [
          product?.productName,
          product?.forWhom,
          ...(normalizeStringList(product?.productTags) || []),
          ...(normalizeStringList(product?.offerTags) || []),
        ]
          .map((part) => String(part || "").toLowerCase())
          .filter(Boolean);

        return searchableParts.some((part) => part.includes(hint));
      });
    }, null);

    const matchedProduct = exactMatch || matchedByHints;
    const matchedProductId = matchedProduct?.id || matchedProduct?._id;

    setShopOpen(false);
	    if (matchedProductId) {
	      navigate(`/product/${matchedProductId}`);
	      return;
	    }
	    navigate(`/productListing?q=${encodeURIComponent(item.q)}`);
	  };

  return (
    <>
      <AnnouncementBar announcements={announcements} />

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${headerBg}`}
        ref={headerRef}
      >
        <div className="mx-auto flex h-[82px] max-w-[1560px] items-center gap-3 px-4 sm:h-[86px] sm:px-8 lg:px-10">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            className="group flex shrink-0 items-center gap-4"
          >
            <div
              className="flex h-15 w-15 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#ece6dc]
              bg-white p-1 shadow-[0_2px_12px_rgba(17,24,39,0.06)] transition-colors duration-300 group-hover:border-[var(--color-sage)]"
            >
              <img
                src={logo}
                className="w-full h-full object-cover"
                alt="Aayubakwath"
              />
            </div>
            <span
              className="hidden font-display text-[38px] font-semibold tracking-[-0.045em] text-[var(--color-text)]
              transition-colors duration-300 group-hover:text-[var(--color-sage)] sm:block"
            >
              Aayubakwath
            </span>
          </a>

          <div className="hidden min-w-0 flex-1 items-center gap-8 lg:flex relative">
            <nav className="flex flex-1 items-center justify-center gap-3 xl:gap-6">
              {navLinks.map(({ label, href }) => {
                const active = isActive(href);

                if (label === "Shop") {
                  return (
                    <div
                      key={href}
                      className="relative"
                      onMouseEnter={() => {
                        syncShopTop();
                        setShopOpen(true);
                      }}
                      onMouseLeave={() => setShopOpen(false)}
                    >
                      <a
                        href={href}
                        onClick={(e) => {
                          e.preventDefault();
                          setShopOpen(false);
                          navigate(href);
                        }}
                        className={`relative px-2 py-2 font-body text-[15px] xl:text-[16px] font-semibold transition-colors duration-200 xl:px-2.5
                          ${
                            active
                              ? "text-[var(--color-text)]"
                              : "text-[var(--color-text)]/92 hover:text-[var(--color-sage)]"
                          }`}
                        aria-haspopup="menu"
                        aria-expanded={shopOpen}
                        onFocus={() => {
                          syncShopTop();
                          setShopOpen(true);
                        }}
                      >
                        {label}
                        {active && (
                          <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[var(--color-sage)]" />
                        )}
                      </a>

                      <AnimatePresence>
                        {shopOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.99 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.99 }}
                            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                            style={{ top: shopTop || 96 }}
                            className="fixed left-1/2 z-50 w-[min(1200px,calc(100vw-3rem))] -translate-x-1/2"
                            role="menu"
                          >
                            <div className="rounded-3xl bg-gradient-to-r from-[rgba(130,155,28,0.35)] via-[rgba(17,24,39,0.12)] to-[rgba(130,155,28,0.35)] p-[1px] shadow-[0_30px_90px_-40px_rgba(17,24,39,0.45)]">
                              <div className="overflow-hidden rounded-[calc(1.5rem-1px)] border border-white/60 bg-white">
                                <div className="px-7 py-7">
                                  <div className="grid grid-cols-5 gap-7">
                                {shopMenuItems.map((item) => (
                                  <button
                                    key={item.cta}
                                    type="button"
                                    onClick={() => {
                                      handleShopMenuClick(item);
                                    }}
                                    className="group flex flex-col items-center text-center"
                                    role="menuitem"
                                  >
                                    <div className="flex h-[170px] w-full items-end justify-center overflow-hidden px-2 pt-3 pb-2">
                                      <img
                                        src={item.image}
                                        alt={item.cta}
                                        loading="lazy"
                                        decoding="async"
                                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                                      />
                                    </div>

                                    <p className="mt-4 flex h-[2.75rem] items-start justify-center font-body text-[11px] font-semibold uppercase tracking-[0.32em] text-[#40443a]">
                                      {item.eyebrow}
                                    </p>

                                    <span className="mt-4 inline-flex h-12 min-w-[180px] items-center justify-center gap-3 rounded-full border border-[#b9b9b9] bg-white px-7 font-body text-[13px] font-bold text-black transition-all duration-300 group-hover:border-[var(--color-sage)] group-hover:bg-[var(--color-sage-light)] group-hover:text-[var(--color-sage-dark)]">
                                      {item.cta}
                                      <span className="text-black/70 transition-transform duration-300 group-hover:translate-x-0.5">
                                        ›
                                      </span>
                                      </span>
                                    </button>
                                  ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <a
                    key={href}
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(href);
                    }}
                    className={`relative px-2 py-2 font-body text-[15px] xl:text-[16px] font-semibold transition-colors duration-200 xl:px-2.5
                      ${
                        active
                          ? "text-[var(--color-text)]"
                          : "text-[var(--color-text)]/92 hover:text-[var(--color-sage)]"
                      }`}
                  >
                    {label}
                    {active && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[var(--color-sage)]" />
                    )}
                  </a>
                );
              })}
            </nav>

            <div className="ml-auto flex min-w-0 items-center gap-4 xl:gap-7">
              <HeaderSearch />
              <a
                href="/wishlist"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/wishlist");
                }}
                aria-label="Wishlist"
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-text-secondary)]
                  transition-colors duration-200 hover:text-[var(--color-text)]"
              >
                <FaHeart size={19} />
                {wishlistCount > 0 && <BadgeCount n={wishlistCount} />}
              </a>

              <a
                href="/trackorder"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/trackorder");
                }}
                aria-label="Track order"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-text-secondary)]
                  transition-colors duration-200 hover:text-[var(--color-text)]"
              >
                <FaTruck size={18} />
              </a>

              <div className="relative" ref={dropRef}>
                <button
                  onClick={() => setDropdown((v) => !v)}
                  aria-label="Account"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-text-secondary)]
                    transition-colors duration-200 hover:text-[var(--color-text)]"
                >
                  <FaUser size={17} />
                </button>
                <AnimatePresence>
                  {dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 top-[calc(100%+8px)] z-50 w-56 overflow-hidden rounded-xl border border-[var(--color-border)]
                        bg-white py-1.5 text-left shadow-[var(--shadow-xl)]"
                    >
                      {isAuthenticated ? (
                        <>
                          <a
                            href="/profile"
                            onClick={(e) => {
                              e.preventDefault();
                              setDropdown(false);
                              navigate("/profile");
                            }}
                            className="flex items-center gap-2.5 px-4 py-3 text-[13px] font-medium text-[var(--color-text-secondary)]
                              transition-colors hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text)]"
                          >
                            <FaUser size={12} className="text-[var(--color-text-muted)]" /> My Profile
                          </a>
                          <a
                            href="/wishlist"
                            onClick={(e) => {
                              e.preventDefault();
                              setDropdown(false);
                              navigate("/wishlist");
                            }}
                            className="flex items-center gap-2.5 px-4 py-3 text-[13px] font-medium text-[var(--color-text-secondary)]
                              transition-colors hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text)]"
                          >
                            <FaHeart size={12} className="text-[var(--color-text-muted)]" /> Wishlist
                          </a>
                          <div className="mx-3 my-1 h-px bg-[var(--color-border)]" />
                          <button
                            onClick={handleLogout}
                            className="w-full text-left flex items-center gap-2.5 px-4 py-3 text-[13px]
                              font-medium text-[var(--color-terracotta)] hover:bg-[var(--color-error-bg)] transition-colors"
                          >
                            Sign Out
                          </button>
                        </>
                      ) : (
                        <>
                          <a
                            href="/login"
                            onClick={(e) => {
                              e.preventDefault();
                              setDropdown(false);
                              navigate("/login");
                            }}
                            className="block px-4 py-3 text-[13px] font-medium text-[var(--color-text-secondary)]
                              hover:bg-[var(--color-bg-muted)] transition-colors"
                          >
                            Sign In
                          </a>
                          <a
                            href="/register"
                            onClick={(e) => {
                              e.preventDefault();
                              setDropdown(false);
                              navigate("/register");
                            }}
                            className="block px-4 py-3 text-[13px] font-medium text-[var(--color-text-secondary)]
                              hover:bg-[var(--color-bg-muted)] transition-colors"
                          >
                            Create Account
                          </a>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => setCartOpen(true)}
                aria-label="Cart"
                className="relative ml-1 flex h-14 items-center gap-2.5 rounded-full bg-black px-8 text-[13px] font-semibold uppercase
                  tracking-[0.06em] text-white transition-all duration-200 hover:bg-[#1f1f1f]"
              >
                <FaShoppingCart size={17} />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="rounded-full bg-white/12 px-2 py-0.5 text-[10px] font-semibold text-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-1 sm:gap-1.5 lg:hidden">
            <button
              onClick={() => setMobileSearchOpen((v) => !v)}
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-text-secondary)]
                transition-all duration-200 hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text)]"
            >
              <Search size={16} strokeWidth={2} />
            </button>

            <a
              href="/wishlist"
              onClick={(e) => {
                e.preventDefault();
                navigate("/wishlist");
              }}
              aria-label="Wishlist"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-text-secondary)]
                transition-all duration-200 hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text)]"
            >
              <FaHeart size={14} />
              {wishlistCount > 0 && <BadgeCount n={wishlistCount} />}
            </a>

            <button
              onClick={() => setCartOpen(true)}
              aria-label="Cart"
              className="relative flex h-9 w-9 items-center justify-center rounded-full
                text-[var(--color-text-secondary)] transition-all duration-200 hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text)]"
            >
              <FaShoppingCart size={14} />
              {cartCount > 0 && <BadgeCount n={cartCount} />}
            </button>

            <a
              href={isAuthenticated ? "/profile" : "/login"}
              onClick={(e) => {
                e.preventDefault();
                navigate(isAuthenticated ? "/profile" : "/login");
              }}
              aria-label="Account"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-text-secondary)]
                transition-all duration-200 hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text)]"
            >
              <FaUser size={13} />
            </a>

            <button
              className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-text-secondary)]
              transition-all duration-200 hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text)]"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile search overlay */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-0 right-0 top-0 z-[70] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] lg:hidden"
          >
            <div className="px-4 py-3">
              <form
                onSubmit={handleMobileSearchSubmit}
                className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-4 py-2.5"
              >
                <Search size={18} strokeWidth={2} className="shrink-0 text-[var(--color-text-muted)]" />
                <input
                  ref={mobileSearchRef}
                  value={mobileSearchQuery}
                  onChange={(e) => setMobileSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-transparent font-body text-[15px] font-medium text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-placeholder)]"
                />
                {mobileSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setMobileSearchQuery("")}
                    className="shrink-0 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  >
                    <X size={16} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setMobileSearchOpen(false);
                    setMobileSearchQuery("");
                  }}
                  className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                >
                  Cancel
                </button>
              </form>
            </div>

            {mobileSearchResults.length > 0 && (
              <div className="max-h-[60vh] overflow-y-auto border-t border-[var(--color-border)]">
                {mobileSearchResults.map((product) => {
                  const productImage = getProductImage(product);
                  return (
                    <button
                      key={product.id || product._id}
                      onClick={() => {
                        setMobileSearchQuery("");
                        setMobileSearchOpen(false);
                        navigate(`/product/${product.id || product._id}`);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[var(--color-bg-muted)] border-b border-[var(--color-border)] last:border-b-0"
                    >
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[var(--color-bg-soft)]">
                        {productImage ? (
                          <img
                            src={productImage}
                            alt={product.productName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-[var(--color-text-muted)]">
                            No img
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-body font-semibold text-[var(--color-text)]">
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
                    if (mobileSearchQuery.trim()) {
                      navigate(
                        `/productListing?q=${encodeURIComponent(mobileSearchQuery.trim())}`,
                      );
                      setMobileSearchQuery("");
                      setMobileSearchOpen(false);
                    }
                  }}
                  className="w-full px-4 py-3 text-xs font-body font-semibold text-[var(--color-sage)] transition-colors hover:bg-[var(--color-bg-muted)]"
                >
                  {`View all results for "${mobileSearchQuery}"`}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navigate={navigate}
        isActive={isActive}
        isLoggedIn={isAuthenticated}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onLogout={handleLogout}
      />

      <CartPopup
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        isAuthenticated={isAuthenticated}
        cartItems={cartItems}
        cartCount={cartCount}
        subtotal={cartSubtotal}
        navigate={navigate}
      />
    </>
  );
}
