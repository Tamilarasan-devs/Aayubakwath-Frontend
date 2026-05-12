import React from "react";
import { FaCopy } from "react-icons/fa";

export default function OrderHeader({ order, copied, onCopy }) {
  const progress = order
    ? Math.round(((order.currentStep + 1) / order.steps.length) * 100)
    : 0;

  return (
    <div className="bg-[#111827] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-400/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>

      <div className="relative z-10 space-y-2">
        <span className="text-gray-400 font-semibold tracking-[0.2em] uppercase text-xs">
          Order Confirmed
        </span>
        <div className="flex items-center gap-4">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            {order.id}
          </h2>
          <button
            onClick={onCopy}
            className={`w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 transition-colors ${copied ? "text-emerald-300" : "text-gray-400"}`}
            title={copied ? "Copied!" : "Copy ID"}
          >
            <FaCopy size={14} />
          </button>
        </div>
        {copied && (
          <p className="text-xs font-semibold text-emerald-200">Copied</p>
        )}
        <p className="text-gray-300 font-medium">
          Placed on {order.placed}
        </p>
      </div>

      <div className="relative z-10 w-full md:w-1/3 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-gray-300">Status</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gray-400 shadow-[0_0_8px_rgba(156,163,175,0.8)] animate-pulse"></span>
            <span className="text-gray-400 font-semibold text-sm">
              {order.steps[order.currentStep]?.label}
            </span>
          </div>
        </div>

        <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden mb-2">
          <div
            className="bg-gradient-to-r from-[#111827] to-gray-400 h-2.5 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs font-semibold text-gray-400">
          <span>0%</span>
          <span>Est. Delivery: {order.estimatedDelivery}</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
