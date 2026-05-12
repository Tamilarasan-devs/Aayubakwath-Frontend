import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";

export default function OrderInfo({ order }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/40 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity translate-x-4 -translate-y-4">
          <MdOutlineInventory2 size={100} className="text-[#111827]" />
        </div>
        <h4 className="text-xs font-black tracking-widest text-gray-400 uppercase mb-6 flex items-center gap-2">
          <FaMapMarkerAlt /> Delivery Details
        </h4>
        <div className="space-y-4 relative z-10">
          <div>
            <p className="text-sm text-gray-400 font-semibold mb-1">Customer</p>
            <p className="text-lg font-semibold text-[#111827]">{order.customer}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 font-semibold mb-1">Address</p>
            <p className="text-base font-semibold text-gray-600 leading-relaxed">
              {order.address}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400 font-semibold mb-1">Items</p>
            <p className="text-base font-semibold text-[#111827] leading-relaxed">
              {order.product}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#111827] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(156,163,175,0.15),transparent_50%)]"></div>
        <h4 className="text-xs font-black tracking-widest text-gray-400 uppercase mb-6 flex items-center gap-2 relative z-10">
          <FaPhoneAlt /> Need Assistance?
        </h4>
        <div className="space-y-3 relative z-10">
          <a
            href={`tel:${order.phone}`}
            className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 flex-shrink-0">
              <FaPhoneAlt size={14} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">
                Call Us
              </p>
              <p className="text-white font-semibold">{order.phone}</p>
            </div>
          </a>
          <a
            href="mailto:support@aayubakwath.com"
            className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 flex-shrink-0">
              <FaEnvelope size={14} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">
                Email Support
              </p>
              <p className="text-white font-semibold break-all">
                support@aayubakwath.com
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
