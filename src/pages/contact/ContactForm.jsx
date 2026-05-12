import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  CheckCircle2,
  Send,
  Users,
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  Clock,
  Sparkles
} from "lucide-react";

import { submitContactForm } from "../../services/contactService";
import { toast } from "react-toastify";
import useInView from "../../hooks/useInView";

const whyContactUs = [
  "Product & Service Inquiries",
  "Business Partnerships",
  "Distribution Queries",
  "General Questions",
];

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

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const mutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      const phoneNumber = "919443157282";
      const waMessage = `Hello, I would like to contact you.\n\nName: ${form.name.trim()}\nPhone: ${form.phone.trim()}\nEmail: ${form.email.trim()}\nMessage: ${form.message.trim()}`;
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`, "_blank");

      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
      toast.success("Message sent! We'll be in touch within 24 hours.");
      setTimeout(() => setSubmitted(false), 5000);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to send message. Please try again.");
    },
  });

  const sending = mutation.isPending;

  const onSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 items-stretch gap-8 lg:gap-12 mb-12">
      {/* Left Panel */}
      <div className="lg:col-span-2 h-full">
        <Reveal delay={0.1} className="h-full">
          <div className="rounded-[28px] border border-[#e6ded2] bg-white p-8 lg:p-10 shadow-[0_24px_80px_rgba(90,110,82,0.10)] h-full min-h-[700px] relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-sage-light)] border border-[var(--color-sage)]/25 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-sage)]" />
                <span className="text-sm font-semibold uppercase tracking-widest text-[var(--color-sage-dark)]">Why Contact Us</span>
              </div>

              <h3 className="font-display text-3xl font-semibold text-[#111827] mb-3">
                Every message gets a personal reply.
              </h3>
              <p className="text-gray-600 font-medium text-base leading-relaxed mb-8">
                We value every conversation — our team reads and responds to everything personally.
              </p>

              <div className="space-y-4 mb-8">
                {whyContactUs.map((t, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-sage-light)] flex items-center justify-center text-[var(--color-sage)] flex-shrink-0">
                      <CheckCircle2 size={14} />
                    </div>
                    <span className="text-base font-semibold text-[#111827]">{t}</span>
                  </div>
                ))}
              </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
  {/* Info Section */}


  {/* Stats */}
  <div className="mt-8 grid grid-cols-2 gap-4">
    {[
      {
        icon: <Clock size={18} />,
        label: "24/7 Hrs",
        sub: "Customer Support",
      },
      {
        icon: <Sparkles size={18} />,
        label: "100%",
        sub: "Dedicated Service",
      },
    ].map((item, i) => (
      <div
        key={i}
        className="rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:border-gray-200 hover:bg-white"
      >
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-sage)]/10 text-[var(--color-sage)]">
          {item.icon}
        </div>

        <p className="font-display text-xl font-bold text-gray-900">
          {item.label}
        </p>

        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
          {item.sub}
        </p>
      </div>
    ))}
  </div>
</div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Form Card */}
      <div className="lg:col-span-3 h-full">
        <Reveal delay={0.15} className="h-full">
          <div className="rounded-[28px] overflow-hidden border border-[#e6ded2] bg-white shadow-[0_24px_80px_rgba(90,110,82,0.10)] h-full min-h-[700px]">
            <div className="border-b border-[var(--color-sage)]/30 bg-[#2f3328] px-6 py-5 lg:px-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-[var(--color-sage-light)] text-[var(--color-sage-dark)] flex items-center justify-center shadow-sm border border-white/15">
                  <Send size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-sage-light)]">Contact Form</p>
                  <h3
                    className="font-display font-semibold text-3xl drop-shadow-sm"
                    style={{ color: "#ffffff" }}
                  >
                    Send Us a Message
                  </h3>
                </div>
              </div>
            </div>
            <div className="p-6 lg:p-8 bg-gradient-to-b from-white to-gray-50/70">
              {submitted && (
                <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-emerald-50 border border-emerald-100 mb-6">
                  <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
                  <p className="text-base font-semibold text-emerald-700">Message sent! We&apos;ll be in touch within 24 hours.</p>
                </div>
              )}

              <form onSubmit={onSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold uppercase tracking-[0.14em] mb-2 text-[#111827]/60">Full Name *</label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-sage)] transition-colors pointer-events-none">
                        <Users size={18} />
                      </span>
                      <input id="name" name="name" type="text" value={form.name} onChange={onChange} required placeholder="Your name"
                        className="w-full h-16 pl-12 pr-4 rounded-2xl border border-[#e6ded2] bg-white text-lg text-[#111827] placeholder:text-gray-400 outline-none shadow-sm transition-all duration-300 focus:border-[#5A6E52] focus:shadow-[0_0_0_4px_rgba(90,110,82,0.12)]" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold uppercase tracking-[0.14em] mb-2 text-[#111827]/60">Phone</label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-sage)] transition-colors pointer-events-none">
                        <Phone size={18} />
                      </span>
                      <input id="phone" name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="+91 98765 43210"
                        className="w-full h-16 pl-12 pr-4 rounded-2xl border border-[#e6ded2] bg-white text-lg text-[#111827] placeholder:text-gray-400 outline-none shadow-sm transition-all duration-300 focus:border-[#5A6E52] focus:shadow-[0_0_0_4px_rgba(90,110,82,0.12)]" />
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="email" className="block text-sm font-semibold uppercase tracking-[0.14em] mb-2 text-[#111827]/60">Email Address *</label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-sage)] transition-colors pointer-events-none">
                      <Mail size={18} />
                    </span>
                    <input id="email" name="email" type="email" value={form.email} onChange={onChange} required placeholder="you@example.com"
                      className="w-full h-16 pl-12 pr-4 rounded-2xl border border-[#e6ded2] bg-white text-lg text-[#111827] placeholder:text-gray-400 outline-none shadow-sm transition-all duration-300 focus:border-[#5A6E52] focus:shadow-[0_0_0_4px_rgba(90,110,82,0.12)]" />
                  </div>
                </div>

                <div className="mb-8">
                  <label htmlFor="message" className="block text-sm font-semibold uppercase tracking-[0.14em] mb-2 text-[#111827]/60">Message *</label>
                  <div className="relative group">
                    <span className="absolute left-4 top-4 text-gray-400 group-focus-within:text-[var(--color-sage)] transition-colors pointer-events-none">
                      <MessageSquare size={18} />
                    </span>
                    <textarea id="message" name="message" value={form.message} onChange={onChange} required rows={5} placeholder="Tell us how we can help…"
                      className="w-full min-h-[210px] pl-12 pr-4 py-4 rounded-2xl border border-[#e6ded2] bg-white text-lg text-[#111827] placeholder:text-gray-400 outline-none shadow-sm transition-all duration-300 focus:border-[#5A6E52] focus:shadow-[0_0_0_4px_rgba(90,110,82,0.12)] resize-none" />
                  </div>
                </div>

                <button type="submit" disabled={sending}
                  className="bg-[var(--color-sage)] text-white rounded-2xl w-full h-16 text-base font-semibold uppercase tracking-[0.16em] shadow-xl shadow-[rgba(130,155,28,0.18)] hover:-translate-y-1 hover:bg-[var(--color-sage-dark)] hover:text-white hover:shadow-2xl hover:shadow-[rgba(130,155,28,0.24)] transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                  {sending ? "Sending..." : "Send Message"} <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
