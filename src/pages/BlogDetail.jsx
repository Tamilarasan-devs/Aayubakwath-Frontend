import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import blogPosts from "../data/blogData";
import BlogHero from "./blog/BlogHero";
import BlogContent from "./blog/BlogContent";
import BlogShare from "./blog/BlogShare";
import RelatedPosts from "./blog/RelatedPosts";
import Reveal from "./blog/Reveal";

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center flex-col gap-6 bg-white">
        <h2 className="font-display text-3xl font-semibold text-[#111827]">
          Blog post not found
        </h2>
        <button
          onClick={() => navigate("/blog")}
          className="bg-[#111827] text-white px-8 py-4 text-[14px] inline-flex items-center gap-2 rounded-xl"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Blog
        </button>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const morePosts =
    relatedPosts.length < 3
      ? [
          ...relatedPosts,
          ...blogPosts
            .filter(
              (p) =>
                p.id !== post.id && !relatedPosts.find((r) => r.id === p.id),
            )
            .slice(0, 3 - relatedPosts.length),
        ]
      : relatedPosts;

  return (
    <>
      <Helmet>
        <title>{post.title} - Aayubakwath Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <div className="relative bg-white min-h-screen overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-gray-100 to-transparent pointer-events-none z-0" />
        <div className="fixed -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gray-100 blur-[120px] pointer-events-none z-0" />

        <BlogHero post={post} />

        <div className="max-w-[1400px] mx-auto px-3 lg:px-4 relative z-10 pb-12">
          <Reveal>
            <BlogContent post={post} />
            <BlogShare post={post} />
          </Reveal>
          <RelatedPosts posts={morePosts} />
        </div>
      </div>
    </>
  );
}
