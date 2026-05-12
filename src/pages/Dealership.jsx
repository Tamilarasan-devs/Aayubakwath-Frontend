import React from "react";
import { Helmet } from "react-helmet-async";
import DealershipHero from "./dealership/DealershipHero";
import DealershipStats from "./dealership/DealershipStats";
import DealershipBenefits from "./dealership/DealershipBenefits";
import DealershipContact from "./dealership/DealershipContact";
import DealershipForm from "./dealership/DealershipForm";
import DealershipFeatures from "./dealership/DealershipFeatures";

export default function Dealership() {
  return (
    <>
      <Helmet>
        <title>Partnership - Aayubakwath</title>
      </Helmet>

      <div className="relative bg-white min-h-screen overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-gray-200/10 to-transparent pointer-events-none z-0" />
        <div className="fixed -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gray-100 blur-[120px] pointer-events-none z-0" />
        <div className="fixed top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-gray-100 blur-[120px] pointer-events-none z-0" />

        {/* ── Hero Section ── */}
        <DealershipHero />

        <div className="max-w-[1400px] mx-auto px-3 lg:px-4 relative z-10">
          {/* ── Stats Section ── */}
          <DealershipStats />

          {/* ── Benefits + Form Section ── */}
          <div
            id="enquiry-form"
            className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-12"
          >
            {/* Left Panel */}
            <div className="lg:col-span-2 flex flex-col gap-6 h-full">
              <DealershipBenefits />
              <DealershipContact />
            </div>

            <DealershipForm />
          </div>

          {/* ── Features Grid ── */}
          <DealershipFeatures />
        </div>
      </div>
    </>
  );
}
