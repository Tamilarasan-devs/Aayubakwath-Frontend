import React from "react";
import img1 from "../assets/images/nat_img/1.jpg";
import img2 from "../assets/images/nat_img/2.jpg";
import img3 from "../assets/images/nat_img/3.jpg";
import img4 from "../assets/images/nat_img/4.jpg";
import img5 from "../assets/images/nat_img/5.jpg";
import img6 from "../assets/images/nat_img/6.jpg";
import img7 from "../assets/images/nat_img/7.jpg";
import img8 from "../assets/images/ic1.jpg";
import img9 from "../assets/images/ic3.jpg";
import img10 from "../assets/images/ic4.jpg";

export default function Certificate() {
  const features = [
    { label: "Purity Tested Ingredients", image: img1 },
    { label: "Free from Toxins & Additives", image: img2 },
    { label: "Herbal & Natural Formula", image: img3 },
    { label: "Quality Assured Manufacturing", image: img4 },
    { label: "GMP & ISO Certified Facility", image: img5 },
    { label: "Clean & Safe Supplement", image: img6 },
    { label: "Made for Everyday Health", image: img7 },
    { label: "Cruelty Free", image: img8 },
    { label: "Dairy Free", image: img9 },
    { label: "Beeswax Free", image: img10 },
  ];

  return (
    <div className="overflow-hidden w-full py-10 bg-white">
      <div className="text-center mb-10">
        <h2
          className="display-heading text-[var(--color-text)]"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
        >
          Herbal Goodness, Daily Wellness.
        </h2>
      </div>

      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .marquee-wrapper {
            position: relative;
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          }

          .scroll-container {
            display: flex;
            width: max-content;
            animation: scroll 35s linear infinite;
          }

          .scroll-container:hover {
            animation-play-state: paused;
          }
          
          .feature-card {
            transition: transform 0.3s ease;
          }

          .feature-card:hover {
            transform: translateY(-3px);
          }
        `}
      </style>

      <div className="marquee-wrapper overflow-hidden pb-4">
        <div className="scroll-container">
          {[...features, ...features].map((feature, index) => (
            <div
              key={index}
              className="feature-card flex flex-col items-center text-center w-40 mx-12"
            >
              <div className="mb-4 flex h-20 w-20 items-center justify-center p-1">
                <img
                  src={feature.image}
                  alt={feature.label}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm font-semibold text-gray-800 tracking-wide uppercase px-2">
                {feature.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
