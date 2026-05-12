import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import img from "../../assets/images/q3.jpg";

export default function OurStory() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-transparent text-[var(--color-text)]">
      {/* <div className="flex items-center justify-center gap-4 py-4">
        <div className="w-8 h-px bg-[var(--color-sage)]" />
        <p
          className="label whitespace-nowrap"
          style={{ fontSize: "clamp(0.82rem, 1.2vw, 0.96rem)", fontWeight: "700" }}
        >
          Our Heritage
        </p>
        <div className="w-8 h-px bg-[var(--color-sage)]" />
      </div> */}
      <div className="flex items-center justify-center gap-4 py-4">
        <div className="w-8 h-px bg-[var(--color-sage)]" />
        <p
          className="label whitespace-nowrap text-center"
          style={{
            fontSize: "clamp(1.25rem, 4vw, 2rem)",
            fontWeight: "500",
          }}
        >
          Our Heritage
        </p>
        <div className="w-8 h-px bg-[var(--color-sage)]" />
      </div>
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-7 lg:gap-16 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full min-h-[260px] sm:min-h-[340px] lg:min-h-[400px] overflow-hidden rounded-[var(--radius-lg)] group"
        >
          <img
            src={img}
            alt="Natural Wellness Roots"
            className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-105 rounded-[var(--radius-lg)]"
          />
          <div className="absolute inset-0  pointer-events-none  rounded-[var(--radius-lg)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 lg:pr-12 h-full flex flex-col justify-center"
        >
          <h2
            className="display-heading text-[var(--color-text)]"
            style={{ fontSize: "clamp(3rem, 6vw, 5.25rem)", lineHeight: "0.98" }}
          >
            Rooted in{" "}
            <span className="text-[#829b1c] font-semibold tracking-[-0.045em]">
              Nature
            </span>
          </h2>

          <div className="max-w-[840px] space-y-7">
            <p className="font-body text-[clamp(1.25rem,2vw,1.6rem)] font-medium text-[var(--color-text)] leading-[1.75] tracking-[-0.015em]">
              Aayubakwath was founded to support healthier lives through pure,
              uncompromising natural wellness solutions.
            </p>
            <p className="font-body text-[clamp(1.08rem,1.4vw,1.28rem)] font-medium text-[var(--color-text-secondary)] leading-[1.9] tracking-[-0.012em]">
              In today&apos;s fast-paced world, individuals face increasing health
              challenges—unstable blood sugar, high cholesterol, mental fatigue,
              and stress. Our mission is to restore balance to your everyday
              life utilizing trusted, ethically sourced ingredients and
              time-tested extraction practices.
            </p>
          </div>

          <div className="pt-6 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-8">
              <div>
                <p
                  className="display-heading text-[var(--color-text)]"
                  style={{ fontSize: "clamp(2rem, 3vw, 2.7rem)" }}
                >
                  100%
                </p>
                <p
                  className="label text-[var(--color-text-muted)] mt-1 ml-2.5"
                  style={{ fontSize: "0.68rem" }}
                >
                  Natural
                </p>
              </div>
              <div>
                <p
                  className="display-heading text-[var(--color-text)]"
                  style={{ fontSize: "clamp(2rem, 3vw, 2.7rem)" }}
                >
                  0%
                </p>
                <p
                  className="label text-[var(--color-text-muted)] mt-1 ml-2"
                  style={{ fontSize: "0.68rem" }}
                >
                  Additives
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/aboutpage")}
              className="btn-ghost shrink-0"
            >
              Discover More
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
