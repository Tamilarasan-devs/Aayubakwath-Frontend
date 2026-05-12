import React from "react";

export default function PasswordStrengthIndicator({
  passwordChecks,
  password,
  confirmPassword,
}) {
  return (
    <>
      {password && (
        <div className="grid grid-cols-2 gap-1 -mt-2">
          {[
            { key: "length", label: "8+ characters" },
            { key: "upper", label: "Uppercase letter" },
            { key: "lower", label: "Lowercase letter" },
            { key: "number", label: "Number" },
            { key: "special", label: "Special character" },
          ].map(({ key, label }) => (
            <span
              key={key}
            className={`flex items-center gap-1 text-[11px] font-semibold ${passwordChecks[key] ? "text-[var(--color-sage)]" : "text-[#9aa28e]"}`}
            >
              {passwordChecks[key] ? "✓" : "○"} {label}
            </span>
          ))}
        </div>
      )}

      {confirmPassword && (
        <p
          className={`-mt-2 flex items-center gap-1.5 text-[12px] font-semibold ${password === confirmPassword ? "text-[var(--color-sage)]" : "text-red-500"}`}
        >
          {password === confirmPassword
            ? "✓ Passwords match"
            : "✗ Passwords do not match"}
        </p>
      )}
    </>
  );
}
