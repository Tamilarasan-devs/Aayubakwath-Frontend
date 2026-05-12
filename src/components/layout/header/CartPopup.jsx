import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";

const formatCurrency = (value) =>
  `₹${Math.round(Number(value) || 0).toLocaleString("en-IN")}`;

export default function CartPopup({
  isOpen,
  onClose,
  isAuthenticated,
  cartItems,
  cartCount,
  subtotal,
  navigate,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-black/30 backdrop-blur-[2px]"
          onClick={onClose}
        >
          <div className="flex min-h-full justify-end">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex h-screen w-full max-w-[440px] flex-col overflow-hidden border-l border-[var(--color-border)]
                bg-white shadow-[-24px_0_80px_rgba(15,23,42,0.18)]"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--color-border)] bg-white px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full
                    bg-[var(--color-bg-soft)] text-[var(--color-sage)]"
                  >
                    <FaShoppingCart size={17} />
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold text-[var(--color-text)]">
                      Your Cart
                    </p>
                    <p className="text-[12px] font-medium text-[var(--color-text-muted)]">
                      {cartCount} item{cartCount === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  aria-label="Close cart popup"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-text-muted)]
                    transition-colors hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text)]"
                >
                  <X size={18} />
                </button>
              </div>

              {!isAuthenticated ? (
                <div className="flex flex-1 flex-col justify-center px-5 py-8 text-center sm:px-6">
                  <p className="text-[17px] font-semibold text-[var(--color-text)]">
                    Sign in to view your cart
                  </p>
                  <p className="mt-2 text-[13px] leading-6 text-[var(--color-text-secondary)]">
                    Your saved cart items and checkout will appear here after login.
                  </p>
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => {
                        onClose();
                        navigate("/login");
                      }}
                      className="flex-1 rounded-full bg-black px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#1f1f1f]"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        navigate("/productListing");
                      }}
                      className="flex-1 rounded-full border border-black px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-black transition-colors hover:bg-black hover:text-white"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              ) : cartItems.length === 0 ? (
                <div className="flex flex-1 flex-col justify-center px-5 py-8 text-center sm:px-6">
                  <p className="text-[17px] font-semibold text-[var(--color-text)]">
                    Your cart is empty
                  </p>
                  <p className="mt-2 text-[13px] leading-6 text-[var(--color-text-secondary)]">
                    Add a few products and they’ll show up here for quick checkout.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      navigate("/productListing");
                    }}
                    className="mt-6 rounded-full bg-black px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#1f1f1f]"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
                    <div className="space-y-4">
                      {cartItems.slice(0, 4).map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            onClose();
                            navigate(`/product/${item.productId}`);
                          }}
                          className="flex w-full items-center gap-3 rounded-2xl border border-[var(--color-border)] p-3 text-left transition-colors hover:bg-[var(--color-bg-soft)]"
                        >
                          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[var(--color-bg-soft)]">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-contain p-2"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="line-clamp-2 text-[14px] font-semibold leading-5 text-[var(--color-text)]">
                              {item.name}
                            </p>
                            <p className="mt-1 text-[12px] font-medium text-[var(--color-text-muted)]">
                              Qty: {item.quantity}
                            </p>
                            <p className="mt-2 text-[14px] font-semibold text-[var(--color-text)]">
                              {formatCurrency(item.price)}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="sticky bottom-0 border-t border-[var(--color-border)] bg-[var(--color-bg-soft)] px-5 py-4 sm:px-6">
                    <div className="flex items-center justify-between text-[14px] font-medium text-[var(--color-text-secondary)]">
                      <span>Subtotal</span>
                      <span className="text-[18px] font-semibold text-[var(--color-text)]">
                        {formatCurrency(subtotal)}
                      </span>
                    </div>

                    {cartItems.length > 4 && (
                      <p className="mt-2 text-[11px] font-medium tracking-[0.03em] text-[var(--color-text-muted)]">
                        +{cartItems.length - 4} more item
                        {cartItems.length - 4 === 1 ? "" : "s"} in your cart
                      </p>
                    )}

                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => {
                          onClose();
                          navigate("/cart");
                        }}
                        className="flex-1 rounded-full border border-black px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-black transition-colors hover:bg-black hover:text-white"
                      >
                        View Cart
                      </button>
                      <button
                        onClick={() => {
                          onClose();
                          navigate("/checkout");
                        }}
                        className="flex-1 rounded-full bg-black px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#1f1f1f]"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
