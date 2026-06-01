import { useState } from "react"
import { Link } from "react-router-dom"

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false)

  return (

    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-xl shadow-lg z-50 border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="flex flex-col"
        >

          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-black leading-tight">
            Precious Siyada
          </h1>

          <span className="text-xs md:text-sm text-gray-500 font-medium">
            Recruitment & Domestic Staffing Agency
          </span>

        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden xl:flex items-center gap-7">

          <a
            href="#home"
            className="text-gray-700 hover:text-black font-semibold transition duration-300"
          >
            Home
          </a>

          <a
            href="#about"
            className="text-gray-700 hover:text-black font-semibold transition duration-300"
          >
            About
          </a>

          <a
            href="#services"
            className="text-gray-700 hover:text-black font-semibold transition duration-300"
          >
            Services
          </a>

          <a
            href="#jobs"
            className="text-gray-700 hover:text-black font-semibold transition duration-300"
          >
            Jobs
          </a>

          <a
            href="#apply"
            className="text-gray-700 hover:text-black font-semibold transition duration-300"
          >
            Apply
          </a>

          <a
            href="#hire-staff"
            className="text-gray-700 hover:text-black font-semibold transition duration-300"
          >
            Hire Staff
          </a>

          <a
            href="#contact"
            className="text-gray-700 hover:text-black font-semibold transition duration-300"
          >
            Contact
          </a>

          {/* WHATSAPP BUTTON */}
          <a
            href="https://wa.me/966552591568"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-5 py-3 rounded-2xl font-semibold shadow-xl hover:scale-105 hover:bg-gray-800 transition duration-300"
          >
            WhatsApp
          </a>

          {/* ADMIN BUTTON */}
          <Link
            to="/admin"
            className="bg-green-600 text-white px-5 py-3 rounded-2xl font-semibold shadow-xl hover:scale-105 hover:bg-green-700 transition duration-300"
          >
            Admin
          </Link>

        </div>

        {/* MOBILE RIGHT SIDE */}
        <div className="flex items-center gap-3 xl:hidden">

          {/* MOBILE WHATSAPP */}
          <a
            href="https://wa.me/966552591568"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg"
          >
            WhatsApp
          </a>

          {/* MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl text-black font-bold"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (

        <div className="xl:hidden bg-white border-t shadow-2xl">

          <div className="flex flex-col px-6 py-8 gap-5">

            <a
              href="#home"
              className="text-gray-700 hover:text-black font-semibold text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </a>

            <a
              href="#about"
              className="text-gray-700 hover:text-black font-semibold text-lg"
              onClick={() => setMenuOpen(false)}
            >
              About
            </a>

            <a
              href="#services"
              className="text-gray-700 hover:text-black font-semibold text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Services
            </a>

            <a
              href="#jobs"
              className="text-gray-700 hover:text-black font-semibold text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Jobs
            </a>

            <a
              href="#apply"
              className="text-gray-700 hover:text-black font-semibold text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Apply
            </a>

            <a
              href="#hire-staff"
              className="text-gray-700 hover:text-black font-semibold text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Hire Staff
            </a>

            <a
              href="#contact"
              className="text-gray-700 hover:text-black font-semibold text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>

            {/* MOBILE ADMIN BUTTON */}
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="bg-green-600 text-white px-6 py-4 rounded-2xl text-center font-bold shadow-xl hover:bg-green-700 transition duration-300"
            >
              Open Admin Dashboard
            </Link>

          </div>

        </div>

      )}

    </nav>
  )
}