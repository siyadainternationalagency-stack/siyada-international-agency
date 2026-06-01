export default function RecruitmentProcess() {

  const steps = [
    {
      number: "01",
      title: "Submit Request",
      description:
        "Employer submits staff requirements through our platform.",
    },
    {
      number: "02",
      title: "Consultation",
      description:
        "Our recruitment team reviews your requirements and preferences.",
    },
    {
      number: "03",
      title: "Candidate Shortlisting",
      description:
        "Qualified candidates are selected and presented for review.",
    },
    {
      number: "04",
      title: "Interviews",
      description:
        "Employers interview shortlisted candidates and make selections.",
    },
    {
      number: "05",
      title: "Documentation",
      description:
        "Visa, contracts, travel, and compliance documentation are processed.",
    },
    {
      number: "06",
      title: "Deployment",
      description:
        "The selected candidate begins employment with ongoing support.",
    },
  ]

  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Our Recruitment Process
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A simple, transparent, and professional process designed to
            connect employers with highly qualified staff quickly and efficiently.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {steps.map((step) => (

            <div
              key={step.number}
              className="relative bg-gray-50 border rounded-[30px] p-8 shadow-lg hover:-translate-y-2 transition duration-300"
            >

              <div className="absolute top-6 right-6 text-5xl font-black text-gray-200">
                {step.number}
              </div>

              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mb-6">
                {step.number}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {step.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}