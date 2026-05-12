import React from "react";
import { FaTruck } from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaWarehouse,
} from "react-icons/fa";

function StepIcon({ type, className }) {
  if (type === "confirm") return <FaCheckCircle className={className} />;
  if (type === "process") return <MdOutlineInventory2 className={className} />;
  if (type === "truck") return <FaTruck className={className} />;
  if (type === "warehouse") return <FaWarehouse className={className} />;
  if (type === "box") return <FaBoxOpen className={className} />;
  return null;
}

export default function OrderTimeline({ order }) {
  return (
    <div className="lg:col-span-2 bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-xl shadow-gray-200/40">
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
        <h3 className="text-xl font-black text-[#111827] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
            <FaTruck size={18} />
          </div>
          Shipment Journey
        </h3>
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg">
          <MdOutlineInventory2 className="text-gray-400" size={14} />
          <span className="text-sm font-semibold text-[#111827]">
            {order.courier} · {order.awb}
          </span>
        </div>
      </div>

      <div className="space-y-0 relative">
        {order.steps.map((step, i) => {
          const isCompleted = i <= order.currentStep;
          const isCurrent = i === order.currentStep;
          const isLast = i === order.steps.length - 1;

          return (
            <div key={i} className="flex gap-6 relative">
              {!isLast && (
                <div
                  className={`absolute left-6 top-12 bottom-0 w-0.5 -translate-x-1/2 ${
                    isCompleted
                      ? "bg-gray-400 shadow-[0_0_10px_rgba(156,163,175,0.5)]"
                      : "bg-gray-100"
                  }`}
                  style={{ height: "calc(100% + 1rem)" }}
                ></div>
              )}

              <div className="relative z-10 pb-12">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
                    isCurrent
                      ? "bg-[#111827] border-[#111827] text-white shadow-[0_4px_20px_rgba(17,24,39,0.3)] scale-110"
                      : isCompleted
                        ? "bg-white border-gray-400 text-gray-400"
                        : "bg-gray-50 border-gray-200 text-gray-300"
                  }`}
                >
                  <StepIcon type={step.icon} className="w-5 h-5" />
                </div>
              </div>

              <div
                className={`flex-1 pb-12 pt-2 ${isCompleted ? "opacity-100" : "opacity-40"}`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <h4
                      className={`text-lg font-semibold ${isCurrent ? "text-gray-400" : "text-[#111827]"}`}
                    >
                      {step.label}
                    </h4>
                    {isCurrent && (
                      <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-wider border border-gray-200">
                        Current
                      </span>
                    )}
                  </div>
                  {step.date && (
                    <span className="text-sm font-semibold text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">
                      {step.date}
                    </span>
                  )}
                </div>
                <p className="text-gray-500 font-medium leading-relaxed max-w-md">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
