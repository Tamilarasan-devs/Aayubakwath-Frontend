import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import blogBanner from "../assets/images/New/dsdd.png";
import blogPosts, { categories } from "../data/blogData";
import {
  ArrowRight,
  Calendar,
  Clock,
  Sparkles,
  Search,
  BookOpen,
  TrendingUp,
} from "lucide-react";

function Reveal({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="h-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  const visiblePosts = filtered.slice(0, visibleCount);
  const shownCount = visiblePosts.length;

  return (
    <>
      <Helmet>
        <title>Blog - Aayubakwath</title>
        <meta
          name="description"
          content="Read the latest articles on health, wellness, lifestyle, and more at Aayubakwath Blog."
        />
      </Helmet>

      <div className="relative bg-white min-h-screen  ">
        {/* ── Hero ── */}
        <div className="media_cutom_control_blog relative flex h-[clamp(520px,78vh,660px)] w-full items-start overflow-hidden bg-[#0c120c] px-4 pt-[clamp(5rem,10vh,7.5rem)] pb-10 sm:px-10 lg:px-20">
          <img
            src={blogBanner}
            alt="Aayubakwath wellness journal"
            className="cutom-img_lockD  absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#11140f]/35" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,20,15,0.92)_0%,rgba(17,20,15,0.72)_44%,rgba(17,20,15,0.28)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_72%_55%,rgba(130,155,28,0.30)_0%,rgba(130,155,28,0)_58%)]" />

          <div className="relative w-full text-left mt-[clamp(1.5rem,5vh,4rem)]">
            <div className="w-full max-w-5xl rounded-3xl bg-[linear-gradient(135deg,rgba(17,20,15,0.62)_0%,rgba(17,20,15,0.34)_55%,rgba(130,155,28,0.14)_100%)] p-5 sm:bg-none sm:p-0">
              <h1
                className="mb-8 font-display text-[clamp(3rem,10vw,6.5rem)] font-black leading-[0.98] tracking-normal break-words drop-shadow-[0_4px_18px_rgba(0,0,0,0.28)]"
                style={{ color: "#ffffff" }}
              >
                <span className="block" style={{ color: "#9fd34a" }}>
                  Wellness,
                </span>
                <span className="block  font-light italic">
                  Redefined.
                </span>
              </h1>

              <p
                className="mb-9 max-w-2xl text-[clamp(1rem,2.2vw,1.25rem)] font-semibold leading-[1.9]"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                Expert insights on natural health, Ayurvedic wisdom, and modern
                wellness for cleaner everyday living.
              </p>

              <div
                className="flex flex-wrap items-center gap-4 text-sm font-semibold"
                style={{ color: "#f3ffd4" }}
              >
                <div className="flex items-center gap-2">
                  <BookOpen size={16} />
                  <span>{blogPosts.length} Articles</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-2">
                  <Sparkles size={16} />
                  <span>Weekly Updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Category Filter ── */}
        <div className="sticky top-[86px] sm:top-[96px] z-30 bg-white/85 backdrop-blur-xl border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-4">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setVisibleCount(6);
                  }}
                  className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-[var(--color-sage)] text-white shadow-lg shadow-[rgba(130,155,28,0.22)]"
                      : "bg-gray-50 text-gray-500 hover:bg-[var(--color-sage-light)] hover:text-[var(--color-sage-dark)] hover:border-[var(--color-sage)] border border-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Section Header ── */}
        <div className="max-w-[1400px] mx-auto px-3 lg:px-4 pt-12 pb-8">
          <Reveal>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-sage)] mb-1">
                  Latest Articles
                </p>
                <h2 className="font-display text-2xl font-semibold text-[#111827]">
                  {activeCategory === "All" ? "All Posts" : activeCategory}
                </h2>
              </div>
              <p className="text-sm text-gray-400 font-medium">
                {filtered.length} article{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
          </Reveal>
        </div>

        {/* ── Grid Posts ── */}
        {visiblePosts.length > 0 && (
          <div className="max-w-[1400px] mx-auto px-3 lg:px-4 pb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visiblePosts.map((post, i) => (
                <Reveal key={post.id} delay={i * 0.08}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex flex-col h-full rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:border-[var(--color-sage)] hover:shadow-xl hover:shadow-[rgba(130,155,28,0.12)] transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="overflow-hidden h-48 relative shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-[var(--color-sage)]/95 backdrop-blur-sm text-xs font-semibold text-white uppercase tracking-wider">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-display font-semibold text-[18px] text-[#111827] mb-3 leading-snug group-hover:text-[var(--color-sage)] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-[15px] leading-[1.8] mb-5 line-clamp-3 font-medium">
                        {post.excerpt}
                      </p>

                      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[13px] text-gray-400 font-semibold">
                          <span className="inline-flex items-center gap-1">
                            <Calendar size={13} /> {post.date}
                          </span>
                          <span>·</span>
                          <span className="inline-flex items-center gap-1">
                            <Clock size={13} /> {post.readTime}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--color-sage)] group-hover:gap-2 transition-all">
                          Read <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* ─ Load More ── */}
        {filtered.length > visibleCount && (
          <div className="text-center pb-20">
            <button
              className="bg-[var(--color-sage)] text-white px-10 py-4 text-[14px] shadow-xl shadow-[rgba(130,155,28,0.22)] hover:-translate-y-1 hover:bg-[var(--color-sage-dark)] hover:shadow-2xl hover:shadow-[rgba(130,155,28,0.28)] transition-all duration-300 inline-flex items-center gap-2 rounded-xl"
              onClick={() => setVisibleCount((prev) => prev + 6)}
            >
              Load More Articles <ArrowRight size={16} />
            </button>
            <p className="text-xs text-gray-400 mt-4 font-medium">
              Showing {shownCount} of {filtered.length} articles
            </p>
          </div>
        )}
      </div>
    </>
  );
}
