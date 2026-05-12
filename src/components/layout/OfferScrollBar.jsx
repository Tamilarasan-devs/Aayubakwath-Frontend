import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getOfferBars } from "../../services/offerService";

const fallbackOffers = [
  "0% harmful chemicals",
  "Power of nature, strength for life",
  "Made with natural ingredients",
  "Manufactured with care",
  "100% herbal & natural formula",
];

function cleanOfferText(value) {
  return String(value || "")
    .replace(/[\p{Extended_Pictographic}\uFE0F]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function OfferScrollBar() {
  const { data: offers = [] } = useQuery({
    queryKey: ["offerBar"],
    queryFn: getOfferBars,
  });

  const offerItems =
    offers.length > 0
      ? offers
        .map((offer) => cleanOfferText(offer?.text || offer?.offerText))
        .filter(Boolean)
      : fallbackOffers;

  const repeated = [...offerItems, ...offerItems, ...offerItems];

  return (
    <div className="mx-auto w-full max-w-[1560px] px-3 py-2 sm:px-4 lg:px-6">
      <div className="group relative flex h-[48px] w-full items-center overflow-hidden border-y border-[rgba(255,255,255,0.55)] bg-white/35 px-2 backdrop-blur-[2px] sm:px-3">
        <div className="flex w-max animate-offer-marquee items-center group-hover:[animation-play-state:paused]">
          {repeated.map((offer, index) => {
            return (
              <span
                key={`${offer}-${index}`}
                className="inline-flex items-center whitespace-nowrap pr-10 sm:pr-14"
              >
                <span
                  className="mx-2 flex items-center justify-center text-[13px] sm:text-[14px] leading-none text-[var(--color-sage)] opacity-80"
                  aria-hidden="true"
                >
                  {index % 2 === 0 ? "✦" : "•"}
                </span>
                {/* Offer Text */}
                <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.22em] text-[var(--color-text)] leading-none">
                  {offer}
                </span>

                {/* Separator */}
                
              </span>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes offer-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-offer-marquee {
          animation: offer-marquee 42s linear infinite;
        }
      `}</style>
    </div>
  );
}
