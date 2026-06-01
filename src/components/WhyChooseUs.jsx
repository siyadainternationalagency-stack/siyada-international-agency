export default function WhyChooseUs() {
  const reasons = [
    {
      title: "Verified Candidates",
      description:
        "All candidates are carefully screened and verified before recommendation.",
      icon: "✓",
    },
    {
      title: "Background Checks",
      description:
        "Professional verification and reference checks for trusted placements.",
      icon: "🛡",
    },
    {
      title: "Fast Recruitment",
      description:
        "Quick sourcing and shortlisting of qualified candidates.",
      icon: "⚡",
    },
    {
      title: "Replacement Support",
      description:
        "Support and replacement options where applicable.",
      icon: "🔄",
    },
    {
      title: "Multilingual Staff",
      description:
        "Candidates with English, Arabic and other language skills.",
      icon: "🌍",
    },
    {
      title: "24/7 Assistance",
      description:
        "Dedicated support for employers and job seekers.",
      icon: "☎",
    },
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Why Choose Siyada International Agency
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We connect employers with qualified, experienced,
            and professionally vetted staff across domestic,
            hospitality, childcare, and VIP household sectors.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {reasons.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-[30px] p-8 shadow-xl border hover:-translate-y-2 transition duration-300"
            >
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl mb-6">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}