import { Link } from "react-router-dom"

export default function Footer() {

  return (

    <footer
      id="contact"
      className="bg-black text-white pt-24 pb-10 px-6 relative overflow-hidden"
    >

      {/* BACKGROUND EFFECT */}
      <div className="absolute inset-0 opacity-5">

        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>

      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* TOP SECTION */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-14 mb-20">

          {/* COMPANY INFO */}
          <div>

            <div className="mb-8">

              <h2 className="text-4xl font-black leading-tight mb-4">
                Precious Siyada International Recruiting Agency
              </h2>

              <p className="text-green-500 font-semibold text-lg">
                Recruitment & Domestic Staffing Agency
              </p>

            </div>

            <p className="text-gray-400 leading-relaxed mb-8 text-lg">

              Connecting skilled professionals with premium domestic,
              hospitality, childcare, and luxury household opportunities
              across Saudi Arabia and the Gulf region.

            </p>

            {/* SOCIALS */}
            <div className="flex items-center gap-4">

              <a
                href="https://wa.me/966552591568"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center text-2xl hover:scale-110 transition duration-300 shadow-2xl"
              >
                ☎
              </a>

              <a
                href="mailto:siyadainternationalagency@gmail.com"
                className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-2xl hover:scale-110 transition duration-300 shadow-2xl"
              >
                ✉
              </a>

              <a
                href="#"
                className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl hover:scale-110 transition duration-300 shadow-2xl"
              >
                f
              </a>

            </div>

          </div>

          {/* QUICK LINKS */}
          <div>

            <h3 className="text-2xl font-bold mb-8">
              Quick Links
            </h3>

            <div className="flex flex-col gap-5">

              <a
                href="#home"
                className="text-gray-400 hover:text-white transition duration-300 text-lg"
              >
                Home
              </a>

              <a
                href="#about"
                className="text-gray-400 hover:text-white transition duration-300 text-lg"
              >
                About Us
              </a>

              <a
                href="#services"
                className="text-gray-400 hover:text-white transition duration-300 text-lg"
              >
                Services
              </a>

              <a
                href="#jobs"
                className="text-gray-400 hover:text-white transition duration-300 text-lg"
              >
                Open Jobs
              </a>

              <a
                href="#apply"
                className="text-gray-400 hover:text-white transition duration-300 text-lg"
              >
                Apply Now
              </a>

              <Link
                to="/admin"
                className="text-gray-400 hover:text-white transition duration-300 text-lg"
              >
                Admin Dashboard
              </Link>

            </div>

          </div>

          {/* SERVICES */}
          <div>

            <h3 className="text-2xl font-bold mb-8">
              Our Specialties
            </h3>

            <div className="flex flex-col gap-5 text-gray-400 text-lg">

              <p>Professional Nannies</p>

              <p>Private Chefs</p>

              <p>Luxury Housekeepers</p>

              <p>VIP Drivers</p>

              <p>Hospitality Staff</p>

              <p>Executive House Managers</p>

              <p>Security Personnel</p>

              <p>Elderly Caregivers</p>

            </div>

          </div>

          {/* CONTACT INFO */}
          <div>

            <h3 className="text-2xl font-bold mb-8">
              Contact Information
            </h3>

            <div className="space-y-7 text-gray-400">

              {/* EMAIL */}
              <div>

                <p className="text-white font-bold mb-2 text-lg">
                  Email Address
                </p>

                <p className="break-all text-lg">
                  siyadainternationalagency@gmail.com
                </p>

              </div>

              {/* PHONE */}
              <div>

                <p className="text-white font-bold mb-2 text-lg">
                  WhatsApp Numbers
                </p>

                <p className="text-lg">
                  +966 55 259 1568
                </p>

                <p className="text-lg">
                  +254 722 871 029
                </p>

              </div>

              {/* LOCATION */}
              <div>

                <p className="text-white font-bold mb-2 text-lg">
                  Recruitment Areas
                </p>

                <p className="text-lg">
                  Riyadh • Jeddah • Dammam • Across Saudi Arabia
                </p>

              </div>

              {/* CTA BUTTON */}
              <a
                href="https://wa.me/966552591568"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition duration-300 shadow-2xl mt-4"
              >
                Chat on WhatsApp
              </a>

            </div>

          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-800 pt-10">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

            {/* COPYRIGHT */}
            <div>

              <p className="text-gray-500 text-center lg:text-left text-lg">
                © 2026 Precious Siyada International Recruiting Agency. All rights reserved.
              </p>

            </div>

            {/* LEGAL LINKS */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500">

              <a
                href="#"
                className="hover:text-white transition duration-300"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="hover:text-white transition duration-300"
              >
                Terms & Conditions
              </a>

              <a
                href="#"
                className="hover:text-white transition duration-300"
              >
                Recruitment Policy
              </a>

            </div>

          </div>

        </div>

      </div>

    </footer>
  )
}