import { useState, useRef, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCart from "./ProductCard";
import { getProducts } from "../../services/productService";
import ArrowBtn from "./related-product/ArrowBtn";
import ProgressBar from "./related-product/ProgressBar";

const BRAND = "#111827";
const ACCENT = "#111827";
const CW = 300;
const GAP = 20;
const EMPTY_PRODUCTS = [];

export default function RelatedProduct() {
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const [prog, setProg] = useState(0);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [thumb, setThumb] = useState({ w: 100, l: 0 });
  const dragX = useRef(0);
  const dragSL = useRef(0);
  const isThumb = useRef(false);
  const [isThumbDragging, setIsThumbDragging] = useState(false);

  const { data: products = EMPTY_PRODUCTS } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const productsLength = products.length;

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const nextProg = max > 0 ? el.scrollLeft / max : 0;
    setProg(nextProg);
    setActive(
      Math.min(
        Math.round(el.scrollLeft / (CW + GAP)),
        Math.max(productsLength - 1, 0),
      ),
    );

    if (el.scrollWidth <= el.clientWidth) {
      setThumb({ w: 100, l: 0 });
      return;
    }

    const w = Math.max((el.clientWidth / el.scrollWidth) * 100, 8);
    setThumb({ w, l: nextProg * (100 - w) });
  }, [productsLength]);

  const onBarClick = (e) => {
    const bar = barRef.current;
    const el = trackRef.current;
    if (!bar || !el) return;
    const rect = bar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    el.scrollLeft = ratio * (el.scrollWidth - el.clientWidth);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(() => onScroll(), 0);
    return () => {
      clearTimeout(t);
      el.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  const byCard = (d) =>
    trackRef.current?.scrollBy({ left: d * (CW + GAP), behavior: "smooth" });
  const toCard = (i) =>
    trackRef.current?.scrollTo({ left: i * (CW + GAP), behavior: "smooth" });

  const startDrag = (e, thumb) => {
    e.preventDefault();
    isThumb.current = thumb;
    setIsThumbDragging(thumb);
    setDragging(true);
    dragX.current = e.clientX;
    dragSL.current = trackRef.current?.scrollLeft ?? 0;
  };

  useEffect(() => {
    if (!dragging) return;
    const mv = (e) => {
      const el = trackRef.current;
      if (!el) return;
      if (isThumb.current) {
        const bar = barRef.current;
        if (!bar) return;
        const bw = bar.clientWidth;
        const tw = (el.clientWidth / el.scrollWidth) * bw;
        const dx = (e.clientX - dragX.current) / Math.max(bw - tw, 1);
        el.scrollLeft = dragSL.current + dx * (el.scrollWidth - el.clientWidth);
      } else {
        el.scrollLeft = dragSL.current - (e.clientX - dragX.current);
      }
    };
    const up = () => setDragging(false);
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mouseup", up);
    };
  }, [dragging]);

  return (
    <>
      <style>{`
        #ts-track {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          overflow-y: visible;
          padding: 8px 40px 20px;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-behavior: smooth;
        }
        #ts-track::-webkit-scrollbar { display: none; }

        .ts-fade-left, .ts-fade-right {
          position: absolute; top: 0; bottom: 0;
          width: 50px; z-index: 20; pointer-events: none;
        }
        .ts-fade-left  { left:  0; background: linear-gradient(to right, #fff, transparent); }
        .ts-fade-right { right: 0; background: linear-gradient(to left,  #fff, transparent); }
      `}</style>

      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#111827] flex items-center gap-2 mb-2">
                <span className="w-6 h-0.5 bg-[#111827] rounded-full" />
                You May Also Like
              </p>
              <h2 className="text-3xl font-bold text-[#111827]">
                Related Products
              </h2>
              <div className="w-20 h-1 rounded-full bg-[#111827] mt-3" />
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="relative overflow-hidden py-3">
          <div className="ts-fade-left" />
          <div className="ts-fade-right" />
          <div
            id="ts-track"
            ref={trackRef}
            className="snap-x"
            style={{
              cursor: dragging && !isThumbDragging ? "grabbing" : "grab",
              gap: `${GAP}px`,
            }}
            onMouseDown={(e) => {
              if (e.button !== 0) return;
              startDrag(e, false);
            }}
          >
            {products.map((product, idx) => (
              <div
                key={product.id}
                className="shrink-0 snap-center w-[86vw] min-[420px]:w-[320px] lg:w-[300px]"
              >
                <ProductCart
                  product={product}
                  animDelay={idx * 0.08}
                  sectionVisible={true}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <ProgressBar
            barRef={barRef}
            prog={prog}
            thumbW={thumb.w}
            thumbL={thumb.l}
            dragging={dragging}
            isThumb={isThumbDragging}
            onBarClick={onBarClick}
            onThumbMouseDown={(e) => {
              e.stopPropagation();
              startDrag(e, true);
            }}
          />

          {/* Dots + Counter + Arrows */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-1.5">
              {products.map((_, i) => (
                <div
                  key={i}
                  onClick={() => toCard(i)}
                  className={`h-[3px] rounded-full cursor-pointer transition-all ${i === active ? "bg-[#111827] w-[26px]" : "bg-gray-200 w-[8px]"}`}
                  style={{
                    boxShadow:
                      i === active ? "0 0 6px rgba(17,24,39,.4)" : "none",
                  }}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 font-semibold tracking-[.1em]">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(products.length).padStart(2, "0")}
              </span>
              <ArrowBtn dir="prev" onClick={() => byCard(-1)} />
              <ArrowBtn dir="next" onClick={() => byCard(1)} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
