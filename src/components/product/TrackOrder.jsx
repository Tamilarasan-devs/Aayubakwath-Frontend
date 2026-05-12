import React, { useState, useEffect } from "react";
import TrackSearch from "./track-order/TrackSearch";
import OrderHeader from "./track-order/OrderHeader";
import OrderTimeline from "./track-order/OrderTimeline";
import OrderInfo from "./track-order/OrderInfo";
import OrderNotFound from "./track-order/OrderNotFound";
import { demoOrders } from "./track-order/demoData";

export default function TrackOrder() {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = () => {
    const id = (query || "").trim().toUpperCase();
    if (!id) {
      setError("Please enter your Order ID.");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);
    setSearched(false);

    setTimeout(() => {
      const found = demoOrders[id] || null;
      setOrder(found);
      setSearched(true);
      if (!found) setError("Order not found. Try: AYU-2025-001");
      setLoading(false);
    }, 800);
  };

  const handleCopy = () => {
    if (!order) return;
    navigator.clipboard.writeText(order.id).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#111827] pt-20 pb-12 px-4 sm:px-6">
      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 mb-6">
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></span>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400">
            Live Tracking
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-[#111827] tracking-tight mb-6 leading-tight">
          Track Your{" "}
          <span className="text-gray-400 italic font-serif">Journey.</span>
        </h1>

        <p className="text-gray-500 text-lg max-w-lg mx-auto leading-relaxed">
          Enter your Order ID below for real-time delivery updates on your
          exclusive Aayubakwath purchase.
        </p>
      </div>

      <TrackSearch
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        loading={loading}
        error={error}
      />

      {order && (
        <div className="max-w-[1400px] mx-auto px-3 lg:px-4 space-y-8">
          <OrderHeader order={order} copied={copied} onCopy={handleCopy} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <OrderTimeline order={order} />
            <OrderInfo order={order} />
          </div>
        </div>
      )}

      {searched && !order && !loading && <OrderNotFound />}
    </div>
  );
}
