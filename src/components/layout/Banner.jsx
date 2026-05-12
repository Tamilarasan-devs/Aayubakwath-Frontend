import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getHomeBanners } from "../../services/offerService";
import { API_URL } from "../../utils/axiosInstance";


import heroBg1 from "../../assets/images/Cholesterol.jpeg";
import heroBg2 from "../../assets/images/vitality.jpeg";
import heroBg3 from "../../assets/images/sugar.jpeg";
import heroBg4 from "../../assets/images/homebanner.jpeg";

const FALLBACK_SLIDES = [
  { id: 1, image: heroBg1, alt: "Cholesterol wellness banner" },
  { id: 2, image: heroBg2, alt: "Vitality wellness banner" },
  { id: 3, image: heroBg3, alt: "Blood sugar wellness banner" },
  { id: 4, image: heroBg4, alt: "Aayubakwath wellness banner" },
];

const INTERVAL = 6000;

export default function Banner() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const { data: apiBanners } = useQuery({
    queryKey: ["home-banners"],
    queryFn: getHomeBanners,
  });

  const activeSlides =
    apiBanners && apiBanners.length > 0
      ? apiBanners.map((b) => ({
          id: b.id,
          image: b.image?.startsWith("http")
            ? b.image
            : `${API_URL}${b.image}`,
          alt: "Aayubakwath Banner",
          link: b.link,
        }))
      : FALLBACK_SLIDES;

  const goTo = (idx) => setCurrent(idx);
  const prev = () =>
    goTo((current - 1 + activeSlides.length) % activeSlides.length);
  const next = () => goTo((current + 1) % activeSlides.length);

  useEffect(() => {
    if (paused || activeSlides.length <= 1) return undefined;

    const timer = window.setTimeout(() => {
      setCurrent((slide) => (slide + 1) % activeSlides.length);
    }, INTERVAL);

    return () => window.clearTimeout(timer);
  }, [current, paused, activeSlides.length]);

  return (
    <section
      className="relative w-full aspect-[1920/700] overflow-hidden bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {activeSlides.map((slide, index) => (
        <a
          key={slide.id}
          href={slide.link || "#"}
          className={`absolute inset-0 h-full w-full block transition-opacity duration-700
            ${index === current ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="h-full w-full object-cover object-center"
          />
        </a>
      ))}

      {activeSlides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="hidden sm:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10
              h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full
              bg-white/20 hover:bg-white/35 border border-white/30 backdrop-blur-sm transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>

          <button
            type="button"
            onClick={next}
            className="hidden sm:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10
              h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full
              bg-white/20 hover:bg-white/35 border border-white/30 backdrop-blur-sm transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={20} className="text-white" />
          </button>
        </>
      )}
    </section>
  );
}
