import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Contact() {

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      alert("Please fill all required fields.")
      return
    }

    setLoading(true)

    const { error } = await supabase
      .from("contacts")
      .insert([
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      ])

    setLoading(false)

    if (error) {

      console.error(error)

      alert("Failed to send message.")

      return
    }

    alert("Message sent successfully!")

    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    })
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
            Contact Precious Siyada International Recruiting Agency
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get in touch with our recruitment specialists for
            staff placement, job opportunities, VIP household recruitment,
            domestic workers, hospitality professionals, drivers,
            caregivers, chefs, and staffing solutions across Saudi Arabia.
          </p>

        </div>

        {/* CONTACT CARDS */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">

          {/* EMAIL CARD */}
          <div className="bg-white rounded-[35px] shadow-2xl border p-10 text-center hover:-translate-y-2 transition duration-300">

            <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-8 text-3xl shadow-xl">
              ✉
            </div>

            <h3 className="text-2xl font-bold mb-5">
              Email Address
            </h3>

            <p className="text-gray-600 break-all mb-6">
              siyadainternationalagency@gmail.com
            </p>

            <a
              href="mailto:siyadainternationalagency@gmail.com"
              className="inline-block bg-black text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition duration-300"
            >
              Send Email
            </a>

          </div>

          {/* WHATSAPP CARD */}
          <div className="bg-white rounded-[35px] shadow-2xl border p-10 text-center hover:-translate-y-2 transition duration-300">

            <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 text-3xl shadow-xl">
              ☎
            </div>

            <h3 className="text-2xl font-bold mb-5">
              WhatsApp
            </h3>

            <div className="space-y-3 mb-6">

              <a
                href="https://wa.me/966552591568"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-green-600 text-lg font-bold"
              >
                +966 55 259 1568
              </a>

            </div>

            <a
              href="https://wa.me/966552591568?text=Hello%20Precious%20Siyada%20International%20Recruiting%20Agency.%20I%20would%20like%20more%20information."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition duration-300"
            >
              Chat on WhatsApp
            </a>

          </div>

          {/* FACEBOOK CARD */}
          <div className="bg-white rounded-[35px] shadow-2xl border p-10 text-center hover:-translate-y-2 transition duration-300">

            <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-8 text-3xl shadow-xl">
              f
            </div>

            <h3 className="text-2xl font-bold mb-5">
              Facebook Page
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6">
              Follow us for recruitment updates,
              available vacancies, agency announcements,
              and new opportunities.
            </p>

            <a
              href="https://web.facebook.com/61590455852385/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition duration-300"
            >
              Visit Facebook Page
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
                Precious Siyada International Recruiting Agency specializes
                in recruiting highly qualified domestic workers, childcare
                professionals, hospitality staff, drivers, chefs, caregivers,
                and VIP household employees for families, businesses,
                palaces, and luxury residences across Saudi Arabia.
              </p>

              <div className="space-y-6">

                {/* SERVICE 1 */}
                <div className="flex items-start gap-5">

                  <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">
                    ✓
                  </div>

                  <div>

                    <h4 className="text-xl font-bold mb-1">
                      Domestic Staff Recruitment
                    </h4>

                    <p className="text-gray-400">
                      Professional housekeepers, maids,
                      butlers, laundry attendants,
                      and household workers.
                    </p>

                  </div>

                </div>

                {/* SERVICE 2 */}
                <div className="flex items-start gap-5">

                  <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">
                    ✓
                  </div>

                  <div>

                    <h4 className="text-xl font-bold mb-1">
                      Childcare Professionals
                    </h4>

                    <p className="text-gray-400">
                      Experienced nannies, governesses,
                      babysitters, tutors, and caregivers.
                    </p>

                  </div>

                </div>

                {/* SERVICE 3 */}
                <div className="flex items-start gap-5">

                  <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">
                    ✓
                  </div>

                  <div>

                    <h4 className="text-xl font-bold mb-1">
                      Hospitality & VIP Services
                    </h4>

                    <p className="text-gray-400">
                      Private chefs, hospitality supervisors,
                      palace staff, drivers,
                      and executive household personnel.
                    </p>

                  </div>

                </div>

                {/* SERVICE 4 */}
                <div className="flex items-start gap-5">

                  <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">
                    ✓
                  </div>

                  <div>

                    <h4 className="text-xl font-bold mb-1">
                      International Recruitment
                    </h4>

                    <p className="text-gray-400">
                      Sourcing skilled workers from
                      Kenya, Uganda, Ethiopia,
                      Philippines, Nepal, India,
                      Bangladesh and other countries.
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
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 bg-white outline-none focus:ring-2 focus:ring-black"
                    required
                  />

                </div>

                <a href="tel:+966552591568">
                  Call Now
                </a>

                {/* PHONE */}
                <div>

                  <label className="block mb-2 font-semibold text-gray-700">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+966..."
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 bg-white outline-none focus:ring-2 focus:ring-black"
                    required
                  />

                </div>

                {/* EMAIL */}
                <div>

                  <label className="block mb-2 font-semibold text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 bg-white outline-none focus:ring-2 focus:ring-black"
                    required
                  />

                </div>

                {/* SUBJECT */}
                <div>

                  <label className="block mb-2 font-semibold text-gray-700">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 bg-white outline-none focus:ring-2 focus:ring-black"
                    required
                  />

                </div>

                {/* MESSAGE */}
                <div>

                  <label className="block mb-2 font-semibold text-gray-700">
                    Message
                  </label>

                  <textarea
                    rows="6"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 bg-white outline-none focus:ring-2 focus:ring-black"
                    required
                  ></textarea>

                </div>

                                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-5 rounded-2xl text-lg font-bold hover:scale-[1.02] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Sending Message..."
                    : "Send Message"}
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/966552591568?text=Hello%20Precious%20Siyada%20International%20Recruiting%20Agency.%20I%20would%20like%20more%20information."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white px-6 py-4 rounded-full shadow-2xl hover:scale-110 transition duration-300 font-bold"
      >
        WhatsApp
      </a>

    </section>

  )
}