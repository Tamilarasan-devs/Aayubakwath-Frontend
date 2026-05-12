import React from "react";

export default function FooterLinks({ title, links }) {
  return (
    <div>
      <h4 className="label mb-4 border-b border-[var(--color-border)] pb-2.5 text-base text-[var(--color-text-muted)]">
        {title}
      </h4>
      <ul className="m-0 list-none space-y-3 p-0">
        {links.map((link, i) => (
          <li key={i}>
            <a
              href={link.path}
              className="group inline-flex items-center gap-2 font-body text-[1.08rem] text-[var(--color-text)] transition-colors duration-200 hover:text-[var(--color-sage)]"
            >
              <span className="w-0 group-hover:w-2.5 h-px bg-[var(--color-sage)] transition-all duration-300" />
              <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                {link.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
