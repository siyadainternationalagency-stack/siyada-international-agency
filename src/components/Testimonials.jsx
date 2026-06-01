export default function Testimonials() {

  const testimonials = [
    {
      name: "Private Family - Riyadh",
      role: "Employer",
      review:
        "Siyada International Agency helped us find a professional nanny who exceeded our expectations. The process was smooth and highly professional.",
    },
    {
      name: "Hospitality Group - Jeddah",
      role: "Employer",
      review:
        "We recruited several hospitality staff through the agency and were impressed by the quality of candidates and fast turnaround time.",
    },
    {
      name: "Sarah M.",
      role: "Job Seeker",
      review:
        "The agency guided me throughout the recruitment process and helped me secure a great opportunity in Saudi Arabia.",
    },
    {
      name: "VIP Household Client",
      role: "Employer",
      review:
        "Excellent communication, professional screening, and reliable candidates. Highly recommended.",
    },
  ]

  return (
    <section className="py-24 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            What Our Clients Say
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Trusted by employers, households, and job seekers across Saudi Arabia.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {testimonials.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-[30px] p-8 shadow-xl border"
            >

              <div className="text-yellow-500 text-2xl mb-4">
                ★★★★★
              </div>

              <p className="text-gray-600 leading-relaxed mb-6 italic">
                "{item.review}"
              </p>

              <div>

                <h4 className="font-bold text-xl">
                  {item.name}
                </h4>

                <p className="text-gray-500">
                  {item.role}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}