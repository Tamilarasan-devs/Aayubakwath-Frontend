import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import profile1 from "../../assets/images/Profile/12 (1).jpeg";
import profile2 from "../../assets/images/Profile/12 (2).jpeg";
import profile3 from "../../assets/images/Profile/12 (3).jpeg";
import profile4 from "../../assets/images/Profile/12 (4).jpeg";
import profile5 from "../../assets/images/Profile/12 (5).jpeg";

const testimonials = [
  {
    id: 1,
    name: "Sandhiya M",
    title: "Home maker",
    image: profile1,
    quote:
      "A thoughtfully made herbal supplement for supporting heart wellness naturally. Easy to continue daily and felt mild throughout my routine.",
  },
  {
    id: 2,
    name: "Priyanga",
    title: "Student",
    image: profile2,
    quote:
      "Feels natural and gentle for everyday use. Aayubakwath Brain Tonic blended well into my study routine and gave a refreshing herbal feel.",
  },
  {
    id: 3,
    name: "Ramya S",
    title: "Working professional",
    image: profile3,
    quote:
      "Natural herbal health support that felt light and comfortable for daily use. Easy to add into my routine and gave a refreshing wellness feel.",
  },
  {
    id: 4,
    name: "Meera S",
    title: "Doctor",
    image: profile4,
    quote:
      "A simple herbal supplement that suited well with my sugar management routine. Felt light, comfortable, and easy to use every day.",
  },
  {
    id: 5,
    name: "Karthik R",
    title: "Fitness enthusiast",
    image: profile5,
    quote:
      "A refreshing herbal supplement for everyday vitality and balance. Light on the routine and comfortable for regular wellness use. ",
  },
];

function ReviewCard({ testimonial, isActive }) {
  return (
    <article
      className="rounded-[32px] border border-[rgba(130,155,28,0.22)] bg-white px-6 py-7 shadow-[0_18px_50px_rgba(184,166,140,0.14)] sm:px-8 hover:border-[rgba(130,155,28,0.45)] hover:bg-[rgba(130,155,28,0.07)] hover:shadow-[0_20px_50px_rgba(130,155,28,0.14)]"
      style={{
        minHeight: 298,
        opacity: isActive ? 1 : 0.6,
        transform: isActive ? "scale(1)" : "scale(0.94)",
        transition:
          "opacity 0.4s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1), background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div className="mb-5 flex items-center gap-4">
        <div className="h-16 w-16 overflow-hidden rounded-full border border-[rgba(184,166,140,0.35)] bg-[var(--color-bg-warm)]">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"                                                                                              
          />
        </div>
      </div>

      <p
        className="font-body"
        style={{
          color: "var(--color-text-secondary)",
          fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
          fontWeight: 400,
          lineHeight: 1.72,
        }}
      >
        {testimonial.quote}
      </p>

      <div className="mt-8">
        <p
          className="font-display text-[1.2rem] leading-tight"
          style={{ color: "var(--color-text)" }}
        >
          {testimonial.name}
        </p>
        <p
          className="mt-1 font-body text-[0.98rem]"
          style={{ color: "var(--color-text-muted)", fontWeight: 400 }}
        >
          {testimonial.title}
        </p>
      </div>
    </article>
  );
}

export default function Testimonial() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const stageRef = useRef(null);
  const [stageWidth, setStageWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(640);

  const count = testimonials.length;
  const gap = 18;

  useEffect(() => {
    const updateLayout = () => {
      const viewportWidth = window.innerWidth;

      if (viewportWidth < 640) setCardWidth(Math.max(viewportWidth - 56, 280));
      else if (viewportWidth < 1024) setCardWidth(500);
      else if (viewportWidth < 1280) setCardWidth(560);
      else setCardWidth(620);

      if (stageRef.current) {
        setStageWidth(stageRef.current.clientWidth);
      }
    };

    updateLayout();

    const resizeObserver = new ResizeObserver(() => updateLayout());
    if (stageRef.current) resizeObserver.observe(stageRef.current);

    window.addEventListener("resize", updateLayout);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  const prev = () => setCurrent((index) => (index - 1 + count) % count);
  const next = () => setCurrent((index) => (index + 1) % count);

  useEffect(() => {
    if (isPaused) return undefined;

    const timer = window.setInterval(() => {
      setCurrent((index) => (index + 1) % count);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [count, isPaused]);

  const translateX =
    stageWidth > 0
      ? (stageWidth - cardWidth) / 2 - current * (cardWidth + gap)
      : 0;

  return (
    <section
      className="overflow-hidden py-6 sm:py-8 lg:py-10"
      style={{ background: "#ffffff" }}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(280px,340px)_minmax(0,1fr)] lg:items-start lg:gap-7">
          <div className="w-full max-w-[340px] shrink-0 lg:flex lg:min-h-[298px] lg:flex-col lg:justify-center">
            <h2
              className="font-display tracking-tight"
              style={{
                color: "var(--color-text)",
                fontSize: "clamp(2rem, 4vw, 3.3rem)",
                lineHeight: 1.02,
              }}
            >
              What Our{" "}
              <span style={{ color: "var(--color-sage)" }}>
                Customers Say
              </span>
            </h2>
            <p
              className="mt-4 max-w-[310px] font-body font-normal"
              style={{
                color: "var(--color-text-secondary)",
                fontSize: "clamp(1rem, 1.2vw, 1.12rem)",
                fontWeight: 400,
                lineHeight: 1.72,
              }}
            >
              We value your trust and feedback. Our Aayubakwath community
              shares real experiences with honest results and everyday wellness
              journeys.
            </p>
          </div>

          <div className="min-w-0">
            <div
              ref={stageRef}
              className="overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              <div
                className="flex items-stretch"
                style={{
                  gap,
                  transform: `translateX(${translateX}px)`,
                  transition: "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
                  willChange: "transform",
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    style={{ width: cardWidth, minWidth: cardWidth }}
                  >
                    <ReviewCard
                      testimonial={testimonial}
                      isActive={index === current}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-2 flex items-center justify-center gap-4 lg:justify-start lg:pl-6">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(184,166,140,0.25)] bg-white text-[var(--color-text)] shadow-[0_8px_24px_rgba(184,166,140,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(184,166,140,0.45)]"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: index === current ? 22 : 8,
                      height: 8,
                      background:
                        index === current
                          ? "var(--color-sage)"
                          : "rgba(184,166,140,0.45)",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(184,166,140,0.25)] bg-white text-[var(--color-text)] shadow-[0_8px_24px_rgba(184,166,140,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(184,166,140,0.45)]"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
