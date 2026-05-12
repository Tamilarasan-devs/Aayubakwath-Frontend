import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Reveal from "./Reveal";

export default function RelatedPosts({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <Reveal delay={0.15}>
      <div className="mt-12">
        <div className="text-center mb-6">
          <h2 className="font-display text-3xl font-black text-[#111827] mb-4">
            You May Also Like
          </h2>
          <div className="w-16 h-1 bg-[var(--color-sage)] mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((related) => (
            <Link
              key={related.id}
              to={`/blog/${related.slug}`}
              className="clean-card rounded-xl overflow-hidden border border-gray-100 shadow-sm block h-full group hover:border-[var(--color-sage)] hover:shadow-2xl hover:shadow-[rgba(130,155,28,0.12)] transition-all duration-500 hover:-translate-y-2"
            >
              <div className="overflow-hidden h-44 relative">
                <img
                  src={related.image}
                  alt={related.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-[var(--color-sage)]/95 backdrop-blur-sm text-xs font-semibold text-white uppercase tracking-wider">
                    {related.category}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-display font-semibold text-base text-[#111827] mb-2 leading-snug group-hover:text-[var(--color-sage)] transition-colors line-clamp-2">
                  {related.title}
                </h3>
                <p className="text-stone-500 text-xs leading-relaxed line-clamp-2 font-medium">
                  {related.excerpt}
                </p>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-stone-400 font-semibold">
                    {related.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-sage)] group-hover:gap-2 transition-all">
                    Read <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
