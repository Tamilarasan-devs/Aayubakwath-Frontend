import { useState } from "react";
import {
  Gift,
  X,
  Users,
  Sparkles,
  Copy,
  Check,
  ChevronRight,
} from "lucide-react";

export default function RewardsCard() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("SBLS-REF-2025");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-40 right-3 sm:bottom-28 sm:right-8 z-[9999]">
      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
        @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        .modal-anim { animation: fadeIn 0.3s cubic-bezier(.34,1.56,.64,1) both; }
        .slide-up { animation: slideUp 0.4s ease both; }
        .float-anim { animation: float 3s ease-in-out infinite; }
      `}</style>

      <button
        onClick={() => setOpen(true)}
        className="relative p-3.5 rounded-xl text-white shadow-[var(--shadow-xl)] transition-all hover:scale-105 active:scale-95 float-anim"
        style={{ background: "var(--color-sage)" }}
      >
        <Gift size={22} />
        <span
          className="absolute -top-1 -right-1.5 w-5 h-5 rounded-full text-white text-[9px] font-semibold flex items-center justify-center border-2 border-white"
          style={{ background: "var(--color-sage-dark)" }}
        >
          3
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4"
          style={{ backdropFilter: "blur(4px)" }}
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div
            className="modal-anim w-full max-w-sm rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-xl)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <div
              className="relative overflow-hidden px-6 pt-8 pb-10"
              style={{ background: "var(--color-sage)" }}
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white opacity-[0.04]" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10 bg-white" />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
                  backgroundSize: "20px 20px",
                }}
              />

              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-all hover:bg-white/20"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                <X size={13} className="text-white" />
              </button>

              <div className="relative z-10 text-center">
                <div
                  className="w-14 h-14 rounded-[var(--radius-lg)] flex items-center justify-center mx-auto mb-4 shadow-[var(--shadow-lg)]"
                  style={{ background: "var(--color-sage-dark)" }}
                >
                  <Gift size={24} className="text-white" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-8 h-px opacity-50 bg-white" />
                  <span className="text-[9px] tracking-[3px] uppercase font-semibold text-white/60">
                    Rewards Program
                  </span>
                  <div className="w-8 h-px opacity-50 bg-white" />
                </div>
                <h2 className="text-xl font-semibold text-white leading-tight mb-2 font-display">
                  Welcome to
                  <br />
                  <span className="text-white/70 font-normal not-italic">
                    Aayubakwath Rewards
                  </span>
                </h2>
                <p className="text-white/50 text-xs leading-relaxed max-w-xs mx-auto">
                  Earn points with every purchase and redeem them for exclusive
                  discounts.
                </p>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-5">
                <svg
                  viewBox="0 0 400 24"
                  preserveAspectRatio="none"
                  className="w-full h-full"
                >
                  <path d="M0,0 Q200,24 400,0 L400,24 L0,24 Z" fill="white" />
                </svg>
              </div>
            </div>

            <div className="bg-white px-6 pb-6 -mt-1">
              <div
                className="flex gap-3 mb-5 slide-up"
                style={{ animationDelay: "0.1s" }}
              >
                <button className="btn-sage flex-1 py-3 text-[12px] flex items-center justify-center gap-2">
                  <Sparkles size={13} />
                  Join Now
                </button>
                <button className="btn-outline flex-1 py-3 text-[12px]">
                  Sign In
                </button>
              </div>

              <div
                className="rounded-[var(--radius-lg)] overflow-hidden slide-up"
                style={{
                  border: "1.5px solid var(--color-border)",
                  animationDelay: "0.2s",
                }}
              >
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-soft)]">
                  <div className="w-7 h-7 rounded-md flex items-center justify-center bg-white border border-[var(--color-border)]">
                    <Users size={12} className="text-[var(--color-text)]" />
                  </div>
                  <p className="font-semibold text-[var(--color-text)] text-sm">
                    Referral Program
                  </p>
                  <span className="ml-auto text-[9px] tracking-widest uppercase font-semibold px-2 py-0.5 rounded-full bg-[var(--color-sage-light)] text-[var(--color-sage-dark)]">
                    Active
                  </span>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-[var(--radius-md)] text-center bg-[var(--color-sage-light)] border border-[var(--color-sage)]/15">
                      <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest font-semibold mb-1">
                        They get
                      </p>
                      <p className="font-semibold text-[var(--color-sage-dark)] text-sm">
                        5% Off
                      </p>
                      <p className="text-[10px] text-[var(--color-sage)]">
                        First order coupon
                      </p>
                    </div>
                    <div className="p-3 rounded-[var(--radius-md)] text-center bg-[var(--color-bg-soft)] border border-[var(--color-border)]">
                      <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest font-semibold mb-1">
                        You get
                      </p>
                      <p className="font-semibold text-[var(--color-text)] text-sm">
                        100 Points
                      </p>
                      <p className="text-[10px] text-[var(--color-text-secondary)]">
                        ≈ ₹100 off
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-[var(--radius-md)] bg-[var(--color-bg-soft)] border border-dashed border-[var(--color-border)]">
                    <span className="text-xs text-[var(--color-text-muted)] font-medium flex-1">
                      Your code:
                    </span>
                    <span className="text-sm font-semibold text-[var(--color-text)] tracking-wider">
                      SBLS-REF-2025
                    </span>
                    <button
                      onClick={handleCopy}
                      className="w-7 h-7 rounded-md flex items-center justify-center transition-all hover:scale-110 bg-white border border-[var(--color-border)]"
                    >
                      {copied ? (
                        <Check size={11} className="text-[var(--color-sage)]" />
                      ) : (
                        <Copy size={11} className="text-[var(--color-text)]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
