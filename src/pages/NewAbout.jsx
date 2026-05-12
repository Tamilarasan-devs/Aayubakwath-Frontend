import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Award, BadgeCheck, FlaskConical, Leaf, ShieldCheck, Star } from "lucide-react";

import heroBg from "../assets/images/about/about.jpeg";
import img0 from "../assets/images/about/53.jpg";
import img1 from "../assets/images/about/54.jpg";
import img2 from "../assets/images/about/55.jpg";
import img3 from "../assets/images/resar.jpeg";
import img4 from "../assets/images/about/img.jpg";

const MotionDiv = motion.div;

/* ── Scroll-triggered reveal ── */
function Reveal({ children, delay = 0, x = 0, className = "" }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 32, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </MotionDiv>
  );
}

/* ── Eyebrow label ── */
function Eyebrow({ text, light, center = false }) {
  return (
    <div
      className={`flex items-center gap-3 mb-5 ${center ? "justify-center" : ""}`}
    >
      <span
        className="block w-8 h-px"
        style={{
          background: light ? "rgba(255,255,255,0.4)" : "var(--color-sage)",
        }}
      />
      <span
        className="font-body font-semibold uppercase tracking-[0.22em]"
        style={{
          fontSize: "1.5rem",
          color: light ? "rgba(255,255,255,0.55)" : "var(--color-text-muted)",
        }}
      >
        {text}
      </span>
      <span
        className="block w-8 h-px"
        style={{
          background: light ? "rgba(255,255,255,0.4)" : "var(--color-sage)",
        }}
      />
    </div>
  );
}

const stats = [
  { value: "100%", label: "Traditional Herbal Composition" },
  { value: "10K+", label: "Scientifically Tested Blend" },
  { value: "15+", label: "No Synthetic Harsh Ingredients" },
  { value: "5★", label: "FSSAI Approved Standards" },
  { value: "5★", label: "Pure Vegan Wellness Capsules Standards" },
];

const statIcons = [Leaf, FlaskConical, ShieldCheck, BadgeCheck, Star];

const marqueeItems = [
  "Plant-Based",
  "Quality Assured",
  "Daily Nutrition Support",
  "Trusted by Customers",
  "Safe & Clean",
  "Healthy Living Choice",
];

const sections = [
  {
    tag: "Who We Are",
    title: "Founded on a Vision of Healthier Lives.",
    body: "Aayubakwath was founded to support healthier lives through natural wellness solutions. In today's fast-paced world, individuals face increasing health challenges — unstable blood sugar, high cholesterol, mental fatigue, and reduced concentration.\n\nWe address these issues through carefully developed, scientifically formulated supplements that harmoniously combine nutrition with evidence-based botany.",
    image: img0,
  },
  {
    tag: "What We Do",
    title: "Supplements for Modern Life.",
    body: "We develop supplements that integrate scientifically backed ingredients with traditional knowledge to create effective solutions for modern lifestyles.\n\nWe are extremely committed to maintaining the strictest quality standards throughout our entire production process.",
    image: img1,
    reverse: true,
  },
  {
    tag: "Our Mission",
    title: "Three Values at Our Core.",
    values: [
      {
        label: "Purity",
        desc: "Premium health supplements made with carefully vetted organic ingredients.",
      },
      {
        label: "Trust",
        desc: "Long-term relationships built on total transparency and clinical reliability.",
      },
      {
        label: "Wellness",
        desc: "Supporting healthier lifestyles sustainably through true nutritional support.",
      },
    ],
    image: img2,
  },
  {
    tag: "Our Vision",
    title: "The Future of Herbal Wellness.",
    body: "Our vision is to become the most trusted wellness brand globally, renowned for providing reliable and high-quality nutritional supplements that genuinely support your long-term health.\n\nWe strive to empower people with minimalist, natural health solutions that quietly maintain your energy and mental clarity.",
    image: img3,
    reverse: true,
  },
  {
    tag: "Quality Commitment",
    title: "Absolute Clinical Precision.",
    body: "We follow unforgiving quality guidelines during sourcing, formulation, and manufacturing. Every single batch is produced with rigorous hygiene, consistency, and care to ensure ultra-premium grade outcomes.\n\nOur goal is to provide safe, highly effective, and beautiful health supplements that seamlessly fit your lifestyle.",
    image: img4,
  },
];

export default function NewAbout() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <>
      <Helmet>
        <title>About Us — Aayubakwath</title>
      </Helmet>

      {/* ══════════════════════════════════
          01. HERO
      ══════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative w-full h-[calc(100vh-86px)] h-[calc(100dvh-86px)] sm:h-[clamp(500px,calc(100vh-150px),620px)] overflow-hidden media_cutom_control"
      >
        <MotionDiv
          className="absolute inset-0 will-change-transform"
          style={{ y: heroY }}
        >
          <img
            src={heroBg}
            alt="About Aayubakwath"
            className="w-full h-full object-cover scale-105 cutom-img_lockD"
            style={{ objectPosition: "58% 44%" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(8,15,12,0.90) 0%, rgba(8,15,12,0.76) 34%, rgba(8,15,12,0.28) 64%, rgba(130,155,28,0.12) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(8,15,12,0.12) 0%, rgba(8,15,12,0.02) 50%, rgba(8,15,12,0.24) 100%), radial-gradient(80% 60% at 70% 70%, rgba(130,155,28,0.35) 0%, rgba(130,155,28,0.0) 60%)",
            }}
          />
        </MotionDiv>

        <div className="relative z-10 h-full flex items-center px-5 sm:px-8 lg:px-12 max-w-[1400px] mx-auto hero-text-fix">
          <div className="max-w-[620px] rounded-3xl bg-[linear-gradient(135deg,rgba(8,15,12,0.65)_0%,rgba(8,15,12,0.35)_55%,rgba(130,155,28,0.12)_100%)] p-5 sm:bg-none sm:p-0">
            <Reveal delay={0.25}>
              <h1
                className="font-display font-semibold leading-[0.98] mb-6"
                style={{
                  fontSize: "clamp(2.8rem, 8vw, 6.75rem)",
                  letterSpacing: 0,
                  color: "#9fd34a",
                  textShadow: "0 20px 60px rgba(0,0,0,0.35)",
                }}
              >
                Purity
                <span>,</span>
                <br />
                <span className="italic text-white/88">Redefined.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.35}>
              <p
                className="font-body max-w-[520px] leading-relaxed text-white/82"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.22rem)" }}
              >
                Supporting your pursuit of absolute health with uncompromised,
                clinical-grade natural formulations.
              </p>
            </Reveal>
            <Reveal delay={0.45}>
              <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4">

                {/* Primary Button */}
                <button
                  onClick={() => navigate("/productListing")}
                  className="
        group relative overflow-hidden rounded-2xl
        bg-gradient-to-r from-lime-300 via-lime-200 to-lime-100
        px-7 py-3.5
        text-sm sm:text-base
        font-semibold uppercase tracking-wide
        text-[#172014]
        shadow-[0_10px_35px_rgba(163,230,53,0.35)]
        transition-all duration-300
        hover:scale-[1.03]
        hover:shadow-[0_18px_45px_rgba(163,230,53,0.45)]
        active:scale-[0.98]
        w-full sm:w-auto
      "
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Explore Products
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>

                {/* Secondary Button */}
                <button
                  onClick={() => navigate("/contact")}
                  className="
        rounded-2xl border border-white/20
        bg-white/5 backdrop-blur-md
        px-7 py-3.5
        text-sm sm:text-base
        font-semibold uppercase tracking-wide
        text-white
        transition-all duration-300
        hover:border-white/50
        hover:bg-white/10
        hover:shadow-[0_10px_30px_rgba(255,255,255,0.08)]
        active:scale-[0.98]
        w-full sm:w-auto
      "
                >
                  Contact Us
                </button>

              </div>
            </Reveal>
          </div>

          {/* Scroll hint */}
          <div className="absolute right-8 bottom-10 hidden lg:flex flex-col items-center gap-3">
            {/* <div className="w-px h-10 bg-white/15 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full bg-white/50"
                animate={{ height: ["0%", "100%"], top: ["0%", "100%"] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div> */}
            {/* <span
              className="font-body text-white/25 uppercase tracking-[0.25em]"
              style={{ fontSize: "0.5rem" }}
            >
              Scroll
            </span> */}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          02. MANIFESTO BAND
      ══════════════════════════════════ */}
      <section className="about-marquee-band overflow-hidden bg-[#829b1c] p-1">
        <div className="flex items-center animate-marquee whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-10 sm:gap-24"
            >
              {marqueeItems.map((item) => (
                <span
                  key={`${i}-${item}`}
                  className="inline-flex items-center gap-10 sm:gap-24 font-body text-[12px] font-extrabold uppercase tracking-[0.34em] text-white"
                >
                  {item}
                  <span className="text-[14px] leading-none text-white/85">
                    ✦
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          03. STATS STRIP
      ══════════════════════════════════ */}
      <section
        className="border-b border-(--color-border) py-10"
        style={{ background: "var(--color-bg)" }}
      >
        <div className="max-w-[1400px] mx-auto px-3 lg:px-4">
          <div className="rounded-[28px] border border-(--color-border) bg-white px-4 py-6 shadow-[0_22px_60px_rgba(15,23,42,0.08)] sm:px-8 sm:py-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {stats.map((s, i) => {
                const Icon = statIcons[i] || Award;

                return (
                  <Reveal key={i} delay={i * 0.06} className="min-w-0">
                    <div
                      className={[
                        "group flex min-w-0 items-center gap-4 rounded-2xl border px-5 py-5 transition-all duration-300",
                        "hover:border-[var(--color-sage)] hover:bg-[rgba(130,155,28,0.06)]",
                        "border-transparent bg-transparent",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                          "bg-[rgba(130,155,28,0.12)] text-[var(--color-sage)]",
                          "transition-colors group-hover:bg-[rgba(130,155,28,0.18)] group-hover:text-[var(--color-sage-dark)]",
                        ].join(" ")}
                      >
                        <Icon size={18} />
                      </span>

                      <div className="min-w-0">
                        <p className="font-body text-[15px] font-semibold text-black leading-tight line-clamp-2">
                          {s.label}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          04. PHILOSOPHY HEADER
      ══════════════════════════════════ */}
      <section
        className="py-10 md:py-10"
        style={{ background: "var(--color-bg-soft)" }}
      >
        <div className="max-w-[1400px] mx-auto px-3 lg:px-4 pt-0 text-center">
          <Reveal>

            <div className="flex items-center justify-center gap-4 py-2">
              <div className="w-8 h-px bg-[var(--color-sage)]" />
              <p
                className="label whitespace-nowrap"
                style={{ fontSize: "clamp(1.25rem, 4vw, 2rem)", fontWeight: "500" }}
              >
                About Aayubakwath
              </p>
              <div className="w-8 h-px bg-[var(--color-sage)]" />
            </div>


            {/* <Eyebrow text="" /> */}
            <h2
              className="font-display font-medium pt-10 text-(--color-text) leading-[1.05] mb-6"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                letterSpacing: "-0.04em",
              }}
            >
              Advanced Herbal {" "}
              <span
                style={{
                  color: "#829b1c",
                  fontStyle: "italic",
                }}
              >
                Extraction
              </span>
            </h2>
            <p
              className="font-body text-(--color-text-secondary) leading-relaxed mx-auto"
              style={{ fontSize: "clamp(1.12rem, 1.45vw, 2rem)", maxWidth: 720 }}
            >
              We harmonize native organic botanical wisdom with rigorous,
              state-of-the-art modern processing standards to yield
              uncompromising health solutions.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════
          05. ALTERNATING STORY SECTIONS
      ══════════════════════════════════ */}
      {sections.map((section, i) => (
        <section
          key={i}
          className="py-20 md:py-10 border-t border-(--color-border)"
          style={{
            background:
              i % 2 === 0 ? "var(--color-bg)" : "var(--color-bg-muted)",
          }}
        >
          <div className="max-w-[1400px] mx-auto px-3 lg:px-4">
            <div
              className={`about-story-grid grid min-w-0 grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16 ${section.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              {/* Image */}
              <Reveal
                x={section.reverse ? 24 : -24}
                delay={0.05}
                className="min-w-0 max-w-full"
              >
                <div className="group relative aspect-[4/3] w-full max-w-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[var(--color-sage)] hover:shadow-2xl hover:shadow-[rgba(130,155,28,0.12)] custom-img-outer">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="block h-full w-full max-w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04] custom-about-cls-img"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[rgba(130,155,28,0.10)] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </Reveal>

              {/* Text */}
              <Reveal
                x={section.reverse ? -24 : 24}
                delay={0.12}
                className="min-w-0 max-w-full"
              >
                <div className="w-full max-w-[620px] min-w-0">
                  <Eyebrow text={section.tag} />
                  <h2
                    className="font-display font-medium text-(--color-text) leading-[1.05] mb-8"
                    style={{
                      fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {section.title.split(".").map((part, j, arr) =>
                      j === arr.length - 1 ? (
                        part
                      ) : (
                        <React.Fragment key={j}>
                          {part}
                          <span style={{ color: "var(--color-border-medium)" }}>
                            .
                          </span>
                        </React.Fragment>
                      ),
                    )}
                  </h2>

                  {section.body && (
                    <div className="space-y-4">
                      {section.body.split("\n\n").map((para, j) => (
                        <p
                          key={j}
                          className="font-body text-(--color-text-secondary) leading-relaxed"
                          style={{ fontSize: "clamp(1.16rem, 1.22vw, 1.32rem)" }}
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  )}

                  {section.values && (
                    <div className="space-y-7 pt-2">
                      {section.values.map((v, j) => (
                        <div
                          key={j}
                          className="group flex gap-5 items-start rounded-2xl pb-7 border-b border-(--color-border) transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-sage)]/40 last:border-0 last:pb-0"
                        >
                          <span
                            className="font-display font-medium shrink-0 text-[var(--color-border-medium)] transition-colors duration-500 group-hover:text-[var(--color-sage)]"
                            style={{
                              fontSize: "1.6rem",
                              letterSpacing: "-0.02em",
                            }}
                          >
                            0{j + 1}
                          </span>
                          <div className="min-w-0">
                            <h4
                              className="font-display font-medium text-(--color-text) mb-1.5 transition-colors duration-500 group-hover:text-[var(--color-sage)]"
                              style={{
                                fontSize: "1.42rem",
                                letterSpacing: "-0.01em",
                              }}
                            >
                              {v.label}
                            </h4>
                            <p
                              className="font-body text-(--color-text-secondary) leading-relaxed"
                              style={{ fontSize: "clamp(1.12rem, 1.08vw, 1.22rem)" }}
                            >
                              {v.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* ══════════════════════════════════
          06. QUOTE SECTION
      ══════════════════════════════════ */}
      <section
        className="relative py-15 overflow-hidden"
        style={{ background: "var(--color-accent)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.04), transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.03), transparent 50%)",
          }}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-3 lg:px-4 text-center">
          <Reveal>
            {/* <div className="w-8 h-px bg-white/25 mx-auto mb-8" /> */}
            <blockquote
              className="font-display font-medium text-white leading-[1.1] mx-auto"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                letterSpacing: "-0.03em",
                maxWidth: 900,
              }}
            >
              {`"Wellness isn't a product —`}
              <br />
              <span style={{ color: "#829b1c", fontStyle: "italic" }}>
                {`it's a practice.`}
              </span>
              <br />
              {`We're here to support yours, every day."`}
            </blockquote>
            <p
              className="font-body text-white/50 mt-8 uppercase tracking-[0.25em]"
              style={{ fontSize: "1rem" }}
            >
              The Aayubakwath Philosophy
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════
          07. CTA FOOTER
      ══════════════════════════════════ */}
      <section
        className="py-20 md:py-24 lg:py-28"
        style={{ background: "var(--color-bg-muted)" }}
      >
        <div className="max-w-[1400px] mx-auto px-3 lg:px-4 text-center">
          <Reveal className="mx-auto ">
            <Eyebrow text="Embrace Everyday Wellness" center />
            <h2
              className="font-display font-medium text-(--color-text) leading-[0.98] mb-7"
              style={{
                fontSize: "clamp(2.6rem, 6.4vw, 5.8rem)",
                letterSpacing: "-0.035em",
              }}
            >
              Feel Balanced.{" "}
              <span style={{ color: "#829b1c", fontStyle: "italic" }}>
                Feel Refreshed.
              </span>
            </h2>
            <p
              className="font-body text-(--color-text-secondary) leading-relaxed mb-11 mx-auto"
              style={{ fontSize: "1.08rem", maxWidth: 560 }}
            >
              Premium herbal support designed for your daily routine.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => navigate("/productListing")}
                className="btn-primary"
              >
                Explore Collection
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="btn-ghost"
              >
                Contact Us
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
