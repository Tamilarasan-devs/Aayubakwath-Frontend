import React, { useEffect, useRef, useState } from "react";
import banner from "../../../assets/images/ban-2.jpg";

export default function ShopPageBanner() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full overflow-hidden px-4 sm:px-5 lg:px-6 py-4 sm:py-5">
  <div className="mx-auto w-full max-w-[1400px]">
    <div
      className="
        relative
        overflow-hidden
        rounded-2xl
        shadow-lg
      "
    >
      <img
        src={banner}
        alt="Wellness offer banner"
        className="w-full h-auto block object-cover"
      />
    </div>
  </div>
</section>
  );
}