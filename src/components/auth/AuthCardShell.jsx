import React from "react";

export default function AuthCardShell({ children }) {
  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <div className="auth-slide-up w-full overflow-hidden rounded-[28px] border border-white/55 bg-white/75 shadow-[0_28px_70px_rgba(47,51,40,0.18)] backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row">{children}</div>
      </div>
    </div>
  );
}

