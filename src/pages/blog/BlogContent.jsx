import React from "react";
import { Share2 } from "lucide-react";

export default function BlogContent({ post }) {
  return (
    <div className="bg-white rounded-xl p-8 lg:p-14 shadow-sm border border-gray-100">
      {/* Excerpt */}
      <p className="text-lg text-stone-600 leading-relaxed mb-8 font-medium border-l-4 border-[var(--color-sage)] pl-6 italic">
        {post.excerpt}
      </p>

      {/* Sections */}
      {post.sections.map((section, sIdx) => (
        <div
          key={sIdx}
          className={
            section.isDisclaimer
              ? "mt-8 p-8 rounded-2xl bg-gray-50 border border-gray-200"
              : "mb-8"
          }
        >
          {section.isDisclaimer ? (
            <>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-sage)] mb-4 flex items-center gap-2">
                <Share2 size={16} /> Disclaimer
              </h4>
              {section.content.map((text, i) => (
                <p
                  key={i}
                  className="text-sm text-stone-500 leading-relaxed"
                >
                  {text}
                </p>
              ))}
            </>
          ) : (
            <>
              <h2 className="font-display text-2xl lg:text-3xl font-semibold text-[#111827] mb-6 pb-4 border-b border-gray-100 relative">
                {section.heading}
                <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-[var(--color-sage)]"></span>
              </h2>
              <div>
                {section.content.map((text, i) => (
                  <p
                    key={i}
                    className="text-stone-600 leading-relaxed mb-4 font-medium"
                  >
                    {text}
                  </p>
                ))}
                {section.list && section.list.length > 0 && (
                  <ul className="space-y-3 my-6">
                    {section.list.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-stone-600 font-medium"
                      >
                        <span className="w-2 h-2 rounded-full bg-[var(--color-sage)] mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Subsections */}
                {section.subsections &&
                  section.subsections.map((sub, subIdx) => (
                    <div
                      key={subIdx}
                      className="my-8 pl-6 border-l-2 border-[var(--color-sage)]/30"
                    >
                      <h3 className="font-display text-xl font-semibold text-[#111827] mb-4">
                        {sub.heading}
                      </h3>
                      {sub.content &&
                        sub.content.map((text, i) => (
                          <p
                            key={i}
                            className="text-stone-600 leading-relaxed mb-3 font-medium"
                          >
                            {text}
                          </p>
                        ))}
                      {sub.list && sub.list.length > 0 && (
                        <ul className="space-y-3 mt-4">
                          {sub.list.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-stone-600 font-medium"
                            >
                              <span className="w-2 h-2 rounded-full bg-[var(--color-sage)] mt-2 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
