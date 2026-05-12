import React from "react";
import bulkHero from "../../assets/images/bulk.jpg";
import { ArrowRight, Phone } from "lucide-react";

export default function DealershipHero() {
  return (
    <div className="relative z-10 w-full mb-16 pt-5 px-3 lg:px-4">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start pb-8 lg:pb-12 lg:pr-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--color-sage)]/25 mb-6 shadow-sm bg-[var(--color-sage-light)]">
            <span className="w-2 h-2 rounded-full bg-[var(--color-sage)] relative">
              <span className="absolute inset-0 rounded-full bg-[var(--color-sage)] animate-ping opacity-50"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-sage-dark)]">
              Partnership Program
            </span>
          </div>

          <h1 className="text-[clamp(2.6rem,6vw,4.5rem)] font-semibold tracking-tighter text-[#111827] mb-8 leading-[1.05] break-words">
            Grow Your Business,
            <br />
            <span className="text-[var(--color-sage)] font-display italic tracking-tight">
              Naturally.
            </span>
          </h1>

          <p className="text-gray-800 font-medium text-[clamp(1.05rem,2.2vw,1.5rem)] leading-[1.8] mb-8 max-w-lg">
            Join our premium network of 50+ active dealers across India earning exceptional margins on 100% pure herbal wellness supplements.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <a
              href="#enquiry-form"
              className="bg-[var(--color-sage)] text-white rounded-xl px-12 h-16 text-[16px] font-black uppercase tracking-widest shadow-xl shadow-[rgba(130,155,28,0.22)] hover:-translate-y-1 hover:bg-[var(--color-sage-dark)] hover:shadow-2xl hover:shadow-[rgba(130,155,28,0.28)] transition-all flex items-center justify-center gap-3"
            >
              Start Partnership <ArrowRight size={16} />
            </a>
            <a
              href="tel:+919443157282"
              className="flex items-center justify-center gap-3 px-10 h-16 rounded-xl bg-white border-2 border-[var(--color-sage)]/25 text-[13px] font-black uppercase tracking-widest text-[#111827] hover:border-[var(--color-sage)] hover:bg-[var(--color-sage-light)] hover:text-[var(--color-sage-dark)] transition-all"
            >
              <Phone size={16} /> Call Us
            </a>
          </div>
        </div>

        {/* Right Image Container */}
        <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end ">
          <div className="relative w-full max-w-2xl  p-5">
            <img
              src={bulkHero}
              alt="Partnership Program"
              className="w-full h-full object-contain object-center custum-block"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
