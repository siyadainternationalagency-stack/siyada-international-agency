import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)

  // SEND MESSAGE
  const handleSubmit = async (e) => {

    e.preventDefault()

    if (
      !formData.name ||
      !formData.email ||
      !formData.message
    ) {
      alert("Please fill all fields")
      return
    }

    setLoading(true)

    const { error } = await supabase
      .from("contacts")
      .insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      ])

    setLoading(false)

    if (error) {

      console.log(error)

      alert("Failed to send message")

    } else {

      alert("Message sent successfully!")

      setFormData({
        name: "",
        email: "",
        message: "",
      })
    }
  }

  return (

    <section
      id="contact"
      className="py-24 px-6 bg-gradient-to-b from-amber-50 to-white"
    >

      <div className="max-w-7xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
            Contact Siyada International Agency
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get in touch with our recruitment specialists for
            staff placement, job applications, VIP household recruitment,
            and hospitality opportunities across Saudi Arabia.
          </p>

        </div>

        {/* CONTACT CARDS */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">

          {/* EMAIL */}
          <div className="bg-white rounded-[35px] shadow-2xl border p-10 text-center hover:-translate-y-2 transition duration-300">

            <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-8 text-3xl shadow-xl">
              ✉
            </div>

            <h3 className="text-2xl font-bold mb-5">
              Email Address
            </h3>

            <p className="text-gray-600 leading-relaxed break-all mb-6">
              siyadainternationalagency@gmail.com
            </p>

            <a
              href="mailto:siyadainternationalagency@gmail.com"
              className="inline-block bg-black text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition duration-300"
            >
              Send Email
            </a>

          </div>

          {/* WHATSAPP */}
          <div className="bg-white rounded-[35px] shadow-2xl border p-10 text-center hover:-translate-y-2 transition duration-300">

            <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 text-3xl shadow-xl">
              ☎
            </div>

            <h3 className="text-2xl font-bold mb-5">
              WhatsApp
            </h3>

            <div className="space-y-3 mb-6">

              <p className="text-gray-700 text-lg font-medium">
                +966 55 259 1568
              </p>

              <p className="text-gray-700 text-lg font-medium">
                +254 722 871 029
              </p>

            </div>

            <a
              href="https://wa.me/966552591568"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition duration-300"
            >
              Chat on WhatsApp
            </a>

          </div>

          {/* FACEBOOK */}
          <div className="bg-white rounded-[35px] shadow-2xl border p-10 text-center hover:-translate-y-2 transition duration-300">

            <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-8 text-3xl shadow-xl">
              f
            </div>

            <h3 className="text-2xl font-bold mb-5">
              Facebook
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6">
              Follow us for recruitment updates,
              available vacancies, and agency announcements.
            </p>

            <a
              href="#"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition duration-300"
            >
              Visit Facebook
            </a>

          </div>

        </div>

        {/* MAIN CONTACT SECTION */}
        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden">

          <div className="grid lg:grid-cols-2">

            {/* LEFT SIDE */}
            <div className="bg-black text-white p-12 lg:p-16">

              <h3 className="text-4xl font-black mb-8 leading-tight">
                Recruitment & Placement Services
              </h3>

              <p className="text-gray-300 leading-relaxed text-lg mb-10">
                We specialize in recruiting trusted and experienced
                domestic staff for VIP residences, luxury households,
                royal families, and hospitality services across Saudi Arabia.
              </p>

              <div className="space-y-6">

                <div className="flex items-start gap-5">

                  <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">
                    ✓
                  </div>

                  <div>

                    <h4 className="text-xl font-bold mb-1">
                      Domestic Staff Recruitment
                    </h4>

                    <p className="text-gray-400">
                      Professional maids, housekeepers,
                      nannies, and butlers.
                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-5">

                  <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">
                    ✓
                  </div>

                  <div>

                    <h4 className="text-xl font-bold mb-1">
                      Childcare Professionals
                    </h4>

                    <p className="text-gray-400">
                      Experienced governesses,
                      babysitters, and caregivers.
                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-5">

                  <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">
                    ✓
                  </div>

                  <div>

                    <h4 className="text-xl font-bold mb-1">
                      Hospitality & VIP Services
                    </h4>

                    <p className="text-gray-400">
                      Palace staff, private chefs,
                      hospitality supervisors, and drivers.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="p-12 lg:p-16 bg-gray-50">

              <h4 className="text-4xl font-black text-gray-900 mb-10">
                Quick Contact Form
              </h4>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* NAME */}
                <div>

                  <label className="block mb-2 font-semibold text-gray-700">
                    Your Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black bg-white"
                  />

                </div>

                {/* EMAIL */}
                <div>

                  <label className="block mb-2 font-semibold text-gray-700">
                    Your Email
                  </label>

                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black bg-white"
                  />

                </div>

                {/* MESSAGE */}
                <div>

                  <label className="block mb-2 font-semibold text-gray-700">
                    Your Message
                  </label>

                  <textarea
                    rows="6"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black bg-white"
                  ></textarea>

                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-5 rounded-2xl text-lg font-bold hover:scale-[1.02] transition duration-300"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}