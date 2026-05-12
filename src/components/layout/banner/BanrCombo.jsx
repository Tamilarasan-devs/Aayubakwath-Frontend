import React from "react";
import bannerImage from "../../../assets/images/pop.jpeg";

export default function BanrCombo() {
  return (
    <section className="w-full px-3 sm:px-4 lg:px-5 py-3 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div
          className="
            relative
            w-full
            overflow-hidden
            rounded-2xl
            shadow-lg
          "
        >
          <img
            src={bannerImage}
            alt="Offer Banner"
            loading="lazy"
            decoding="async"
            className="
              w-full
              h-auto
              block
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
            "
          />
        </div>
      </div>
    </section>
  );
}