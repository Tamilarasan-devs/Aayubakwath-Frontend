import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Clock,
  Users,
  Sparkles,
  ArrowRight,
  Phone,
} from "lucide-react";
import ContactCards from "./contact/ContactCards";
import ContactForm from "./contact/ContactForm";
import ContactMap from "./contact/ContactMap";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact Us - Aayubakwath</title>
        <meta name="description" content="Get in touch with Aayubakwath for inquiries, partnerships, or support. Our team is here to help." />
      </Helmet>

      <div className="relative bg-white min-h-screen overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-gray-200/10 to-transparent pointer-events-none z-0" />
        <div className="fixed -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gray-100 blur-[120px] pointer-events-none z-0" />
        <div className="fixed top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-gray-100 blur-[120px] pointer-events-none z-0" />

        {/* Hero Section */}
        {/* <div className="relative z-10 w-full pt-2 px-3 lg:px-4">
          <div className="max-w-[1400px] mx-auto">
            <div className="relative w-full overflow-hidden rounded-2xl clean-card flex items-start shadow-sm border border-gray-100 bg-white group hover:shadow-xl transition-shadow duration-500">
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={contactBg}
                  alt="Contact Banner"
                  className="w-full h-full object-cover object-center opacity-85 scale-105 transition-transform duration-1000 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent w-full md:w-3/4 lg:w-2/3" />
              </div>

              <div className="relative z-10 px-8 sm:px-16 md:px-24 max-w-3xl py-10 lg:py-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-sage-light)] border border-[var(--color-sage)]/25 mb-8 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-sage)] relative">
                    <span className="absolute inset-0 rounded-full bg-[var(--color-sage)] animate-ping opacity-50"></span>
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-widest text-[var(--color-sage-dark)]">Get In Touch</span>
                </div>

                <h1 className="text-[36px] sm:text-[48px] md:text-[56px] font-black tracking-tighter text-[#111827] mb-6 leading-[1.05] semibold">
                  Let's Start a<br />
                  <span className="text-[#111827] relative inline-block">
                    Conversation.
                    <div className="absolute bottom-2 left-0 w-full h-4 bg-gray-100 -z-10 -rotate-2"></div>
                  </span>
                </h1>

                <p className="text-gray-900 font-medium text-xl lg:text-2xl leading-relaxed mb-6 max-w-xl">
                  Have questions, partnerships, or inquiries? Our dedicated team is here and happy to help you every step of the way.
                </p>

                <div className="mb-6 grid grid-cols-2 items-center gap-6 lg:grid-cols-3">
                  {[
                    { icon: <Clock size={20} />, label: "24/7 hrs", sub: "Customer Support" },
                    { icon: <Sparkles size={20} />, label: "100%", sub: "Dedicated Service" },
                    { icon: <Users size={20} />, label: "6 Days", sub: "Support Availability" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[var(--color-sage-light)] flex items-center justify-center text-[var(--color-sage)] shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-display font-semibold text-xl text-[#111827]">{item.label}</p>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#contact-form"
                    className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[var(--color-sage)] px-8 text-base font-semibold text-white shadow-[0_18px_36px_rgba(130,155,28,0.24)] transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--color-sage-dark)] hover:text-white hover:shadow-[0_22px_44px_rgba(130,155,28,0.28)]"
                  >
                    Send Message
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/16">
                      <ArrowRight size={16} />
                    </span>
                  </a>
                  <a
                    href="tel:+919443157282"
                    className="inline-flex h-14 items-center justify-center gap-3 rounded-full border border-[var(--color-sage)] bg-white/85 px-8 text-base font-semibold uppercase tracking-[0.12em] text-[var(--color-text)] shadow-[0_12px_28px_rgba(17,24,39,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--color-sage)] hover:text-white hover:shadow-[0_18px_36px_rgba(130,155,28,0.18)]"
                  >
                    <Phone size={17} /> Call Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Main Content */}
        <div className="max-w-[1400px] mx-auto px-3 lg:px-4 relative z-10">
          <ContactCards />
          <div id="contact-form">
            <ContactForm />
          </div>
          
        </div>
      </div>
    </>
  );
}
