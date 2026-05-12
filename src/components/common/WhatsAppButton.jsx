import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "9443157282";
  const message = "Hello, I would like to know more about your products.";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-4 sm:bottom-28 sm:left-8 sm:right-auto z-50 flex flex-col items-center">
      <button
        onClick={handleClick}
        className="relative bg-[#25D366] hover:bg-[#20BD5A] text-white p-3.5 rounded-full shadow-[var(--shadow-lg)]
          cursor-pointer border-0 outline-none transition-all duration-200 hover:scale-105 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={22} />
      </button>
    </div>
  );
}
