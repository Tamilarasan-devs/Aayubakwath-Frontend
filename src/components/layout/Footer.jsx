import React from "react";
import { useLocation } from "react-router-dom";
import { Phone } from "lucide-react";
import FooterNewsletter from "./footer/FooterNewsletter";
import FooterContact from "./footer/FooterContact";
import FooterLinks from "./footer/FooterLinks";
import { helpLinks, quickLinks } from "./footer/FooterLinkData";
import FooterTrustBadges from "./footer/FooterTrustBadges";
import FooterBottom from "./footer/FooterBottom";

export default function Footer() {
  const { pathname } = useLocation();
  const showQuote = pathname === "/contact";

  return (
    <footer className="relative bg-[var(--color-bg-soft)] text-[var(--color-text)] overflow-hidden border-t border-[var(--color-border)]">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />

      <FooterNewsletter showQuote={showQuote} />

      <div className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[minmax(0,1.45fr)_minmax(180px,0.64fr)_minmax(220px,0.78fr)_minmax(250px,0.95fr)_minmax(220px,0.88fr)] lg:gap-8 xl:gap-9">
          <FooterContact />
          <div className="max-w-[190px]">
            <FooterLinks title="Explore" links={quickLinks} />
          </div>
          <div className="max-w-[230px]">
            <FooterLinks title="Support" links={helpLinks} />
          </div>
          <div>
            <FooterTrustBadges />
          </div>
          <div className="max-w-[240px]">
            <h4 className="label mb-4 border-b border-[var(--color-border)] pb-2.5 text-base text-[var(--color-text-muted)]">
              Working Hours
            </h4>
            <div className="font-body text-[1.08rem]">
              <div className="grid grid-cols-[6.5rem_1fr] items-center gap-x-6 gap-y-2.5 text-[var(--color-text-secondary)]">
                <span className="font-normal">Mon – Sat</span>
                <span className="whitespace-nowrap text-[var(--color-text)]">
                  9 AM – 7 PM
                </span>
                <span className="font-normal">Sunday</span>
                <span className="whitespace-nowrap text-[var(--color-text)]">
                  Closed
                </span>
              </div>
              <div className="mt-4 border-t border-[var(--color-border)] pt-4">
                <p className="text-[1.22rem] font-normal text-[var(--color-sage)]">
                  For any queries
                </p>
                <a
                  href="tel:9443157282"
                  className="group mt-2 inline-flex items-center gap-2 text-[1.05rem] font-normal text-[var(--color-text)] transition-colors hover:text-[var(--color-sage)]"
                >
                  <Phone
                    size={20}
                    className="transition-transform group-hover:-translate-y-0.5"
                  />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterBottom />
    </footer>
  );
}
