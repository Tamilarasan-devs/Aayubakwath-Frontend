import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";

export default function ProductMeta({
  product,
  productTags,
  wishlisted,
  wishlistMut,
  isAuthenticated,
  navigate,
  StarRow,
}) {
  const [showMore, setShowMore] = useState(false);
  const shortSentence = String(
    product?.productDescription ||
      product?.shortDescription ||
      product?.description ||
      "",
  ).trim();

  const longDescription = useMemo(() => {
    const raw =
      product?.content?.content?.description ||
      product?.content?.description ||
      product?.description ||
      "";
    return String(raw || "").replace(/\s+/g, " ").trim();
  }, [product]);

  const hasLongDescription =
    longDescription &&
    longDescription.toLowerCase() !== shortSentence.toLowerCase();

  const rawForWhom = String(product?.forWhom || "").trim();
  const forWhomLabel =
    rawForWhom && rawForWhom.toLowerCase() === "endurance"
      ? ""
      : rawForWhom || "General Wellness";
  const visibleTags = (productTags || [])
    .map((tag) => String(tag || "").trim())
    .filter(Boolean)
    .filter((tag) => {
      const lower = tag.toLowerCase();
      return lower !== "endurance" && lower !== "not specified";
    })
    .slice(0, 2);

  const handleShare = async () => {
    const shareData = {
      title: product?.productName || "Aayubakwath Product",
      text: `Discover ${product?.productName} - natural wellness solution.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== "AbortError") {
          toast.error("Sharing failed. You can copy the link manually.");
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      } catch {
        toast.error("Could not copy link.");
      }
    }
  };

  return (
    <>
      {/* Meta tags */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {forWhomLabel && (
          <span className="text-xs tracking-[0.25em] uppercase text-[var(--color-text-muted)] font-semibold bg-[var(--color-bg-soft)] px-2.5 py-1 rounded-full border border-[var(--color-border)]">
            {forWhomLabel}
          </span>
        )}
        {visibleTags.map((tag, i) => (
          <span
            key={i}
            className="text-xs tracking-[0.2em] uppercase text-[var(--color-sage)] font-semibold bg-[var(--color-sage-light)] px-2.5 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] font-extrasemibold text-[var(--color-text)]">
          {product.productName}
        </h1>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => {
              if (!isAuthenticated) {
                toast.error("Please login first.");
                navigate("/login");
                return;
              }
              wishlistMut.mutate();
            }}
            disabled={wishlistMut.isPending}
            aria-label="Add to wishlist"
            className="w-11 h-11 bg-white border border-[var(--color-border)] flex items-center justify-center hover:border-[#111827] transition-colors rounded-xl shadow-sm disabled:opacity-60"
          >
            <Heart
              size={18}
              className={
                wishlisted
                  ? "fill-red-500 text-red-500"
                  : "text-[var(--color-text-secondary)]"
              }
            />
          </button>
          <button
            onClick={handleShare}
            aria-label="Share product"
            className="w-11 h-11 bg-white border border-[var(--color-border)] flex items-center justify-center hover:border-[#111827] transition-colors rounded-xl shadow-sm"
          >
            <Share2
              size={18}
              className="text-[var(--color-text-secondary)]"
            />
          </button>
        </div>
      </div>

      {/* Rating row */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <StarRow rating={4.7} size={15} />
        <span className="text-sm font-semibold text-[var(--color-text)]">
          4.7
        </span>
        <span className="text-sm text-[var(--color-text-secondary)] font-medium">
          (1,248 reviews)
        </span>
        <div className="w-px h-4 bg-[var(--color-border)]" />
      </div>

      {/* Description */}
      <div className="mb-5">
        <p
          className="text-base text-[var(--color-text)] leading-relaxed font-medium"
        >
          {shortSentence}
        </p>

        {hasLongDescription ? (
          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            className="mt-2 text-sm text-[var(--color-sage)] font-semibold inline-flex items-center gap-1 hover:underline"
          >
            {showMore ? "See less" : "See more"}
            <ChevronDown
              size={13}
              className={`transition-transform ${showMore ? "rotate-180" : ""}`}
            />
          </button>
        ) : null}
        <AnimatePresence>
          {showMore && hasLongDescription && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 border-t border-[var(--color-border)] pt-4">
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-4">
                  <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed font-medium line-clamp-4">
                    {longDescription}
                  </p>

                  
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
