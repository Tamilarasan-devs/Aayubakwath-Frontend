import React from "react";
import { useNavigate } from "react-router-dom";
import { getProductImageUrl } from "../../utils/productImages";

const statusConfig = {
  Delivered: { color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", dot: "bg-emerald-500" },
  Processing: { color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", dot: "bg-amber-500" },
  Shipped: { color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200", dot: "bg-blue-500" },
};

export default function OrderHistory({ orders }) {
  const navigate = useNavigate();

  return (
    <div className="fade-up bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h3 className="text-lg font-semibold text-[#111827] mb-6">Order History</h3>
      <div className="space-y-4">
        {orders.map((order) => {
          const s = statusConfig[order.status] || statusConfig.Processing;
          const firstItemImage = order.items?.[0]?.product?.productImages?.[0];
          
          return (
            <div
              key={order.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                  {firstItemImage ? (
                    <img
                      src={getProductImageUrl(firstItemImage)}
                      alt={order.items[0].product.productName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 opacity-30"
                      >
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-[#111827]">Order #{order.id.split("-")[0]}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{new Date(order.createdAt).toLocaleDateString()} · {order.items?.length || 0} items</p>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${s.color} ${s.bg} ${s.border}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                  {order.status}
                </span>
                <p className="font-semibold text-lg text-[#111827]">₹{parseFloat(order.totalAmount).toFixed(2)}</p>
                <button
                  className="text-xs font-semibold text-[#111827] border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-all"
                  onClick={() => navigate("/trackorder")}
                >
                  Track Order
                </button>
              </div>
            </div>
          );
        })}
        {orders.length === 0 && (
          <p className="text-sm text-gray-500">You haven&apos;t placed any orders yet.</p>
        )}
      </div>
    </div>
  );
}
