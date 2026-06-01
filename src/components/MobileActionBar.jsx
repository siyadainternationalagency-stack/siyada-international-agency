export default function MobileActionBar() {
  return (
    <div
      className="
      md:hidden
      fixed
      bottom-0
      left-0
      right-0
      z-50
      bg-white
      border-t
      shadow-xl
      grid
      grid-cols-3
      "
    >
      <a
        href="https://wa.me/966552591568?text=Hello%20Siyada%20International%20Agency"
        target="_blank"
        rel="noopener noreferrer"
        className="text-center py-3 font-semibold"
      >
        💬 WhatsApp
      </a>

      <a
        href="#apply"
        className="text-center py-3 font-semibold"
      >
        📝 Apply
      </a>

      <a
        href="#hire-staff"
        className="text-center py-3 font-semibold"
      >
        👥 Hire Staff
      </a>
    </div>
  )
}