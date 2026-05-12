import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../../../assets/images/logo.jpg";

const socials = [
  { icon: <FaFacebookF size={13} />, link: "https://www.facebook.com/", label: "Facebook" },
  { icon: <FaInstagram size={13} />, link: "https://www.instagram.com/Aayubakwath/", label: "Instagram" },
  { icon: <FaTwitter size={13} />, link: "https://x.com/Aayubakwath", label: "Twitter" },
  { icon: <FaYoutube size={13} />, link: "https://studio.youtube.com/channel/UCx9SZTz-XdtUMtKz5pZsJcg/editing/profile", label: "YouTube" },
  { icon: <FaLinkedinIn size={13} />, link: "https://www.linkedin.com/in/sri-bakawathi-life-science-932a143b2/", label: "LinkedIn" },
];

export default function FooterContact() {
  return (
    <div className="max-w-[480px]">
      <div className="mb-5 flex items-center gap-4">
        <a href="/">
          <img
            src={logo}
            alt="Aayubakwath Logo"
            className="h-11 w-11 rounded-xl border border-[var(--color-border)] object-cover"
          />
        </a>
        <div className="border-l border-[var(--color-border)] pl-5">
          <p className="font-display text-[2rem] leading-none text-[var(--color-text)]">
            Aayubakwath
          </p>
          <span
            className="label text-[var(--color-text-muted)]"
            style={{ fontSize: "0.8rem", letterSpacing: "0.12em" }}
          >
            Ayurvedic Wellness
          </span>
        </div>
      </div>

      <p className="mb-6 max-w-[430px] font-body text-[1.08rem] leading-[1.72] text-[var(--color-text-secondary)]">
        Nature&apos;s wisdom, crafted for your well-being. Rooted in tradition,
        refined for today&apos;s modern lifestyle.
      </p>

      <div className="mb-6 space-y-4">
        <div className="flex items-start gap-4">
          <MapPin
            size={15}
            className="mt-1 shrink-0 text-[var(--color-text)]"
          />
          <p className="font-body text-[1.08rem] leading-[1.7] text-[var(--color-text-secondary)]">
            Sri Bakawathi Life Science
            <br />
            No: 1/770, K. Ayyampalayam, K.S.N Puram
            <br />
            Palladam, Tiruppur – 641662, TN
          </p>
        </div>
        <a
          href="tel:9443157282"
          className="group flex items-center gap-4 text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-sage)]"
        >
          <Phone
            size={15}
            className="shrink-0 text-[var(--color-text)] transition-colors group-hover:text-[var(--color-sage)]"
          />
          <span className="font-body text-[1.08rem]">+91 94431 57282</span>
        </a>
        <a
          href="mailto:info.sblsmarketing@gmail.com"
          className="group flex items-center gap-4 text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-sage)]"
        >
          <Mail
            size={15}
            className="shrink-0 text-[var(--color-text)] transition-colors group-hover:text-[var(--color-sage)]"
          />
          <span className="break-all font-body text-[1.08rem]">
            info.sblsmarketing@gmail.com
          </span>
        </a>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {socials.map((s, i) => (
          <a
            key={i}
            href={s.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/20 bg-black
              text-white hover:border-[var(--color-sage)] hover:bg-[var(--color-sage)] hover:text-white
              hover:shadow-[0_12px_24px_rgba(130,155,28,0.22)]
              transition-all duration-300"
            aria-label={s.label}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
