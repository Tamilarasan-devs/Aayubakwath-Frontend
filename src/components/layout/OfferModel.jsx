import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import popupImage from "../../assets/images/popup.png";

export default function OfferModal() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  const couponCode = "HURRY26";

  useEffect(() => {
    const seen = localStorage.getItem("offerSeen");

    if (!seen) {
      setTimeout(() => {
        setShow(true);
      }, 1000);
    }
  }, []);

  const closeModal = () => {
    setShow(false);
    localStorage.setItem("offerSeen", "true");
  };

  const copyCoupon = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore clipboard errors
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="relative w-full max-w-5xl rounded-[32px] overflow-hidden bg-[#f6f9e8] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.45)] border border-white/40">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/90 text-black text-2xl flex items-center justify-center shadow-md hover:scale-105 transition"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={popupImage}
            alt="Offer Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#eef6c9]/90 via-[#f8fce6]/75 to-[#eef6c9]/90" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 px-6 md:px-12 py-10 md:py-14 text-center flex flex-col items-center">
          <span className="inline-block bg-white/90 px-6 py-2 rounded-full text-sm md:text-base font-semibold text-black shadow-sm mb-4">
            Daily Wellness Health Supplement
          </span>

          <p className="text-lg md:text-2xl font-semibold text-[#3f5f12] mb-2">
            For Hot Summer Days
          </p>

          <h2 className="text-5xl md:text-8xl font-extrabold leading-none text-[#183b07] drop-shadow-sm mb-4">
            20% OFF
          </h2>

          <p className="text-base md:text-xl font-medium text-slate-700 mb-6 max-w-2xl">
            Flat discount on premium herbal wellness supplements for a limited time only.
          </p>

          {/* Coupon Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <div className="px-8 py-4 rounded-2xl border-2 border-dashed border-black bg-white/90 text-2xl font-bold tracking-widest shadow-sm">
              {couponCode}
            </div>

            <button
              onClick={copyCoupon}
              className="px-6 py-4 rounded-2xl bg-white border border-[#d7e7b6] font-semibold hover:bg-[#f4f8e8] transition"
            >
              {copied ? "Copied" : "Copy Code"}
            </button>
          </div>

          {/* CTA Button */}
          <a
            href="/productListing"
            onClick={(e) => {
              e.preventDefault();
              closeModal();
              navigate("/productListing");
            }}
            className="w-full max-w-xl bg-[#5c7f16] hover:bg-[#4f6f13] text-white text-xl font-bold py-4 rounded-full shadow-lg transition"
          >
            CLAIM YOUR DISCOUNT
          </a>

          <button
            onClick={closeModal}
            className="mt-5 text-sm text-slate-600 hover:text-black transition"
          >
            No thanks, I&apos;ll pay full price
          </button>

          {/* Footer Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 w-full max-w-4xl text-sm font-medium text-[#31480d]">
            <div className="bg-white/70 rounded-2xl py-3 px-4 shadow-sm">
              100% Natural
            </div>
            <div className="bg-white/70 rounded-2xl py-3 px-4 shadow-sm">
              Clinically Researched
            </div>
            <div className="bg-white/70 rounded-2xl py-3 px-4 shadow-sm">
              GMP Certified
            </div>
            <div className="bg-white/70 rounded-2xl py-3 px-4 shadow-sm">
              No Artificial Additives
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
