import { useState, useEffect } from "react";
import { X } from "lucide-react";
import expertImage from "../../assets/images/health_expert.jpg";

export default function ConsultationModal() {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
      // Small delay to trigger CSS entry transition
      setTimeout(() => setAnimate(true), 50);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setAnimate(false);
    // Wait for exit transition to complete before unmounting
    setTimeout(() => {
      setShow(false);
    }, 500); // 500ms is standard for transition duration
  };

  const handleConsult = () => {
    handleClose();
    window.location.href = "/contact";
  };

  if (!show) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-[9999] max-w-[450px] w-[calc(100%-48px)] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden flex transition-all duration-500 ease-out transform ${
        animate ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95 pointer-events-none"
      }`}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 z-20 p-1 rounded-full bg-white/80 hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors shadow-sm"
        aria-label="Close modal"
      >
        <X size={18} />
      </button>

      {/* Left side text and CTA */}
      <div className="flex-1 p-6 flex flex-col justify-between pr-2">
        <div>
          <h3 className="font-bold text-[#1f2937] text-lg md:text-xl leading-tight pr-4">
            Looking to HEAL naturally? Our Health Experts are here to help!
          </h3>
          <p className="text-sm text-gray-500 mt-2 font-medium">
            Consult Our Wellness Experts
          </p>
        </div>
        <button
          onClick={handleConsult}
          className="mt-6 self-start bg-black hover:bg-neutral-800 text-white text-sm font-semibold py-2.5 px-6 rounded-lg transition-colors"
        >
          Consult us
        </button>
      </div>

      {/* Right side expert image */}
      <div className="w-[140px] md:w-[160px] relative bg-[#f3f4f6] overflow-hidden self-stretch flex items-end">
        <img
          src={expertImage}
          alt="Health Expert"
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  );
}
