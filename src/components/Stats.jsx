export default function Stats() {
  const stats = [
    {
      number: "5,000+",
      title: "Registered Candidates",
    },
    {
      number: "1,200+",
      title: "Successful Placements",
    },
    {
      number: "15+",
      title: "Recruitment Countries",
    },
    {
      number: "98%",
      title: "Client Satisfaction",
    },
  ]

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 text-center">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/10"
            >
              <h3 className="text-4xl md:text-5xl font-black text-amber-400 mb-3">
                {item.number}
              </h3>

              <p className="text-lg text-gray-300">
                {item.title}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}