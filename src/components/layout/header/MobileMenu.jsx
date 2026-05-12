import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import {
  FaShoppingCart,
  FaHeart,
  FaUser,
} from "react-icons/fa";
import logo from "../../../assets/images/logo.jpg";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/aboutpage" },
  { label: "Shop", href: "/productListing" },
  { label: "Partnership", href: "/dealership" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function MobileMenu({
  isOpen,
  onClose,
  navigate,
  isActive,
  isLoggedIn,
  cartCount,
  wishlistCount,
  onLogout,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] bg-white flex flex-col lg:hidden overflow-y-auto"
        >
          <div className="flex items-center justify-between px-6 pt-5 pb-5 border-b border-[var(--color-border)]">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
                onClose();
              }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 overflow-hidden rounded-lg border border-[var(--color-border)] flex-shrink-0">
                <img
                  src={logo}
                  className="w-full h-full object-cover"
                  alt="Aayubakwath"
                />
              </div>
              <span className="font-display text-[19px] font-semibold text-[var(--color-text)]">
                Aayubakwath
              </span>
            </a>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-[var(--color-text-secondary)]
                hover:text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-6 pt-6 pb-4">
            {navLinks.map(({ label, href }, i) => {
              const active = isActive(href);
              return (
                <motion.a
                  key={href}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(href);
                    onClose();
                  }}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.04,
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                  className={`flex items-center justify-between py-4 border-b border-[var(--color-border)]
                    group transition-colors duration-200
                    ${active ? "text-[var(--color-text)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="font-body text-[11px] font-semibold tracking-[0.2em] uppercase
                      text-[var(--color-text-placeholder)] w-5"
                    >
                      0{i + 1}
                    </span>
                    <span className="font-display text-[22px] font-medium leading-tight">
                      {label}
                    </span>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-[var(--color-text-placeholder)] group-hover:text-[var(--color-sage)] transition-colors"
                  />
                </motion.a>
              );
            })}
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.25 }}
            className="px-6 py-5 border-t border-[var(--color-border)] bg-[var(--color-bg-soft)]"
          >
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                {
                  icon: <FaShoppingCart size={15} />,
                  label: "Cart",
                  href: "/cart",
                  badge: cartCount,
                },
                {
                  icon: <FaHeart size={15} />,
                  label: "Wishlist",
                  href: "/wishlist",
                  badge: wishlistCount,
                },
                {
                  icon: <FaUser size={15} />,
                  label: isLoggedIn ? "Profile" : "Login",
                  href: isLoggedIn ? "/profile" : "/login",
                  badge: null,
                },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.href);
                    onClose();
                  }}
                  className="relative flex flex-col items-center justify-center gap-2 py-4
                    border border-[var(--color-border)] bg-white rounded-lg text-[var(--color-text-secondary)]
                    hover:text-[var(--color-text)] hover:border-[var(--color-sage)] transition-all"
                >
                  {item.icon}
                  <span className="font-body text-[10px] font-semibold tracking-[0.12em] uppercase">
                    {item.label}
                  </span>
                  {item.badge > 0 && (
                    <span
                      className="absolute top-1.5 right-1.5 w-4 h-4 flex items-center justify-center
                      rounded-full bg-[var(--color-sage)] text-white text-[8px] font-semibold"
                    >
                      {item.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>
            {isLoggedIn && (
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full py-3 text-[11px] font-medium tracking-[0.1em] uppercase
                  text-[var(--color-terracotta)] border border-[var(--color-terracotta)]/20 bg-white rounded-lg
                  hover:bg-[var(--color-error-bg)] transition-colors"
              >
                Sign Out
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
