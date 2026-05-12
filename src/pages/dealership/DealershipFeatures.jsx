import React from "react";
import {
  Truck,
  Shield,
  Leaf,
  HeadphonesIcon,
  FlaskConical,
  BadgeCheck,
  Timer,
  Sprout,
  ScrollText,
} from "lucide-react";
import Reveal from "./Reveal";

const features = [
  {
    icon: Truck,
    title: "Pan-India Delivery",
    desc: "Fast and reliable shipping across all 28 states with priority handling for bulk orders.",
  },
  {
    icon: Shield,
    title: "1 Year Warranty",
    desc: "Complete peace of mind with up to 1 year warranty on select premium products.",
  },
  {
    icon: Leaf,
    title: "Eco Packaging",
    desc: "Sustainable, eco-friendly packaging that reflects your commitment to a greener world.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    desc: "Personal account manager and 24/7 priority support for all your business needs.",
  },
];

export default function DealershipFeatures() {
  return (
    <Reveal>
      <div className="mb-12">
        <div className="text-center mb-6">
          <h2 className="font-display text-3xl lg:text-4xl font-black tracking-tight text-[#111827] mb-4">
            Why partner with us
          </h2>
          <div className="mx-auto mb-4 h-1 w-16 rounded-full bg-[var(--color-sage)]" />
          <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">
            Everything you need to build a thriving wellness business, all
            in one partnership.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="clean-card rounded-2xl p-8 lg:p-9 text-center border border-gray-100 shadow-sm flex flex-col h-full group hover:border-[var(--color-sage)] hover:shadow-2xl hover:shadow-[rgba(130,155,28,0.12)] transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center mx-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 bg-[var(--color-sage-light)] text-[var(--color-sage)] group-hover:bg-[var(--color-sage)] group-hover:text-white">
                  <Icon size={28} />
                </div>
                <h4 className="font-display font-semibold text-[1.28rem] leading-tight text-[#111827] group-hover:text-[var(--color-sage)] transition-colors mb-4">
                  {f.title}
                </h4>
                <p className="text-gray-600 text-[15px] leading-[1.8] font-medium">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>


      </div>
    </Reveal>
  );
}
