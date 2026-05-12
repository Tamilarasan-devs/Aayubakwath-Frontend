import React from "react";
import { MdOutlineInventory2 } from "react-icons/md";

export default function OrderNotFound() {
  return (
    <div className="max-w-2xl mx-auto text-center py-12 bg-gray-50 border border-dashed border-gray-300 rounded-3xl">
      <MdOutlineInventory2 className="mx-auto text-6xl text-gray-300 mb-6" />
      <h3 className="text-2xl font-black text-[#111827] mb-4">
        Order Not Found
      </h3>
      <p className="text-gray-500 font-medium">
        We couldn&apos;t locate an order with that ID. Please check your spelling
        or contact support if you need assistance.
      </p>
    </div>
  );
}
