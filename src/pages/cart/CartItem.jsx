import React from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const badgeMap = {
  "Best Seller":
    "bg-[var(--color-bg-soft)] text-[var(--color-text)] border-[var(--color-border)]",
  New: "bg-[var(--color-sage-light)] text-[var(--color-sage-dark)] border-[var(--color-sage)]/20",
  "Top Rated":
    "bg-[var(--color-bg-soft)] text-[var(--color-text)] border-[var(--color-border)]",
  Popular:
    "bg-[var(--color-bg-muted)] text-[var(--color-text-secondary)] border-[var(--color-border)]",
};

export default function CartItem({ item, onUpdateQty, onRemove, isRemoving }) {
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{
        opacity: isRemoving ? 0 : 1,
        y: 0,
      }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="py-7 flex gap-5 items-start"
    >
      <div className="w-20 h-24 sm:w-24 sm:h-28 shrink-0 bg-[var(--color-bg-soft)] rounded-[var(--radius-md)] flex items-center justify-center overflow-hidden border border-[var(--color-border)]">
        <img
          src={item.image.url}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            {item.badge && (
              <span
                className={`inline-block font-body text-[9px] font-semibold uppercase tracking-[0.12em] px-2 py-0.5 border rounded-sm mb-2 ${badgeMap[item.badge] || badgeMap["Popular"]}`}
              >
                {item.badge}
              </span>
            )}
            <h3 className="font-body font-medium text-[var(--color-text)] text-sm sm:text-base leading-snug">
              {item.name}
            </h3>
            <p className="font-body text-[12px] text-[var(--color-text-muted)] mt-0.5 tracking-[0.02em]">
              {item.category}
            </p>
          </div>
          <button
            onClick={() => onRemove(item.productId)}
            className="shrink-0 text-[var(--color-text-muted)] hover:text-[var(--color-terracotta)] transition-colors p-1.5 rounded-md hover:bg-[var(--color-error-bg)]"
            aria-label="Remove item"
          >
            <Trash2 size={14} />
          </button>
        </div>
 
        {item.tags?.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mt-2">
            {item.tags.map((t) => (
              <span
                key={t}
                className="font-body text-[9px] font-medium uppercase tracking-[0.1em] px-2 py-0.5
                  bg-[var(--color-bg-soft)] text-[var(--color-text-secondary)] rounded-sm"
              >
                {t}
              </span>
            ))}
          </div>
        )}
 
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
          <div className="flex items-baseline gap-2">
            <span className="font-body text-base sm:text-lg font-semibold text-[var(--color-text)]">
              ₹{(item.price * item.qty).toLocaleString()}
            </span>
            {item.originalPrice > item.price && (
              <>
                <span className="font-body text-sm text-[var(--color-text-muted)] line-through">
                  ₹{(item.originalPrice * item.qty).toLocaleString()}
                </span>
                <span className="font-body text-[11px] font-medium text-[var(--color-sage)] bg-[var(--color-sage-light)] px-1.5 py-0.5 rounded-sm">
                  {Math.round(
                    ((item.originalPrice - item.price) /
                      item.originalPrice) *
                      100,
                  )}
                  % off
                </span>
              </>
            )}
          </div>
 
          <div className="flex items-center border border-[var(--color-border)] rounded-md overflow-hidden shrink-0 bg-white">
            <button
              onClick={() => onUpdateQty(item.productId, -1)}
              className="w-8 h-8 flex items-center justify-center font-medium text-[var(--color-text)]
                hover:bg-[var(--color-bg-soft)] transition-colors text-lg leading-none"
            >
              −
            </button>
            <span
              className="w-9 h-8 flex items-center justify-center font-body text-sm
              font-medium text-[var(--color-text)] border-x border-[var(--color-border)] bg-[var(--color-bg-soft)]/50"
            >
              {item.qty}
            </span>
            <button
              onClick={() => onUpdateQty(item.productId, +1)}
              className="w-8 h-8 flex items-center justify-center font-medium text-[var(--color-text)]
                hover:bg-[var(--color-bg-soft)] transition-colors text-lg leading-none"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
