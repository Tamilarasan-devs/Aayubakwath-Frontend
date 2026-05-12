import React, { useState } from "react";

const statusConfig = {
  Delivered: { color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", dot: "bg-emerald-500" },
  Processing: { color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", dot: "bg-amber-500" },
  Shipped: { color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200", dot: "bg-blue-500" },
};

export default function ProfileInfo({ 
  user, 
  orders, 
  onViewAllOrders,
  isEditing,
  onEditToggle,
  onUpdate,
  isUpdating
}) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    phoneNumber: user.phoneNumber || user.phone || "",
  });

  const handleSave = () => {
    onUpdate(formData);
  };

  return (
    <div className="fade-up space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-[var(--color-text)]">Personal Information</h3>
            <p className="text-[var(--color-text-muted)] text-sm mt-1">Manage your account details and contact info</p>
          </div>
          {!isEditing ? (
            <button 
              onClick={onEditToggle}
              className="flex items-center gap-2.5 text-[13px] font-bold text-[var(--color-text)] border border-[var(--color-border)] px-6 py-2.5 rounded-xl hover:bg-[var(--color-bg-warm)] hover:border-[var(--color-sage)] transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit Profile
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button 
                onClick={handleSave}
                disabled={isUpdating}
                className="bg-[var(--color-accent)] text-white px-6 py-2.5 rounded-xl text-[13px] font-bold tracking-wider uppercase hover:bg-[var(--color-sage)] transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
              <button 
                onClick={onEditToggle}
                className="bg-[var(--color-bg-muted)] text-[var(--color-text-secondary)] px-6 py-2.5 rounded-xl text-[13px] font-bold tracking-wider uppercase hover:bg-[var(--color-border)] transition-all"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-sage-deep)] ml-1">Full Name</label>
              <input 
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-5 py-4 bg-[var(--color-bg-warm)] border border-[var(--color-border)] rounded-2xl focus:border-[var(--color-sage)] focus:ring-4 focus:ring-[var(--color-sage)]/5 outline-none transition-all font-bold text-[var(--color-text)]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-sage-deep)] ml-1">Phone Number</label>
              <input 
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full px-5 py-4 bg-[var(--color-bg-warm)] border border-[var(--color-border)] rounded-2xl focus:border-[var(--color-sage)] focus:ring-4 focus:ring-[var(--color-sage)]/5 outline-none transition-all font-bold text-[var(--color-text)]"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Full Name", value: user.name, icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" },
              { label: "Email Address", value: user.email, icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" },
              { label: "Phone Number", value: user.phoneNumber || user.phone, icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" },
            ].map((item, i) => (
              <div key={i} className="bg-[var(--color-bg-warm)] rounded-2xl p-5 border border-[var(--color-border)] group hover:border-[var(--color-sage)]/30 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[var(--color-sage)] shadow-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-placeholder)] font-black">{item.label}</p>
                </div>
                <p className="text-[var(--color-text)] font-bold text-[15px] truncate">{item.value || "—"}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Orders Preview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[#111827]">Recent Orders</h3>
          <button onClick={onViewAllOrders} className="text-sm text-[#111827] font-semibold hover:underline">View All →</button>
        </div>
        <div className="space-y-3">
          {orders.slice(0, 2).map((order) => {
            const s = statusConfig[order.status] || statusConfig.Processing;
            return (
              <div key={order.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[#111827] text-sm">Order #{order.id.split("-")[0]}</p>
                    <p className="text-gray-400 text-xs">{new Date(order.createdAt).toLocaleDateString()} · {order.items?.length || 0} items</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${s.color} ${s.bg} ${s.border}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    {order.status}
                  </span>
                  <p className="font-semibold text-[#111827] text-sm">₹{parseFloat(order.totalAmount).toFixed(2)}</p>
                </div>
              </div>
            );
          })}
          {orders.length === 0 && <p className="text-sm text-gray-500">No orders yet.</p>}
        </div>
      </div>
    </div>
  );
}
