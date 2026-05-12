import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, addAddress, removeAddress, updateAddress, updateUserProfile } from "../services/userService";
import { getMyOrders } from "../services/orderService";
import { useAuth } from "../hooks/useAuth";
import ProfileHero from "./profile/ProfileHero";
import ProfileInfo from "./profile/ProfileInfo";
import OrderHistory from "./profile/OrderHistory";
import ProfileWishlist from "./profile/ProfileWishlist";
import AddressBook from "./profile/AddressBook";

import { getWishlist, removeFromWishlist } from "../services/wishlistService";

import ProfileSidebar from "./profile/ProfileSidebar";

export default function ProfilePage() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [activeTab, setActiveTab] = useState("Overview");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  const { data: userProfile, isLoading: isUserLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const { data: ordersData, isLoading: isOrdersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getMyOrders(),
  });

  const { data: wishlistData, isLoading: isWishlistLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  const addAddrMut = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
      setShowAddressForm(false);
    },
  });

  const updateAddrMut = useMutation({
    mutationFn: ({ id, data }) => updateAddress(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
      setShowAddressForm(false);
      setEditingAddress(null);
    },
  });

  const updateProfileMut = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
      setIsEditingProfile(false);
    },
  });

  const remAddrMut = useMutation({
    mutationFn: removeAddress,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const wishMut = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  if (isUserLoading || isOrdersLoading || isWishlistLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f1f3f6]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[var(--color-sage)] border-t-transparent rounded-full animate-spin" />
          <p className="text-[var(--color-text-muted)] font-medium">Loading Profile...</p>
        </div>
      </div>
    );
  }

  const user = userProfile || { name: "Guest User", email: "" };
  const orders = ordersData?.data || [];
  const wishlist = wishlistData?.data || [];
  const addresses = user.addresses || [];

  const handleRemoveWishlist = (id) => {
    wishMut.mutate(id);
  };

  const handleSaveAddress = (data) => {
    if (editingAddress) {
      updateAddrMut.mutate({ id: editingAddress.id, data });
    } else {
      addAddrMut.mutate(data);
    }
  };

  const handleEditAddress = (addr) => {
    setEditingAddress(addr);
    setShowAddressForm(true);
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] pb-20">
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(15px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease-out both; }
      `}</style>

      <div className="max-w-[1248px] mx-auto px-4 pt-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          
          {/* Left Sidebar - 280px */}
          <div className="w-full lg:w-[280px] shrink-0 sticky top-[100px]">
            <ProfileSidebar 
              user={user} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              onLogout={() => {
                logout();
                navigate("/login");
              }}
            />
          </div>

          {/* Right Content Area */}
          <div className="flex-1 w-full min-w-0">
            <div className="bg-white rounded-sm shadow-sm p-6 sm:p-8 min-h-[600px] fade-up">
              
              {/* Header Title */}
              <div className="mb-8">
                <h1 className="text-[18px] font-bold text-[var(--color-text)] mb-1">
                  {activeTab === "Overview" && "Profile Information"}
                  {activeTab === "Orders" && "My Orders"}
                  {activeTab === "Wishlist" && `My Wishlist (${wishlist.length})`}
                  {activeTab === "Addresses" && "Manage Addresses"}
                </h1>
                <div className="h-0.5 w-12 bg-[var(--color-sage)] rounded-full" />
              </div>

              {/* Tab Content */}
              {activeTab === "Overview" && (
                <ProfileInfo
                  user={user}
                  orders={orders}
                  onViewAllOrders={() => setActiveTab("Orders")}
                  isEditing={isEditingProfile}
                  onEditToggle={() => setIsEditingProfile(!isEditingProfile)}
                  onUpdate={(data) => updateProfileMut.mutate(data)}
                  isUpdating={updateProfileMut.isPending}
                />
              )}

              {activeTab === "Orders" && <OrderHistory orders={orders} />}

              {activeTab === "Wishlist" && (
                <ProfileWishlist wishlist={wishlist} onRemove={handleRemoveWishlist} />
              )}

              {activeTab === "Addresses" && (
                <AddressBook
                  addresses={addresses}
                  onRemove={(id) => remAddrMut.mutate(id)}
                  isRemoving={remAddrMut.isPending}
                  showAddressForm={showAddressForm}
                  setShowAddressForm={setShowAddressForm}
                  onSave={handleSaveAddress}
                  isSaving={addAddrMut.isPending || updateAddrMut.isPending}
                  onEdit={handleEditAddress}
                  editingAddress={editingAddress}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
