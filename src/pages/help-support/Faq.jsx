import React, { useState } from "react";

const faqs = [
  {
    question: "What is Aayubakwath?",
    answer:
      "Aayubakwath is a health food supplement brand that provides herbal and nutritional supplements to support daily health, brain function, metabolism, cholesterol balance, energy, and overall wellness.",
  },
  {
    question: "Are Aayubakwath products medicines?",
    answer:
      "No. Aayubakwath products are health food supplements and not medicines. They are intended to support overall health and wellness.",
  },
  {
    question: "Are these supplements safe to use daily?",
    answer:
      "Yes, when taken as per the recommended dosage, the supplements are generally safe for daily use.",
  },
  {
    question: "Who can use these supplements?",
    answer:
      "These supplements are suitable for adults. Pregnant women, lactating mothers, and individuals under 18 should consult a healthcare professional before use.",
  },
  {
    question: "Are the capsules vegetarian?",
    answer:
      "Yes, the capsules are typically made using HPMC vegetarian capsules.",
  },
  {
    question: "How should I take the capsules?",
    answer:
      "The usual recommended usage is 2 capsules daily after meals, or as directed by a healthcare professional.",
  },
  {
    question: "How long should I take the supplement to see results?",
    answer:
      "For best results, supplements should be taken regularly for 4 to 8 weeks along with a healthy diet and lifestyle.",
  },
  {
    question: "Can I take multiple Aayubakwath supplements together?",
    answer:
      "Yes, in most cases they can be taken together, but it is recommended to consult a healthcare professional for personalized advice.",
  },
  {
    question: "Can I take these supplements with other medicines?",
    answer:
      "If you are taking regular medication, consult your doctor before using supplements.",
  },
  {
    question: "How should I store the product?",
    answer:
      "Store in a cool and dry place, away from direct sunlight. Keep out of reach of children.",
  },
  {
    question: "Can I use the product after expiry date?",
    answer:
      "No, do not use the product after the expiry date mentioned on the bottle.",
  },
  {
    question: "Do not exceed recommended dosage?",
    answer:
      "Yes, do not exceed the recommended daily usage unless advised by a healthcare professional.",
  },
  {
    question: "Which product should I choose?",
    answer:
      "Blood Sugar Balance – For glucose metabolism support\nCholesterol Balance – For lipid & heart health support\nBrain Tonic – For memory & focus support\nVitality Power Plus – For energy & stamina\nGeneral Health – For overall wellness",
  },
  {
    question: "Are these products herbal?",
    answer:
      "Yes, most products contain herbal extracts like Ashwagandha, Ginseng, Bacopa, Garlic, Fenugreek, Green Tea, etc.",
  },
  {
    question: "Where can I buy Aayubakwath products?",
    answer:
      "Products will be available on Amazon, Flipkart, and official website.",
  },
  {
    question: "What should I do if the product bottle is damaged?",
    answer:
      "Contact customer support immediately with order details and product photos.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-3 lg:px-4 p-6">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
        Aayubakwath – Frequently Asked Questions (FAQ)
      </h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-100 rounded-xl shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-[#111827] text-left">
                {faq.question}
              </span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-500 bg-white border-t border-gray-100 whitespace-pre-line">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
