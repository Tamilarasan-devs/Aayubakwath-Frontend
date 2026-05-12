import { Truck } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductPincodeCheck({
  pincode,
  setPincode,
  pincodeMsg,
  setPincodeMsg,
  checkPincode,
}) {
  return (
    <div className="group w-full rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-sage)] hover:shadow-2xl hover:shadow-[rgba(130,155,28,0.12)] mt-6">
      <div className="flex items-center gap-2 mb-3">
        <Truck
          size={15}
          className="text-[var(--color-text-muted)] transition-colors duration-500 group-hover:text-[var(--color-sage)]"
        />
        <span className="text-sm font-semibold   text-[var(--color-text)]">
          Check Delivery
        </span>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          placeholder="Enter pincode"
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, ""));
            setPincodeMsg(null);
          }}
          className="flex-1 h-11 bg-white border border-[var(--color-border)] px-4 text-sm outline-none focus:border-[var(--color-sage)] placeholder:text-[var(--color-text-placeholder)] transition-colors rounded-lg font-medium"
        />
        <button
          onClick={checkPincode}
          className="h-11 px-5 bg-[var(--color-sage)] text-white text-sm font-semibold shadow-lg shadow-[rgba(130,155,28,0.18)] hover:bg-[var(--color-sage-dark)] transition-all rounded-lg hover:-translate-y-0.5"
        >
          Check
        </button>
      </div>
      {pincodeMsg && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-3 p-3 rounded-lg text-sm font-medium ${
            pincodeMsg.type === "success"
              ? "bg-[var(--color-sage-light)] text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {pincodeMsg.msg}
        </motion.div>
      )}
    </div>
  );
}
