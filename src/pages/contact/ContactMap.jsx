import React from "react";
import useInView from "../../hooks/useInView";

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function ContactMap() {
  return (
    <Reveal>
      <div className="mb-12">
        <div className="mb-6">

          <div className="flex items-center justify-center gap-4 py-2">
            <div className="w-8 h-px bg-[var(--color-sage)]" />
            <p
              className="label whitespace-nowrap"
              style={{ fontSize: "clamp(1.25rem, 4vw, 2rem)", fontWeight: "500" }}
            >
              Location
            </p>
            <div className="w-8 h-px bg-[var(--color-sage)]" />
          </div>

          {/* <h2 className="font-display text-3xl lg:text-4xl font-black tracking-tight text-[var(--color-sage)]">Find Us on the Map</h2> */}
           <h2
          className="display-heading !text-left text-[var(--color-text)] mb-4"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
        >
          Find Us on the Map
        </h2>
        </div>
        <div className="clean-card rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border-b border-gray-100 gap-4">
            <div>
              <h3 className="font-display font-semibold text-xl text-[var(--color-sage)]">Sri Bakawathi Life Science</h3>
              <p className="text-base text-gray-500 font-medium mt-1">No:1/770, K.Ayyampalayam(PO), Palladam, TN 641662</p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Live Map</span>
            </div>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d250564.89793483046!2d77.3439278!3d11.1076742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3ba9ababa3eecfcf%3A0xd5408d394061bcb5!2sSri%20Bakawathi%20Life%20Science%2C%20No%3A1%2F770%2C%20K.Ayyampalayam(PO)%2C%20K.S.N%20Puram(Via)%2C%20Palladam%2C%20Tamil%20Nadu%20641662!3m2!1d10.982724!2d77.2239895!5e0!3m2!1sen!2sin!4v1772442468303!5m2!1sen!2sin"
            width="100%"
            height="420"
            style={{ border: 0, display: "block" }}
            allowFullScreen=""
            loading="lazy"
            title="Sri Bakawathi Life Science Location"
          />
        </div>
      </div>
    </Reveal>
  );
}
