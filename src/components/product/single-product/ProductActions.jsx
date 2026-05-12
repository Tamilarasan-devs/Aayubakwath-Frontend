import { ShoppingCart, Minus, Plus } from "lucide-react";

export default function ProductActions({
  qty,
  setQty,
  handleAddToCart,
  handleBuyNow,
  addMut,
}) {
  return (
    <div className="grid grid-cols-2 sm:flex items-center gap-2.5 sm:gap-3 mb-6 px-2 sm:px-0 sm:w-full">
      <div className="col-span-2 sm:col-span-1 flex items-center border border-[var(--color-border)] rounded-xl overflow-hidden bg-white sm:shrink-0">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="flex-1 sm:flex-none sm:w-10 h-12 flex text-[var(--color-text)] items-center justify-center hover:bg-black hover:text-white transition-colors border-r border-[var(--color-border)]"
        >
          <Minus size={14} />
        </button>
        <span className="flex-1 sm:flex-none sm:w-10 text-center text-base font-semibold">
          {qty}
        </span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="flex-1 sm:flex-none sm:w-10 h-12 flex items-center justify-center text-[var(--color-text)] hover:bg-black hover:text-white transition-colors border-l border-[var(--color-border)]"
        >
          <Plus size={14} />
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        disabled={addMut.isPending}
        className="min-w-0 h-12 sm:flex-1 bg-black text-white text-sm font-semibold tracking-[0.08em] sm:tracking-[0.15em] uppercase whitespace-nowrap hover:bg-[#829b1c] shadow-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2 rounded-xl"
      >
        <ShoppingCart size={15} />
        {addMut.isPending ? "Adding..." : "Add to Cart"}
      </button>
      <button
        onClick={handleBuyNow}
        disabled={addMut.isPending}
        className="min-w-0 h-12 sm:flex-1 border-2 border-[var(--color-text)] text-[var(--color-text)] bg-white text-sm font-semibold tracking-[0.08em] sm:tracking-[0.15em] uppercase whitespace-nowrap hover:bg-[var(--color-text)] hover:text-white transition-colors disabled:opacity-50 rounded-xl"
      >
        Buy Now
      </button>
    </div>
  );
}
