import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductImageGallery({
  product,
  IMAGES,
  activeImg,
  setActiveImg,
  activeImageUrl,
  imageZoom,
  handleImageZoomMove,
  hideImageZoom,
  discPct,
  offerTags,
}) {
  const [showFullView, setShowFullView] = useState(false);

  const handlePrev = () => {
    setActiveImg((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveImg((prev) => (prev === IMAGES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="lg:col-span-5 lg:sticky lg:top-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Main image — square geometric frame */}
        <div
          className="relative aspect-square bg-white border border-[var(--color-border)] overflow-hidden group rounded-2xl shadow-sm cursor-zoom-in"
          onMouseMove={handleImageZoomMove}
          onMouseEnter={handleImageZoomMove}
          onMouseLeave={hideImageZoom}
          onClick={() => setShowFullView(true)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImg}
              src={activeImageUrl}
              alt={product.productName}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-contain select-none"
              draggable={false}
            />
          </AnimatePresence>

          {/* Full View Trigger Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center pointer-events-none border-0">
            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100 shadow-xl border-0">
              <Maximize2 size={20} className="text-[#111827]" />
            </div>
          </div>

          {imageZoom.active && activeImageUrl && (
            <div
              className="pointer-events-none absolute hidden lg:block w-[42%] h-[42%] -translate-x-1/2 -translate-y-1/2 border border-[#111827]/25 bg-[#dbeafe]/25 shadow-[0_0_0_1px_rgba(255,255,255,0.85)_inset] backdrop-blur-[1px]"
              style={{
                left: `${imageZoom.x}%`,
                top: `${imageZoom.y}%`,
                backgroundImage:
                  "linear-gradient(90deg, rgba(17,24,39,0.12) 1px, transparent 1px), linear-gradient(0deg, rgba(17,24,39,0.12) 1px, transparent 1px)",
                backgroundSize: "8px 8px",
              }}
            />
          )}

          {imageZoom.active && activeImageUrl && (
            <div
              className="pointer-events-none fixed z-50 hidden overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_24px_80px_rgba(17,24,39,0.18)] lg:block"
              style={{
                left: `${imageZoom.panelLeft}px`,
                top: `${imageZoom.panelTop}px`,
                width: `${imageZoom.panelSize}px`,
                height: `${imageZoom.panelSize}px`,
                backgroundImage: `url(${activeImageUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "250% 250%",
                backgroundPosition: `${imageZoom.x}% ${imageZoom.y}%`,
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_58%,rgba(255,255,255,0.08)_100%)]" />
              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#111827] shadow-sm">
                Zoom Preview
              </div>
            </div>
          )}

          {/* Discount badge — perfect circle */}
          {discPct > 0 && (
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-11 h-11 sm:w-12 sm:h-12 bg-[var(--color-sage)] flex items-center justify-center rounded-full shadow-sm">
              <span className="text-white text-[10px] sm:text-[11px] tracking-wider font-semibold">
                {discPct}%
              </span>
            </div>
          )}

          {/* Offer tag — geometric rectangle */}
          {offerTags[0] && (
            <div className="absolute top-3 right-3  bg-[#829b1c] px-2.5 py-1 rounded-md">
              <span className="text-white text-[.7rem] tracking-[0.15em] uppercase font-semibold">
                {offerTags[0]}
              </span>
            </div>
          )}
        </div>

        {/* Thumbnails — geometric strip */}
        {IMAGES.length > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-none py-1">
            {IMAGES.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-16 h-16 shrink-0 border overflow-hidden transition-all rounded-xl ${
                  activeImg === i
                    ? "border-[#111827] ring-2 ring-[#111827]/5"
                    : "border-[var(--color-border)] opacity-60 hover:opacity-100 hover:border-gray-400"
                }`}
              >
                <img
                  src={src?.url}
                  alt=""
                  className="w-full h-full object-contain p-2"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Full View Modal */}
      <AnimatePresence>
        {showFullView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">Product Gallery</span>
                <h3 className="text-sm font-semibold text-gray-900">{product.productName}</h3>
              </div>
              <button
                onClick={() => setShowFullView(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 relative flex items-center justify-center p-4 sm:p-12">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={activeImageUrl}
                  alt=""
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-full max-h-full object-contain select-none"
                />
              </AnimatePresence>

              {/* Navigation Buttons */}
              {IMAGES.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-xl border border-gray-100 text-gray-900 hover:bg-gray-50 transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-xl border border-gray-100 text-gray-900 hover:bg-gray-50 transition-all"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails Footer */}
            <div className="bg-gray-50/50 border-t border-gray-100 p-6">
              <div className="max-w-screen-md mx-auto flex items-center justify-center gap-3 overflow-x-auto">
                {IMAGES.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-20 shrink-0 bg-white border-2 overflow-hidden transition-all rounded-xl ${
                      activeImg === i
                        ? "border-[#111827] scale-110 shadow-lg"
                        : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={src?.url}
                      alt=""
                      className="w-full h-full object-contain p-3"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
