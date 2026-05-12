import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

export default function BlogHero({ post }) {
  return (
    <div className="relative z-10 w-full mb-10 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-4">
        <div className="relative w-full overflow-hidden rounded-2xl shadow-sm border border-gray-100 bg-white group">
          <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[500px] overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Back Button */}
            <Link
              to="/blog"
              className="absolute top-6 left-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-sm text-sm font-semibold text-[#111827] hover:bg-[var(--color-sage)] hover:text-white transition-all shadow-lg hover:-translate-y-0.5"
            >
              <ArrowLeft size={14} /> Back to All Articles
            </Link>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 bg-[var(--color-sage)] text-white shadow-lg shadow-[rgba(130,155,28,0.3)]">
                {post.category}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-white/80 text-sm font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} /> {post.date}
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} /> {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
