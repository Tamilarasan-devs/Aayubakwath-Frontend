import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { subscribeNewsletter } from "../../../services/newsletterService";

export default function FooterNewsletter({ showQuote }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await subscribeNewsletter(email);
      setStatus("success");
      setMessage("Thank you for joining our circle!");
      setEmail("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setMessage(error.response?.data?.message || "Something went wrong. Please try again.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <>
      {showQuote && (
        <div className="border-b border-[var(--color-border)] px-3 lg:px-4">
          <div className="mx-auto max-w-[1400px] bg-black px-2 py-6 text-center lg:px-3 lg:py-7">
            <p
              className="display-heading text-white/80 italic leading-none select-none"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              &quot;Ancient Herbal Wisdom for Modern Wellness&quot;
            </p>
          </div>
        </div>
      )}

      <div className="border-b border-[var(--color-border)] py-12 lg:py-14">
        <div className="max-w-[1400px] mx-auto px-2 lg:px-3 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-8 h-px bg-[var(--color-sage)]" />
              <p className="label text-[var(--color-text-muted)]">
                Join Our Circle
              </p>
            </div>
            <h2
              className="display-heading text-[var(--color-text)]"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
            >
              Get 30% Off Your First Order
            </h2>
            <p className="font-body text-[var(--color-text-secondary)] text-lg mt-2 max-w-md">
              Exclusive wellness tips, new launches, and member-only offers.
            </p>
          </div>
          <form
            className="flex flex-col w-full md:w-auto gap-2"
            onSubmit={handleSubmit}
          >
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === "loading" || status === "success"}
                className="w-full md:w-72 px-5 py-3.5 bg-white border border-[var(--color-border)] text-black text-lg
                  font-body outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all
                  placeholder:text-gray-400 rounded-lg disabled:opacity-70"
              />
              {status === "success" && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-sage)]">
                  <CheckCircle2 size={20} />
                </div>
              )}
            </div>
            <button 
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="btn-primary shrink-0 flex items-center justify-center gap-2 px-4 py-3 rounded-lg w-full md:w-72 disabled:opacity-70 transition-all"
            >
              {status === "loading" ? (
                <>Subscribing <Loader2 size={13} className="animate-spin" /></>
              ) : status === "success" ? (
                "Subscribed!"
              ) : (
                <>Subscribe <ArrowRight size={13} /></>
              )}
            </button>
            {message && (
              <p className={`text-sm mt-1 text-center md:text-left ${status === "error" ? "text-red-500" : "text-[var(--color-sage)]"}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
