import React from "react";
import { FaSearch } from "react-icons/fa";

const DEMO_ORDERS = ["AYU-2025-001", "AYU-2025-002"];

export default function TrackSearch({ query, setQuery, onSearch, loading, error }) {
  return (
    <div className="max-w-xl mx-auto mb-10">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400 group-focus-within:text-gray-400 transition-colors" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          className="w-full pl-14 pr-32 py-5 rounded-2xl bg-white border border-gray-200 text-[#111827] font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-gray-400/50 focus:border-gray-400 transition-all shadow-sm hover:shadow-md"
          placeholder="e.g. AYU-2025-001"
        />
        <button
          onClick={onSearch}
          disabled={loading}
          className="absolute right-2 top-2 bottom-2 px-8 bg-[#111827] text-white rounded-xl font-semibold tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            "Track"
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-100 text-red-500 text-sm font-semibold flex items-center justify-center gap-2">
          <span>⚠</span> {error}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <span className="text-sm font-medium text-gray-400">Demo Orders:</span>
        {DEMO_ORDERS.map((id) => (
          <button
            key={id}
            onClick={() => setQuery(id)}
            className="px-4 py-1.5 rounded-full border border-gray-200 text-sm font-semibold text-[#111827] hover:border-gray-400 hover:text-gray-400 hover:bg-gray-100 transition-all"
          >
            {id}
          </button>
        ))}
      </div>
    </div>
  );
}
