export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-amber-100 via-white to-amber-50 min-h-screen flex items-center px-6 py-20">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">

        {/* LEFT CONTENT */}
        <div>

          {/* Badge */}
          <div className="inline-block bg-black text-white px-5 py-2 rounded-full text-sm font-semibold mb-6">
            Premium Recruitment Agency
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-8">

            <span className="text-amber-500">Precious</span> Siyada <span className="text-amber-600"> International</span> <span className="text-amber-900"> Recruiting</span> Agency

          </h1>

          {/* Description */}
          <p className="text-xl text-gray-700 leading-relaxed mb-10">

            Specializing in placing high-end domestic staff,
            childcare professionals, private palace staff,
            and hospitality personnel with families in Riyadh
            and across Saudi Arabia.

          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5 mb-12">

            <a
              href="#jobs"
              className="bg-black text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition duration-300 shadow-lg"
            >
              View Open Jobs
            </a>

            <a
              href="#contact"
              className="border-2 border-black px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-black hover:text-white transition duration-300"
            >
              Contact Us
            </a>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">

            <div>
              <h3 className="text-4xl font-bold text-black mb-2">
                500+
              </h3>

              <p className="text-gray-600">
                Successful Placements
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-black mb-2">
                10+
              </h3>

              <p className="text-gray-600">
                Recruitment Categories
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-black mb-2">
                24/7
              </h3>

              <p className="text-gray-600">
                Client Support
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">

          {/* Main Image */}
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop"
            alt="Professional Recruitment"
            className="rounded-[40px] shadow-2xl w-full h-[650px] object-cover"
          />

          {/* Floating Card */}
          <div className="absolute -bottom-8 -left-8 bg-white rounded-3xl shadow-2xl p-6 max-w-xs border">

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Trusted by Families
            </h3>

            <p className="text-gray-600 leading-relaxed mb-4">
              Connecting highly qualified professionals with luxury households
              and royal families across Saudi Arabia.
            </p>

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                ✓
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Verified Recruitment
                </p>

                <p className="text-sm text-gray-500">
                  Trusted & Professional
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}