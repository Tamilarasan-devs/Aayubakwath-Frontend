import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Users,
  Mail,
  Phone,
  MapPin,
  Package,
  BadgePercent,
  HeadphonesIcon,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { submitBulkOrderForm } from "../../services/dealershipService";
import { toast } from "react-toastify";
import Reveal from "./Reveal";

const inputFields = [
  { name: "name", label: "Full Name", type: "text", icon: Users, col: "half" },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    icon: Mail,
    col: "half",
  },
  {
    name: "mobile",
    label: "Mobile Number",
    type: "tel",
    icon: Phone,
    col: "half",
  },
  {
    name: "state",
    label: "State / Region",
    type: "text",
    icon: MapPin,
    col: "half",
  },
  {
    name: "productQuantity",
    label: "Product / Quantity",
    type: "text",
    icon: Package,
    col: "half",
  },
  {
    name: "totalQuantity",
    label: "Total Quantity",
    type: "text",
    icon: BadgePercent,
    col: "half",
  },
];

export default function DealershipForm() {
  const formLabelClass =
    "block text-[.7rem] font-semibold uppercase tracking-[0.18em] mb-2 text-[#111827]/60";
  const formInputClass =
    "w-full h-14 pl-12 pr-4 rounded-2xl border border-[#e6ded2] bg-white text-base text-[#111827] placeholder:text-gray-400 outline-none shadow-sm transition-all duration-300 focus:border-[var(--color-sage)] focus:shadow-[0_0_0_4px_rgba(130,155,28,0.14)]";
  const formTextareaClass =
    "w-full min-h-[170px] pl-12 pr-4 py-4 rounded-2xl border border-[#e6ded2] bg-white text-base text-[#111827] placeholder:text-gray-400 outline-none shadow-sm transition-all duration-300 focus:border-[var(--color-sage)] focus:shadow-[0_0_0_4px_rgba(130,155,28,0.14)] resize-none";
  const formSubmitClass =
    "bg-[var(--color-sage)] text-white rounded-2xl w-full h-14 text-[14px] font-semibold uppercase tracking-[0.16em] shadow-xl shadow-[rgba(130,155,28,0.22)] hover:-translate-y-1 hover:bg-[var(--color-sage-dark)] hover:text-white hover:shadow-2xl hover:shadow-[rgba(130,155,28,0.28)] transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0";

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    state: "",
    productQuantity: "",
    totalQuantity: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const mutation = useMutation({
    mutationFn: submitBulkOrderForm,
    onSuccess: () => {
      const phoneNumber = "919443157282";
      const waMessage = `Hello, I am interested in bulk purchase.\n\nName: ${form.name.trim()}\nEmail: ${form.email.trim()}\nMobile: ${form.mobile.trim()}\nState: ${form.state.trim()}\nProduct / Quantity: ${form.productQuantity.trim()}\nTotal Quantity: ${form.totalQuantity.trim()}\nDetails: ${form.details.trim()}`;
      window.open(
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`,
        "_blank",
      );

      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        mobile: "",
        state: "",
        productQuantity: "",
        totalQuantity: "",
        details: "",
      });
      toast.success("Enquiry sent! We'll get back to you within 24–48 hours.");
      setTimeout(() => setSubmitted(false), 3800);
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
          "Failed to send enquiry. Please try again.",
      );
    },
  });

  const sending = mutation.isPending;

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      name: form.name.trim(),
      email: form.email.trim(),
      mobile: form.mobile.trim(),
      state: form.state.trim(),
      productQuantity: form.productQuantity.trim(),
      totalQuantity: form.totalQuantity.trim(),
      details: form.details.trim(),
    });
  };

  return (
    <>
      <div className="lg:col-span-3">
        <Reveal delay={0.15}>
          <div className="rounded-2xl overflow-hidden border border-[#e6ded2] bg-white shadow-[0_24px_80px_rgba(90,110,82,0.10)] h-full">
            <div className="bg-[#2f3328] border-b border-[var(--color-sage)]/30 px-6 py-5 lg:px-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-[var(--color-sage-light)] text-[var(--color-sage-dark)] flex items-center justify-center shadow-sm border border-white/15">
                  <Package size={20} />
                </div>
                <div>
                  <p className="text-[.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-sage-light)]">
                    Partnership Enquiry
                  </p>
                  <h3
                    className="font-display font-semibold text-2xl drop-shadow-sm"
                    style={{ color: "#ffffff" }}
                  >
                    Tell Us What You Need
                  </h3>
                </div>
              </div>
            </div>
            <div className="p-6 lg:p-8 bg-gradient-to-b from-white to-gray-50/70">
              {submitted && (
                <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-[var(--color-sage-light)] border border-[var(--color-sage)]/20 mb-6">
                  <CheckCircle2
                    size={20}
                    className="text-[var(--color-sage)] flex-shrink-0"
                  />
                  <p className="text-sm font-semibold text-[var(--color-sage-dark)]">
                    Enquiry sent! We&apos;ll get back to you within 24–48
                    hours.
                  </p>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {inputFields.map((field) => {
                    const Icon = field.icon;
                    return (
                      <div
                        key={field.name}
                        className={
                          field.col === "full" ? "sm:col-span-2" : ""
                        }
                      >
                        <label
                          htmlFor={field.name}
                          className={formLabelClass}
                        >
                          {field.label}
                        </label>
                        <div className="relative group">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-sage)] transition-colors pointer-events-none">
                            <Icon size={18} />
                          </span>
                          <input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            placeholder={field.label}
                            value={form[field.name]}
                            onChange={handleChange}
                            required
                            className={formInputClass}
                          />
                        </div>
                      </div>
                    );
                  })}
                  <div className="sm:col-span-2">
                    <label htmlFor="details" className={formLabelClass}>
                      Additional Details
                    </label>
                    <div className="relative group">
                      <span className="absolute left-4 top-4 text-gray-400 group-focus-within:text-[var(--color-sage)] transition-colors pointer-events-none">
                        <HeadphonesIcon size={18} />
                      </span>
                      <textarea
                        id="details"
                        name="details"
                        rows={4}
                        placeholder="Tell us about your requirements, location, and business..."
                        value={form.details}
                        onChange={handleChange}
                        className={formTextareaClass}
                      />
                    </div>
                  </div>
                </div>
                <div className="h-px my-8 bg-gray-100" />
                <div className="flex flex-col gap-6">
                  <button
                    type="submit"
                    disabled={sending}
                    className={formSubmitClass}
                  >
                    {sending ? "Sending..." : "Send Enquiry"}{" "}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </div>

      {submitted && (
        <div
          className="fixed bottom-8 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl border border-[var(--color-sage)]/20 bg-white shadow-2xl"
          style={{
            animation: "toastIn .45s cubic-bezier(.34,1.56,.64,1) both",
          }}
        >
          <span className="text-[var(--color-sage)]">
            <CheckCircle2 size={24} />
          </span>
          <div>
            <p className="m-0 text-sm font-semibold text-[#111827]">
              Enquiry Sent!
            </p>
            <p className="m-0 text-xs text-gray-500">
              We&apos;ll get back to you within 24–48 hours.
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes toastIn {
          0% { opacity: 0; transform: translateY(20px) scale(.93); }
          65% { transform: translateY(-3px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
