import React from "react";

export default function AuthBackground({ image, alt = "Background" }) {
  return (
    <>
      <img
        src={image}
        alt={alt}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.82)_40%,rgba(255,255,255,0.28)_70%,rgba(8,15,12,0.10)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(130,155,28,0.18),transparent_55%),radial-gradient(circle_at_85%_20%,rgba(8,15,12,0.10),transparent_52%)]" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[rgba(130,155,28,0.18)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[rgba(8,15,12,0.10)] blur-3xl" />
    </>
  );
}

