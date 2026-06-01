export default function CTASection() {
  return (
    <section className="py-24 bg-black text-white">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-4xl md:text-6xl font-black mb-8">
          Ready to Hire or Apply?
        </h2>

        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
          Whether you are looking for qualified domestic staff,
          hospitality professionals, drivers, nannies, caregivers,
          or searching for your next career opportunity, Siyada
          International Agency is ready to help.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6">

          <a
            href="#hire-staff"
            className="bg-white text-black px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition duration-300"
          >
            Hire Staff
          </a>

          <a
            href="#apply"
            className="bg-amber-500 text-black px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition duration-300"
          >
            Apply for Jobs
          </a>

        </div>

      </div>

    </section>
  )
}