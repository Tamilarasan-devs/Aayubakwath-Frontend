import NewAddressForm from "../checkout/NewAddressForm";

export default function AddressBook({
  addresses,
  onRemove,
  isRemoving,
  showAddressForm,
  setShowAddressForm,
  onSave,
  isSaving,
  onEdit,
  editingAddress,
}) {
  return (
    <div className="fade-up space-y-5">
      {addresses.map((addr) => {
        const addressText = [
          addr.doorNumber,
          addr.area,
          addr.landmark ? `(Near ${addr.landmark})` : null,
          addr.city,
          addr.state,
          addr.postalCode
        ].filter(Boolean).join(", ");

        return (
          <div
            key={addr.id}
            className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-[var(--color-sage-light)] text-[var(--color-sage)] group-hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <p className="font-bold text-[var(--color-text)] text-lg">{addr.name || addr.label || "Address"}</p>
                  {addr.isDefault && (
                    <span className="text-[9px] tracking-widest uppercase font-bold text-[var(--color-sage-deep)] bg-[var(--color-sage-light)] px-2.5 py-1 rounded-full border border-[var(--color-sage)]/20 shadow-sm">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-[var(--color-text-muted)] text-[14px] leading-relaxed">
                  {addressText || addr.details}
                </p>
                {addr.phone && (
                  <p className="text-[var(--color-text-placeholder)] text-[12px] font-medium flex items-center gap-1.5 mt-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    {addr.phone}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0 lg:self-center self-end">
              <button 
                onClick={() => onEdit(addr)}
                className="text-[13px] font-bold text-[var(--color-text)] border border-[var(--color-border)] px-5 py-2.5 rounded-xl hover:bg-[var(--color-bg-muted)] hover:border-[var(--color-sage)] transition-all duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => onRemove(addr.id)}
                className="text-[13px] font-bold text-[var(--color-text-muted)] border border-[var(--color-border)] px-5 py-2.5 rounded-xl hover:bg-[var(--color-terracotta-soft)] hover:text-[var(--color-terracotta)] hover:border-[var(--color-terracotta)]/30 transition-all duration-300"
              >
                {isRemoving ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        );
      })}

      {showAddressForm ? (
        <div className="p-8 border border-[var(--color-border)] rounded-2xl space-y-5 fade-up bg-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-sage)]" />
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-[var(--color-text)] text-xl">
              {editingAddress ? "Edit Address" : "Add New Address"}
            </h4>
            <button 
              onClick={() => {
                setShowAddressForm(false);
                if (editingAddress) onEdit(null);
              }}
              className="text-[var(--color-text-placeholder)] hover:text-[var(--color-terracotta)] transition-colors"
            >
              Cancel
            </button>
          </div>
          <NewAddressForm 
            onSave={onSave}
            isSaving={isSaving}
            hasAddresses={addresses.length > 0}
            initialData={editingAddress}
          />
        </div>
      ) : (
        <button
          onClick={() => setShowAddressForm(true)}
          className="w-full p-8 rounded-2xl border-2 border-dashed border-[var(--color-border)] text-[var(--color-text-placeholder)] font-bold text-sm hover:border-[var(--color-sage)] hover:text-[var(--color-sage)] hover:bg-[var(--color-sage-light)]/50 transition-all duration-300 flex items-center justify-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-full border-2 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          Add New Address
        </button>
      )}
    </div>
  );
}
