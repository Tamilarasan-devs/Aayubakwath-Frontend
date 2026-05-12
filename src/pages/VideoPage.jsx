import React from "react";
import vdo from "../assets/vdo/video.mp4";

export default function VideoPage() {
  return (
    <div className="w-full h-full flex justify-center items-center bg-black">
      <video
        src={vdo}
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      />
    </div>
  );
}