export default function ProductBreadcrumb({ productName, navigate }) {
  return (
    <div className="border-b border-[var(--color-border)] bg-white">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-[var(--color-text-muted)] font-semibold">
            <button
              onClick={() => navigate("/")}
              className="hover:text-[var(--color-text)] transition-colors"
            >
              Home
            </button>
            <span className="w-1 h-1 bg-[var(--color-border)]" />
            <button
              onClick={() => navigate("/products")}
              className="hover:text-[var(--color-text)] transition-colors"
            >
              Products
            </button>
            <span className="w-1 h-1 bg-[var(--color-border)]" />
            <span className="text-[var(--color-text)] truncate max-w-[200px]">
              {productName}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-[var(--color-text-muted)] font-semibold">
            <span className="flex items-center gap-1.5 text-[var(--color-sage)]">
              <div className="w-2 h-2 bg-[var(--color-sage)]" />
              In Stock
            </span>
          </div>
        </nav>
      </div>
    </div>
  );
}
