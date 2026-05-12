import React, { useState, useEffect, useRef } from "react";
import {
  Shield,
  BookOpen,
  Globe,
  AlertTriangle,
  Scale,
  Power,
  FileText,
  Leaf,
  Link,
  ChevronRight,
} from "lucide-react";

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const sections = [
  {
    id: "terms-of-use",
    icon: FileText,
    title: "Terms of Use",
    paragraphs: [
      `This website (the "Site") is owned and operated by Aayubakwath ("we" or "us") for your information, education, communication and, where applicable, the purchase of products and services. Please feel free to browse the Site; however, your access to and use of the Site is subject to the following Terms of Use ("Terms") and all applicable laws.`,
      `By accessing and browsing this Site, you accept, without limitation or qualification, these Terms. If you do not agree with any of these Terms, you should not use this Site. We reserve the right, in our sole discretion, to modify, alter or otherwise update these Terms at any time, and you agree to be bound by such modifications.`,
    ],
  },
  {
    id: "intellectual-property",
    icon: Shield,
    title: "Intellectual Property Rights",
    paragraphs: [
      `All material on this Site ("Material"), including but not limited to text, images, graphics, product descriptions and illustrations, is protected by intellectual property laws and is owned and controlled by us or by third parties who have licensed their material to us. Material from this Site may not be copied, reproduced, republished, uploaded, posted, transmitted, or distributed in any way.`,
      `You may not modify the Material or use the Material for any commercial purpose. The trademarks, logos and service marks displayed on the Site are our property or the property of third parties, and you are prohibited from using them without prior written permission.`,
    ],
  },
  {
    id: "use-of-site",
    icon: BookOpen,
    title: "Use of the Site",
    paragraphs: [
      `This Site is intended for personal, non-commercial use. You agree not to use the Site for any unlawful purpose or in any manner that could damage, disable or impair the Site. You also agree not to attempt to gain unauthorized access to any part of the Site or its systems.`,
      `Where applicable, any orders placed through the Site constitute an offer to purchase products, and we reserve the right to accept or reject such offers at our discretion.`,
    ],
  },
  {
    id: "health-disclaimer",
    icon: Leaf,
    title: "Health and Information Disclaimer",
    paragraphs: [
      `The information provided on this Site is for general informational and educational purposes only and is not intended as medical advice. The content is not a substitute for professional medical consultation, diagnosis or treatment.`,
      `Any information relating to health, wellness, or products has not necessarily been evaluated by regulatory authorities. You should consult a qualified healthcare professional before using any product or relying on any information provided on this Site. Your reliance on such information is strictly at your own risk.`,
    ],
  },
  {
    id: "linked-sites",
    icon: Link,
    title: "Linked Sites",
    paragraphs: [
      `We may provide links to websites operated by third parties ("Third Party Sites"). We do not control such sites and are not responsible for their content, accuracy, or availability. Accessing Third Party Sites is done at your own risk.`,
    ],
  },
  {
    id: "disclaimer-warranties",
    icon: AlertTriangle,
    title: "Disclaimer of Warranties",
    paragraphs: [
      `To the fullest extent permitted by applicable law, this Site and all materials are provided "as is" without warranty of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose or non-infringement.`,
      `We do not warrant that the Site will be uninterrupted, error-free or free from viruses or other harmful components. We make no representations or guarantees as to the accuracy, completeness or reliability of the material.`,
    ],
  },
  {
    id: "limitation-liability",
    icon: Scale,
    title: "Limitation of Liability",
    paragraphs: [
      `Under no circumstances shall we or any party involved in creating, producing or delivering the Site be liable for any direct, indirect, incidental, consequential or punitive damages arising out of your access to or use of the Site or the material.`,
      `You agree that your use of the Site is at your sole risk and that you will not rely solely on the material provided without seeking professional advice where appropriate.`,
    ],
  },
  {
    id: "limitation-remedy",
    icon: Scale,
    title: "Limitation of Remedy",
    paragraphs: [
      `If you are dissatisfied with the Site or any Material, your sole and exclusive remedy is to discontinue using the Site.`,
    ],
  },
  {
    id: "jurisdictional",
    icon: Globe,
    title: "Jurisdictional Issues",
    paragraphs: [
      `This Site is controlled and operated by us from our offices in India. We make no representation that the Material is appropriate or available for use in other locations. Those who choose to access this Site from other locations do so on their own initiative and are responsible for compliance with local laws.`,
      `These Terms shall be governed by and construed in accordance with the laws of India, and the courts of the relevant jurisdiction shall have exclusive jurisdiction.`,
    ],
  },
  {
    id: "termination",
    icon: Power,
    title: "Termination",
    paragraphs: [
      `This agreement is effective unless terminated by us. We may terminate or suspend your access to the Site at any time without notice if you fail to comply with these Terms. Upon termination, you must destroy all materials obtained from the Site.`,
      `The provisions relating to disclaimers, limitation of liability and governing law shall survive termination.`,
    ],
  },
  {
    id: "other",
    icon: FileText,
    title: "Other",
    paragraphs: [
      `If any provision of these Terms is found to be unlawful, void or unenforceable, that provision shall be deemed severable and shall not affect the validity of the remaining provisions.`,
      `We may revise these Terms at any time by updating this page. Your continued use of the Site signifies your agreement to such revisions.`,
    ],
  },
];

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-[#fafaf9] min-h-screen">
      {/* ── Hero Banner ── */}
      <div className="bg-[#111827] text-white">
        <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-16 md:py-24 text-center">
          <p className="text-xs font-black tracking-[0.3em] uppercase text-gray-400 mb-4 flex items-center justify-center gap-3">
            <span className="w-6 h-px bg-gray-400 inline-block" />
            Legal
            <span className="w-6 h-px bg-gray-400 inline-block" />
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Terms of Use
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Please read these terms carefully before using our services. By
            browsing this site, you agree to be bound by these terms.
          </p>
          <p className="text-gray-500 text-sm mt-6">Last updated: April 2026</p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-12 md:py-16 flex flex-col lg:flex-row gap-10 items-start">
        {/* ── Sticky Table of Contents ── */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-24 self-start">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
            <p className="text-[11px] font-black tracking-widest uppercase text-gray-400 mb-4">
              Contents
            </p>
            <nav className="space-y-1">
              {sections.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-sm transition-all ${
                      activeSection === s.id
                        ? "bg-[#111827] text-white font-semibold"
                        : "text-gray-500 hover:bg-gray-50 hover:text-[#111827]"
                    }`}
                  >
                    <Icon size={14} className="shrink-0" />
                    <span className="leading-tight">{s.title}</span>
                    {activeSection === s.id && (
                      <ChevronRight size={12} className="ml-auto shrink-0" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 min-w-0 space-y-6">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <Reveal key={section.id} delay={idx * 0.04}>
                <div
                  id={section.id}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm p-7 md:p-9 scroll-mt-28"
                >
                  {/* Section header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#111827] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={18} className="text-white" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-semibold text-[#111827] leading-snug">
                      {section.title}
                    </h2>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-100 mb-5" />

                  {/* Paragraphs */}
                  <div className="space-y-4">
                    {section.paragraphs.map((para, i) => (
                      <p
                        key={i}
                        className="text-gray-500 leading-relaxed text-[15px]"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}

          {/* ── Bottom CTA ── */}
          <Reveal delay={0.1}>
            <div className="bg-[#111827] text-white rounded-2xl p-8 md:p-10 text-center">
              <h3 className="text-xl font-semibold mb-2">
                Have questions about our terms?
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Our team is happy to help clarify anything in this document.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#111827] font-semibold text-sm px-6 py-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                Contact Us
                <ChevronRight size={14} />
              </a>
            </div>
          </Reveal>
        </main>
      </div>
    </div>
  );
}
