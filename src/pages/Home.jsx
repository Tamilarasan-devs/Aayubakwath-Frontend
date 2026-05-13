import React from "react";
import Banner from "../components/layout/Banner";
import OfferScrollBar from "../components/layout/OfferScrollBar";
import CategoryList from "../components/product/CategoryList";
import FirstBanner from "../components/layout/banner/FirstBanner";
import TopSelling from "../components/product/TopSelling";
import OurStory from "../components/layout/OurStory";
import SecondBanner from "../components/layout/banner/SecondBanner";
import Testimonial from "../components/layout/Testimonial";
import ProductGrid from "../components/product/ProductGrid";
import ClientReview from "../components/clientReview/ClientReview";
import BanrCombo from "../components/layout/banner/BanrCombo";
import Certificate from "./Certificate";
import { Helmet } from "react-helmet-async";
import LazySection from "../components/common/LazySection";
import OurBusiness from "./AboutPage";
import { motion } from "framer-motion";
import whatWeDoImage from "../assets/images/dq2.png";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

export default function Home() {
  return (
    <div className="w-full max-w-full bg-white overflow-x-hidden">
      <Helmet>
        <title>Aayubakwath — Premium Herbal Wellness</title>
      </Helmet>

      <Banner />

      <motion.div {...fadeUp} className="w-full overflow-x-hidden">
        <div className="w-full border-y border-[var(--color-border)] overflow-hidden bg-[var(--color-bg-soft)]">
          <OfferScrollBar />
        </div>
      </motion.div>

      {/* Our Collections */}
      <motion.section
        {...fadeUp}
        className="w-full max-w-[1400px] mx-auto px-3 lg:px-4 pt-6 pb-4 overflow-x-hidden"
      >
        <div className="flex items-center justify-center gap-4 py-4">
          <div className="w-8 h-px bg-[var(--color-sage)]" />
          <p
            className="label whitespace-nowrap"
            style={{ fontSize: "clamp(1.25rem, 4vw, 2rem)", fontWeight: "500" }}
          >
            Browse
          </p>
          <div className="w-8 h-px bg-[var(--color-sage)]" />
        </div>
        <h2
          className="display-heading text-[var(--color-text)] mb-4"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
        >
          Our Supplements 
        </h2>
        <LazySection minHeight={200}>
          <CategoryList />
        </LazySection>
      </motion.section>

      <motion.div
        {...fadeUp}
        className="w-full max-w-full px-3 lg:px-4 overflow-x-hidden"
      >
        <div className="w-full max-w-[1400px] mx-auto overflow-hidden rounded-[var(--radius-lg)]">
          <FirstBanner />
        </div>
      </motion.div>

      {/* Our Products */}
      <motion.section
        {...fadeUp}
        className="w-full max-w-[1400px] mx-auto px-3 lg:px-4 pt-5 pb-4 overflow-x-hidden"
      >
        <LazySection minHeight={400}>
          <ProductGrid />
        </LazySection>
      </motion.section>

      {/* Our Story */}
      <motion.div {...fadeUp}>
        <LazySection minHeight={300}>
          <div
            className="w-full max-w-[1400px] mx-auto px-3 lg:px-4
            border-t border-[var(--color-border)] overflow-x-hidden"
          >
            <OurStory />
          </div>
        </LazySection>
      </motion.div>

      {/* About */}
      <motion.div {...fadeUp}>
        <LazySection minHeight={300}>
          <div className="w-full max-w-[1400px] mx-auto px-3 lg:px-4 pb-0 overflow-x-hidden mb-6">
            <OurBusiness />
          </div>
        </LazySection>
      </motion.div>

      <motion.div {...fadeUp} className="w-full max-w-full overflow-x-hidden">
        <LazySection minHeight={0}>
          <BanrCombo />
        </LazySection>
      </motion.div>

      {/* Top Selling */}
      <section className="w-full max-w-[1400px] mx-auto px-3 lg:px-4 pt-3 pb-4 overflow-x-hidden">
        {/* <div className="flex items-center gap-3 mb-1.5">
          <div className="w-8 h-px bg-[var(--color-sage)]" />
          <p className="label">Most Loved</p>
        </div>
        <h2
          className="display-heading text-[var(--color-text)] mb-4"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
        >
          Top Selling Products
        </h2> */}
        {/* <LazySection minHeight={400}>
          <TopSelling />
        </LazySection> */}
      </section>

      <motion.div {...fadeUp}>
        <LazySection minHeight={120}>
          <SecondBanner />
        </LazySection>
      </motion.div>

      {/* Community — Customer Reviews */}
      <motion.section
        {...fadeUp}
        className="w-full max-w-full overflow-x-hidden bg-[var(--color-bg-soft)] border-y border-[var(--color-border)] py-12 sm:py-16 lg:py-20"
      >
        <div className="w-full max-w-[1400px] mx-auto px-3 lg:px-4 overflow-x-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-14 mb-12 lg:mb-16">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-px bg-[var(--color-sage)]" />
                <p
                  className="label whitespace-nowrap"
                  style={{
                    fontSize: "clamp(1.15rem, 2vw, 1.6rem)",
                    fontWeight: "500",
                    letterSpacing: "0.22em",
                  }}
                >
                  Why Choose Aayubakwath
                </p>
                <div className="w-10 h-px bg-[var(--color-sage)]" />
              </div>

              <h2
                className="display-heading text-[var(--color-text)] mb-4"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
              >
                Inspired by Nature, Made for You
              </h2>


              <p className="font-body text-[clamp(1rem,1.3vw,1.18rem)] font-medium text-[var(--color-text-secondary)] leading-[1.9] tracking-[-0.012em] mb-5">
                At Aayubakwath, we create science-backed, premium vegan nutraceuticals designed to support holistic wellness and unlock your full potential.

              </p>
              <p className="font-body text-[clamp(1rem,1.3vw,1.18rem)] font-medium text-[var(--color-text-secondary)] leading-[1.9] tracking-[-0.012em] mb-5">
                More than a brand — a movement towards better energy, clarity, balance, and purposeful living.

              </p>
              <p className="font-body text-[clamp(1rem,1.3vw,1.18rem)] font-medium text-[var(--color-text-secondary)] leading-[1.9] tracking-[-0.012em] mb-5">
                Blending modern research with wellness-focused formulations, we are committed to transparency, quality, and daily transformation for those who strive for more from life.

              </p>
            </div>

            <div className="w-full">
              <div className="overflow-hidden rounded-2xl bg-white/70">
                <img
                  src={whatWeDoImage}
                  alt="Herbal quality research and supplement formulation"
                  loading="lazy"
                  decoding="async"
                  className="block w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          <LazySection minHeight={300}>
            <ClientReview />
          </LazySection>
          <div className="mt-8">
            <LazySection minHeight={150}>
              <Certificate />
            </LazySection>
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.div {...fadeUp}>
        <LazySection minHeight={400}>
          <Testimonial />
        </LazySection>
      </motion.div>
    </div>
  );
}
