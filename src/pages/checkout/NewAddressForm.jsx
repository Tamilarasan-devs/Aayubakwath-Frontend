import React, { useState } from "react";
import { Plus, ChevronDown, ChevronUp, User, Phone, Home, MapPin } from "lucide-react";

export default function NewAddressForm({
  onSave,
  isSaving,
  hasAddresses,
  initialData = null,
}) {
  const [isExpanded, setIsExpanded] = useState(!hasAddresses || !!initialData);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    phone: initialData?.phone || "",
    doorNumber: initialData?.doorNumber || "",
    area: initialData?.area || "",
    landmark: initialData?.landmark || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    postalCode: initialData?.postalCode || "",
    addressType: initialData?.addressType || "Home",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const emptyForm = {
    name: "",
    phone: "",
    doorNumber: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    postalCode: "",
    addressType: "Home",
  };

  const handleSave = async () => {
    await onSave(formData);
    setFormData(emptyForm);
    if (hasAddresses) setIsExpanded(false);
  };

  const isFormValid = 
    formData.name.length >= 2 &&
    /^[6-9]\d{9}$/.test(formData.phone) &&
    formData.doorNumber.length >= 1 &&
    formData.area.length >= 2 &&
    formData.city.length >= 2 &&
    formData.state.length >= 2 &&
    /^\d{6}$/.test(formData.postalCode);

  return (
    <div className={hasAddresses ? "mt-6 pt-6 border-t border-[var(--color-border)]" : ""}>
      {hasAddresses && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full mb-4 group px-2 py-1 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-full text-gray-500 group-hover:bg-[var(--color-sage)] group-hover:text-white transition-all">
              <Plus size={16} />
            </div>
            <span className="font-body text-sm font-semibold text-[var(--color-text)]">
              Add a new shipping address
            </span>
          </div>
          {isExpanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
        </button>
      )}

      {isExpanded && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Contact Info */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-sage)] mb-4 flex items-center gap-2">
                <User size={12} /> Contact Information
              </h3>
            </div>
            
            <div className="relative">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1.5 ml-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Receiver's name"
                className="w-full px-4 py-3 border border-[var(--color-border)] bg-white rounded-[var(--radius-md)] font-body text-sm focus:border-[var(--color-sage)] focus:ring-1 focus:ring-[var(--color-sage)] outline-none transition-all shadow-sm"
              />
            </div>

            <div className="relative">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1.5 ml-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                className="w-full px-4 py-3 border border-[var(--color-border)] bg-white rounded-[var(--radius-md)] font-body text-sm focus:border-[var(--color-sage)] focus:ring-1 focus:ring-[var(--color-sage)] outline-none transition-all shadow-sm"
              />
            </div>

            {/* Address Details */}
            <div className="col-span-1 md:col-span-2 mt-2">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-sage)] mb-4 flex items-center gap-2">
                <Home size={12} /> Address Details
              </h3>
            </div>

            <div className="relative">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1.5 ml-1">
                Door / Flat No. *
              </label>
              <input
                type="text"
                name="doorNumber"
                value={formData.doorNumber}
                onChange={handleChange}
                placeholder="House/Flat No, Floor"
                className="w-full px-4 py-3 border border-[var(--color-border)] bg-white rounded-[var(--radius-md)] font-body text-sm focus:border-[var(--color-sage)] focus:ring-1 focus:ring-[var(--color-sage)] outline-none transition-all shadow-sm"
              />
            </div>

            <div className="relative">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1.5 ml-1">
                Area / Locality *
              </label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Street Name, Area"
                className="w-full px-4 py-3 border border-[var(--color-border)] bg-white rounded-[var(--radius-md)] font-body text-sm focus:border-[var(--color-sage)] focus:ring-1 focus:ring-[var(--color-sage)] outline-none transition-all shadow-sm"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1.5 ml-1">
                Landmark (Optional)
              </label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                placeholder="E.g. Near Apollo Hospital"
                className="w-full px-4 py-3 border border-[var(--color-border)] bg-white rounded-[var(--radius-md)] font-body text-sm focus:border-[var(--color-sage)] focus:ring-1 focus:ring-[var(--color-sage)] outline-none transition-all shadow-sm"
              />
            </div>

            <div className="relative">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1.5 ml-1">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full px-4 py-3 border border-[var(--color-border)] bg-white rounded-[var(--radius-md)] font-body text-sm focus:border-[var(--color-sage)] focus:ring-1 focus:ring-[var(--color-sage)] outline-none transition-all shadow-sm"
              />
            </div>

            <div className="relative">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1.5 ml-1">
                State *
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full px-4 py-3 border border-[var(--color-border)] bg-white rounded-[var(--radius-md)] font-body text-sm focus:border-[var(--color-sage)] focus:ring-1 focus:ring-[var(--color-sage)] outline-none transition-all shadow-sm"
              />
            </div>

            <div className="relative">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1.5 ml-1">
                Pincode *
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="6-digit PIN"
                maxLength={6}
                className="w-full px-4 py-3 border border-[var(--color-border)] bg-white rounded-[var(--radius-md)] font-body text-sm focus:border-[var(--color-sage)] focus:ring-1 focus:ring-[var(--color-sage)] outline-none transition-all shadow-sm"
              />
            </div>

            <div className="relative">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1.5 ml-1">
                Address Type *
              </label>
              <div className="flex gap-2">
                {["Home", "Work", "Other"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, addressType: type }))}
                    className={`flex-1 py-2.5 rounded-[var(--radius-md)] font-body text-[11px] font-bold uppercase tracking-wider transition-all
                      ${formData.addressType === type 
                        ? "bg-[var(--color-sage)] text-white shadow-md" 
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving || !isFormValid}
            className={`w-full py-4 rounded-[var(--radius-md)] font-body text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300 mt-4
              ${
                isFormValid 
                  ? "bg-[var(--color-text)] text-white hover:bg-[var(--color-sage)] shadow-lg hover:shadow-xl translate-y-0 active:translate-y-0.5" 
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
          >
            {isSaving ? "Saving Address..." : "Save Address & Deliver Here"}
          </button>
        </div>
      )}
    </div>
  );
}
