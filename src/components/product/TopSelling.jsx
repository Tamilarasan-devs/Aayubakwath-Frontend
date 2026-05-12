import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getProducts } from "../../services/productService";
import SectionHeader from "./top-selling/SectionHeader";
import DesktopGrid from "./top-selling/DesktopGrid";
import MobileGrid from "./top-selling/MobileGrid";

const PRODUCT_LIMIT = 5;

export default function TopSelling() {
  const navigate = useNavigate();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const displayProducts = useMemo(
    () => products.slice(0, PRODUCT_LIMIT),
    [products],
  );
  const goToProductListing = () => navigate("/productListing");

  return (
    <section className="w-full max-w-full overflow-x-hidden bg-white py-5 sm:py-6">
      <div className="w-full max-w-[1400px] mx-auto px-0 sm:px-3 lg:px-4">
        <SectionHeader onViewAll={goToProductListing} />
        <DesktopGrid
          products={displayProducts}
          isLoading={isLoading}
          navigate={navigate}
        />
        <MobileGrid
          products={displayProducts}
          isLoading={isLoading}
          navigate={navigate}
        />
        <button
          onClick={goToProductListing}
          className="mt-5 sm:hidden w-full flex items-center justify-center gap-2
            text-sm font-semibold text-[var(--color-text)] border border-[var(--color-border)]
            py-3 rounded-xl hover:bg-[var(--color-bg-soft)] transition-colors"
        >
          View All Products <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
}
