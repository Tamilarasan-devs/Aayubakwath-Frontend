import { motion } from "framer-motion";

export default function ProductStickyBar({
  pack,
  product,
  handleAddToCart,
  handleBuyNow,
  addMut,
}) {

  const price = pack?.price ?? parseFloat(product?.finalPrice || 0);
  const orig = pack?.orig ?? parseFloat(product?.price || 0);

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[var(--color-border)] sm:hidden pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex items-center gap-2.5 p-3">
        <div className="flex-1">
          <span className="text-lg tracking-tight font-semibold">
            ₹{price.toLocaleString()}
          </span>
          {orig > price && (
            <span className="text-xs text-[var(--color-text-placeholder)] line-through ml-2">
              ₹{orig.toLocaleString()}
            </span>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          disabled={addMut.isPending}
          className="flex-1 h-11 bg-black text-white hover:bg-[#829b1c] transition-colors text-[13px] font-semibold tracking-[0.08em] uppercase whitespace-nowrap disabled:opacity-50 rounded-lg shadow-sm"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          disabled={addMut.isPending}
          className="flex-1 h-11 bg-[var(--color-sage)] text-white text-[13px] font-semibold tracking-[0.08em] uppercase whitespace-nowrap disabled:opacity-50 rounded-lg"
        >
          Buy Now
        </button>
      </div>
    </motion.div>
  );
}
