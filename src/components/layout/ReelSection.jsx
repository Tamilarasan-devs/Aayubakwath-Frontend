// import React, { useState, useRef, useEffect } from "react";

// const videos = [
//   { id: 1, src: "https://www.instagram.com/reel/DTK-QzvE8vu/?igsh=dGgwbnZycDBkMGU=" },
//   { id: 2, src: "https://www.instagram.com/reel/DMKu7w2RRi_/?igsh=OHBiaGN5YXkzYXhj" },
//   { id: 3, src: "https://www.instagram.com/reel/DTK-QzvE8vu/?igsh=dGgwbnZycDBkMGU=" },
//   { id: 4, src: "https://www.instagram.com/reel/DMKu7w2RRi_/?igsh=OHBiaGN5YXkzYXhj" },
//   { id: 5, src: "https://www.instagram.com/reel/DTK-QzvE8vu/?igsh=dGgwbnZycDBkMGU=" },
//   { id: 6, src: "https://www.instagram.com/reel/DMKu7w2RRi_/?igsh=OHBiaGN5YXkzYXhj" },
//   { id: 7, src: "https://www.instagram.com/reel/DTK-QzvE8vu/?igsh=dGgwbnZycDBkMGU=" },
//   { id: 8, src: "https://www.instagram.com/reel/DP-yIjVE94Y/?igsh=MTB5dWVteWIxYXA2Yw==" },
//   { id: 9, src: "https://www.instagram.com/reel/DP-yIjVE94Y/?igsh=MTB5dWVteWIxYXA2Yw==" }
// ];

// export default function VideoCarousel() {
//   const [activeIndex, setActiveIndex] = useState(2);
//   const videoRefs = useRef([]);

//   useEffect(() => {
//     videoRefs.current.forEach((video, index) => {
//       if (!video) return;

//       if (index === 2) {
//         video.currentTime = 0;
//         video.play();
//       } else {
//         video.pause();
//       }
//     });
//   }, [activeIndex]);

//   const nextVideo = () => {
//     setActiveIndex((prev) => (prev + 1) % videos.length);
//   };

//   const prevVideo = () => {
//     setActiveIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
//   };

//   const visibleVideos = [];
//   for (let i = -2; i <= 2; i++) {
//     const index = (activeIndex + i + videos.length) % videos.length;
//     visibleVideos.push(videos[index]);
//   }

//   return (
//     <div className="w-full py-10 px-2 md:px-6 overflow-hidden">

//       {/* Title */}
//       <div className="text-center mb-8">
//         <h2 className="text-xl md:text-3xl font-semibold text-[#03349a]">
//           Real People Real Stories
//         </h2>
//         <p className="text-sm md:text-lg mt-2 font-semibold text-gray-700">
//           Loved By All Age Groups & Indian Skin Types Worldwide
//         </p>
//       </div>

//       <div className="flex items-center justify-center">

//         {/* Left Button */}
//         <button
//           onClick={prevVideo}
//           className="hidden md:flex mr-4 bg-white p-3 rounded-full shadow-md hover:scale-110 transition"
//         >
//           ◀
//         </button>

//         {/* Carousel */}
//         <div className="flex items-center justify-center gap-2 md:gap-6">

//           {visibleVideos.map((video, index) => (
//             <div
//               key={video.id}
//               className={`rounded-xl overflow-hidden transition-all duration-500
//               ${
//                 index === 2
//                   ? "w-[55vw] h-[70vw] md:w-[300px] md:h-[520px] scale-105 shadow-2xl"
//                   : "w-[25vw] h-[40vw] md:w-[180px] md:h-[320px] opacity-60"
//               }`}
//             >
//               <video
//                 ref={(el) => (videoRefs.current[index] = el)}
//                 src={video.src}
//                 muted
//                 loop
//                 playsInline
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))}

//         </div>

//         {/* Right Button */}
//         <button
//           onClick={nextVideo}
//           className="hidden md:flex ml-4 bg-white p-3 rounded-full shadow-md hover:scale-110 transition"
//         >
//           ▶
//         </button>
//       </div>

//       {/* Mobile Buttons */}
//       <div className="flex md:hidden justify-center gap-6 mt-6">
//         <button
//           onClick={prevVideo}
//           className="bg-white px-5 py-2 rounded-full shadow"
//         >
//           Prev
//         </button>
//         <button
//           onClick={nextVideo}
//           className="bg-white px-5 py-2 rounded-full shadow"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";

const videos = [
  { id: 1, src: "https://www.instagram.com/reel/DTK-QzvE8vu/" },
  { id: 2, src: "https://www.instagram.com/reel/DMKu7w2RRi_/" },
  { id: 3, src: "https://www.instagram.com/reel/DP-yIjVE94Y/" },
  { id: 4, src: "https://www.instagram.com/reel/DTK-QzvE8vu/" },
  { id: 5, src: "https://www.instagram.com/reel/DMKu7w2RRi_/" },
  { id: 6, src: "https://www.instagram.com/reel/DP-yIjVE94Y/" },
];

export default function VideoCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);

  const nextVideo = () => {
    setActiveIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setActiveIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const visibleVideos = [];
  for (let i = -2; i <= 2; i++) {
    const index = (activeIndex + i + videos.length) % videos.length;
    visibleVideos.push(videos[index]);
  }

  return (
    <div className="w-full py-10 px-2 md:px-6 overflow-hidden">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-3xl font-semibold">
          <span className="text-black">Real People</span>{" "}
          <span className="text-[#03349a]">Real</span>{" "}
          <span className="text-[#c9643a]">Stories</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#03349a] to-[#c9643a] mx-auto mt-3 rounded-full" />
        <p className="text-sm md:text-lg mt-3 font-semibold text-gray-700">
          Loved By All Age Groups & Indian Skin Types Worldwide
        </p>
      </div>

      <div className="flex items-center justify-center">
        {/* Left Button */}
        <button
          onClick={prevVideo}
          className="hidden md:flex mr-4 bg-white p-3 rounded-full shadow-md hover:scale-110 transition"
        >
          ◀
        </button>

        {/* Carousel */}
        <div className="flex items-center justify-center gap-2 md:gap-6">
          {visibleVideos.map((video, index) => (
            <div
              key={index}
              className={`rounded-xl overflow-hidden transition-all duration-500
              ${
                index === 2
                  ? "w-[55vw] h-[70vw] md:w-[300px] md:h-[520px] scale-105 shadow-2xl"
                  : "w-[25vw] h-[40vw] md:w-[180px] md:h-[320px] opacity-60"
              }`}
            >
              <iframe
                src={`${video.src}embed`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={nextVideo}
          className="hidden md:flex ml-4 bg-white p-3 rounded-full shadow-md hover:scale-110 transition"
        >
          ▶
        </button>
      </div>

      {/* Mobile Buttons */}
      <div className="flex md:hidden justify-center gap-6 mt-6">
        <button
          onClick={prevVideo}
          className="bg-white px-5 py-2 rounded-full shadow"
        >
          Prev
        </button>
        <button
          onClick={nextVideo}
          className="bg-white px-5 py-2 rounded-full shadow"
        >
          Next
        </button>
      </div>
    </div>
  );
}
