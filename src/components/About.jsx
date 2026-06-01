export default function About() {
  return (
    <section className="py-20 px-6 bg-gray-50">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Precious Siyada International Recruiting Agency
          </h2>

          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Precious Siyada International Recruiting Agency is a premium recruitment agency specializing
            in placing highly qualified domestic staff, childcare professionals,
            hospitality personnel, and private palace staff with distinguished
            families in Riyadh and across Saudi Arabia.
          </p>

        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>

            <h3 className="text-3xl font-semibold mb-6 text-gray-900">
              Trusted Recruitment Excellence
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              We are dedicated to connecting skilled professionals with
              high-end households, royal families, and luxury residences.
              Our recruitment process focuses on professionalism,
              trustworthiness, confidentiality, and exceptional service standards.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Whether families require experienced nannies, private chefs,
              housekeepers, drivers, butlers, or governesses, Siyada
              International Agency ensures every placement meets the highest
              expectations of quality and reliability.
            </p>

            {/* Features */}
            <div className="space-y-4">

              <div className="flex items-start gap-4">
                <div className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>

                <div>
                  <h4 className="font-semibold text-lg">
                    Professional Screening
                  </h4>

                  <p className="text-gray-600">
                    Every candidate undergoes a careful selection and verification process.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>

                <div>
                  <h4 className="font-semibold text-lg">
                    Luxury Household Placements
                  </h4>

                  <p className="text-gray-600">
                    We serve private households, VIP clients, and royal families.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>

                <div>
                  <h4 className="font-semibold text-lg">
                    International Recruitment
                  </h4>

                  <p className="text-gray-600">
                    Connecting skilled professionals with opportunities across Saudi Arabia.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Image */}
          <div>

            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop"
              alt="Professional Recruitment"
              className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
            />

          </div>

        </div>

      </div>

    </section>
  )
}