import React from "react";
import { 
  ShoppingBag, 
  User, 
  MapPin, 
  Heart, 
  Power,
  ChevronRight,
  Tag
} from "lucide-react";

export default function ProfileSidebar({ activeTab, setActiveTab, user, onLogout }) {
  const menuGroups = [
    {
      title: "Orders",
      items: [
        { id: "Orders", label: "My Orders", icon: ShoppingBag }
      ]
    },
    {
      title: "Account Settings",
      items: [
        { id: "Overview", label: "Profile Information", icon: User },
        { id: "Addresses", label: "Manage Addresses", icon: MapPin }
      ]
    },
    {
      title: "My Stuff",
      items: [
        { id: "Wishlist", label: "My Wishlist", icon: Heart },
        { id: "Coupons", label: "Offers & Coupons", icon: Tag },
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* User Header */}
      <div className="bg-white rounded-sm shadow-sm p-3 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[var(--color-sage-light)] flex items-center justify-center overflow-hidden border border-[var(--color-border)]">
          <img 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=829b1c&color=fff`} 
            alt="User" 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-[11px] text-gray-500 font-medium">Hello,</p>
          <p className="text-[16px] font-bold text-[var(--color-text)] truncate max-w-[140px]">{user.name}</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white rounded-sm shadow-sm overflow-hidden">
        {menuGroups.map((group, gIdx) => (
          <div key={group.title} className={gIdx !== 0 ? "border-t border-gray-100" : ""}>
            <div className="px-4 py-3 flex items-center gap-3">
              <span className="text-[var(--color-sage)] opacity-80">
                {group.items[0] && React.createElement(group.items[0].icon, { size: 18 })}
              </span>
              <span className="text-[14px] font-bold text-gray-500 uppercase tracking-wider flex-1">
                {group.title}
              </span>
            </div>
            
            <div className="pb-2">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-12 py-2.5 text-[14px] transition-colors
                    ${activeTab === item.id 
                      ? "bg-[var(--color-sage-light)]/30 text-[var(--color-sage-dark)] font-semibold" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-[var(--color-sage)]"
                    }`}
                >
                  <span>{item.label}</span>
                  {activeTab === item.id && <ChevronRight size={14} className="text-[var(--color-sage)]" />}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <div className="border-t border-gray-100">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-4 text-[14px] font-bold text-gray-500 hover:text-[var(--color-terracotta)] hover:bg-red-50 transition-colors"
          >
            <Power size={18} className="text-[var(--color-terracotta)]" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-white rounded-sm shadow-sm p-4">
        <p className="text-[12px] font-bold text-gray-600 mb-1">Frequently Visited:</p>
        <div className="flex flex-col gap-2">
          <button className="text-[11px] text-gray-500 hover:text-[var(--color-sage)] text-left">Track Order</button>
          <button className="text-[11px] text-gray-500 hover:text-[var(--color-sage)] text-left">Help Center</button>
        </div>
      </div>
    </div>
  );
}
