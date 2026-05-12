import React from "react";

export default function ProgressBar({
  barRef,
  prog,
  thumbW,
  thumbL,
  dragging,
  isThumb,
  onBarClick,
  onThumbMouseDown,
}) {
  return (
    <div
      ref={barRef}
      onClick={onBarClick}
      className="relative h-[4px] rounded-full cursor-pointer"
      style={{ background: "#f3f4f6" }}
    >
      <div
        className="absolute top-0 left-0 h-full rounded-full pointer-events-none"
        style={{
          width: `${prog * 100}%`,
          background: "rgba(17,24,39, 0.2)",
        }}
      />
      <div
        onMouseDown={onThumbMouseDown}
        className="absolute top-0 h-full rounded-full bg-[#111827]"
        style={{
          width: `${thumbW}%`,
          left: `${thumbL}%`,
          boxShadow: "0 0 8px rgba(17,24,39,.5)",
          cursor: dragging && isThumb ? "grabbing" : "grab",
          transition: dragging
            ? "none"
            : "left .08s linear, width .15s ease",
        }}
      />
    </div>
  );
}
