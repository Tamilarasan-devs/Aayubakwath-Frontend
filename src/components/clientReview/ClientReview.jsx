import React, { useState, useRef, useEffect } from "react";

import beforeImg1 from "../../assets/images/bf_af/b1.jpg";
import afterImg1 from "../../assets/images/bf_af/a1.jpg";

import beforeImg2 from "../../assets/images/bf_af/b2.jpg";
import afterImg2 from "../../assets/images/bf_af/a2.jpg";

import beforeImg3 from "../../assets/images/bf_af/b3.jpg";
import afterImg3 from "../../assets/images/bf_af/a3.jpg";

export default function BeforeAfterGrid() {
  const containerRef1 = useRef(null);
  const containerRef2 = useRef(null);
  const containerRef3 = useRef(null);

  const [position1, setPosition1] = useState(50);
  const [position2, setPosition2] = useState(50);
  const [position3, setPosition3] = useState(50);

  const [dragging1, setDragging1] = useState(false);
  const [dragging2, setDragging2] = useState(false);
  const [dragging3, setDragging3] = useState(false);

  const sectionRef = useRef(null);
  const [headingVisible, setHeadingVisible] = useState(false);
  const [card1Visible, setCard1Visible] = useState(false);
  const [card2Visible, setCard2Visible] = useState(false);
  const [card3Visible, setCard3Visible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingVisible(true);
          setTimeout(() => setCard1Visible(true), 200);
          setTimeout(() => setCard2Visible(true), 380);
          setTimeout(() => setCard3Visible(true), 560);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const startDrag1 = () => setDragging1(true);
  const startDrag2 = () => setDragging2(true);
  const startDrag3 = () => setDragging3(true);

  const stopDrag1 = () => setDragging1(false);
  const stopDrag2 = () => setDragging2(false);
  const stopDrag3 = () => setDragging3(false);

  const handleMove1 = (e) => {
    if (!dragging1) return;
    const rect = containerRef1.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setPosition1(Math.max(0, Math.min(100, percent)));
  };

  const handleMove2 = (e) => {
    if (!dragging2) return;
    const rect = containerRef2.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setPosition2(Math.max(0, Math.min(100, percent)));
  };

  const handleMove3 = (e) => {
    if (!dragging3) return;
    const rect = containerRef3.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setPosition3(Math.max(0, Math.min(100, percent)));
  };

  const handleTouchMove1 = (e) => {
    if (!dragging1) return;
    const rect = containerRef1.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setPosition1(Math.max(0, Math.min(100, percent)));
  };

  const handleTouchMove2 = (e) => {
    if (!dragging2) return;
    const rect = containerRef2.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setPosition2(Math.max(0, Math.min(100, percent)));
  };

  const handleTouchMove3 = (e) => {
    if (!dragging3) return;
    const rect = containerRef3.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setPosition3(Math.max(0, Math.min(100, percent)));
  };

  const setPositionFromPointer = (event, containerRef, setPosition) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clientX =
      "touches" in event ? event.touches[0]?.clientX : event.clientX;
    if (typeof clientX !== "number") return;

    const x = clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, percent)));
  };

  return (
    <div ref={sectionRef} className="max-w-7xl mx-auto px-4">
      <div
        style={{
          opacity: headingVisible ? 1 : 0,
          transform: headingVisible ? "translateY(0)" : "translateY(-20px)",
          transition: "opacity 0.65s ease, transform 0.65s ease",
        }}
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-8 h-px bg-[var(--color-sage)]" />
            <p
              className="label whitespace-nowrap"
              style={{
                fontSize: "clamp(1.25rem, 4vw, 2rem)",
                fontWeight: "500",
              }}
            >
              Results
            </p>
            <div className="w-8 h-px bg-[var(--color-sage)]" />
          </div>
          <h2
            className="font-display text-[var(--color-text)] font-medium tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
          >
            Over 1 Million People Trust Aayubakwath
          </h2>
        </div>

        <p className="font-body text-[20px] text-center mb-8 text-base">
          Discover Science-Backed Herbal Wellness Solutions
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            containerRef: containerRef1,
            position: position1,
            setPosition: setPosition1,
            setDragging: setDragging1,
            startDrag: startDrag1,
            stopDrag: stopDrag1,
            handleMove: handleMove1,
            handleTouchMove: handleTouchMove1,
            setPositionFromPointer,
            beforeImg: beforeImg1,
            afterImg: afterImg1,
            cardVisible: card1Visible,
            title: "Glucose Balance & Blood Sugar Support",
            description:
              "Herbal wellness support thoughtfully crafted to help maintain balanced blood sugar levels, sustained energy, and overall daily vitality.",
          },
          {
            containerRef: containerRef2,
            position: position2,
            setPosition: setPosition2,
            setDragging: setDragging2,
            startDrag: startDrag2,
            stopDrag: stopDrag2,
            handleMove: handleMove2,
            handleTouchMove: handleTouchMove2,
            setPositionFromPointer,
            beforeImg: beforeImg2,
            afterImg: afterImg2,
            cardVisible: card2Visible,
            title: "Cardio Wellness & Heart Support",
            description:
              "Advanced botanical formulations designed to support cardiovascular wellness, healthy circulation, and an active lifestyle.",
          },
          {
            containerRef: containerRef3,
            position: position3,
            setPosition: setPosition3,
            setDragging: setDragging3,
            startDrag: startDrag3,
            stopDrag: stopDrag3,
            handleMove: handleMove3,
            handleTouchMove: handleTouchMove3,
            setPositionFromPointer,
            beforeImg: beforeImg3,
            afterImg: afterImg3,
            cardVisible: card3Visible,
            title: "Cognitive Clarity & Focus",
            description:
              "Clean, science-backed ingredients formulated to help support mental clarity, concentration, calmness, and consistent daily performance.",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden"
            style={{
              opacity: card.cardVisible ? 1 : 0,
              transform: card.cardVisible
                ? "translateY(0) scale(1)"
                : "translateY(32px) scale(0.97)",
              transition:
                "opacity 0.6s ease, transform 0.6s cubic-bezier(.22,.68,0,1.15)",
            }}
          >
            <div
              ref={card.containerRef}
              className="relative h-[220px] overflow-hidden touch-none sm:h-[240px]"
              onMouseMove={card.handleMove}
              onMouseUp={card.stopDrag}
              onMouseLeave={card.stopDrag}
              onTouchMove={card.handleTouchMove}
              onTouchEnd={card.stopDrag}
              onMouseDown={(e) => {
                card.startDrag();
                card.setPositionFromPointer(
                  e,
                  card.containerRef,
                  card.setPosition,
                );
              }}
              onTouchStart={(e) => {
                card.startDrag();
                card.setPositionFromPointer(
                  e,
                  card.containerRef,
                  card.setPosition,
                );
              }}
            >
              <img
                src={card.afterImg}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: `inset(0 ${100 - card.position}% 0 0)`,
                }}
              >
                <img
                  src={card.beforeImg}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              <div
                style={{ left: `${card.position}%` }}
                className="absolute top-0 h-full w-[2px] bg-white"
              >
                <div
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    card.startDrag();
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    card.startDrag();
                  }}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-[var(--shadow-lg)] flex items-center justify-center cursor-grab active:cursor-grabbing"
                >
                  <div className="flex gap-[2px]">
                    <span className="w-[2px] h-4 bg-[var(--color-text-muted)]"></span>
                    <span className="w-[2px] h-4 bg-[var(--color-text-muted)]"></span>
                    <span className="w-[2px] h-4 bg-[var(--color-text-muted)]"></span>
                  </div>
                </div>
              </div>

            </div>

            <div className="px-5 py-3.5 sm:px-5">
              <h3 className="font-display text-[1.15rem] font-semibold tracking-tight text-[var(--color-text)]">
                {card.title}
              </h3>
              <p className="mt-1.5 font-body text-[0.96rem] leading-6 font-medium text-[var(--color-text-secondary)]">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
