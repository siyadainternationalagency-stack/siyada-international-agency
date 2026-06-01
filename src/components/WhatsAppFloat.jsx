export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/966552591568?text=Hello%20Precious%20Siyada%20International%20Recruiting%20Agency.%20I%20need%20assistance."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="
        fixed
        bottom-20
        md:bottom-6
        right-4
        md:right-6
        z-50
        bg-green-500
        hover:bg-green-600
        text-white
        px-5
        py-4
        rounded-full
        shadow-2xl
        flex
        items-center
        gap-3
        transition-all
        duration-300
        hover:scale-110
      "
    >
      <span className="text-2xl">
        💬
      </span>

      <span className="hidden md:block font-bold whitespace-nowrap">
        WhatsApp Us
      </span>
    </a>
  )
}