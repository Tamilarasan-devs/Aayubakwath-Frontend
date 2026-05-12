import { useState, useEffect, useRef } from "react";

/**
 * LazySection — Only renders children when scrolled into view.
 * Uses IntersectionObserver with a rootMargin so content loads
 * slightly *before* it enters the viewport (no visible pop-in).
 *
 * @param {React.ReactNode} children   — component(s) to lazy-render
 * @param {string}          rootMargin — how early to trigger (default 200px below viewport)
 * @param {number}          threshold  — visibility ratio to trigger (default 0)
 * @param {string}          className  — optional wrapper class
 * @param {number}          minHeight  — placeholder height in px to prevent layout shift
 */
export default function LazySection({
  children,
  rootMargin = "200px 0px",
  threshold = 0,
  className = "",
  minHeight = 200,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // once visible, never unload
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? (
        children
      ) : (
        <div
          style={{ minHeight }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
