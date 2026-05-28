import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function ApplicationForm() {

  const [jobs, setJobs] = useState([])

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    position: "",
    experience: "",
    nationality: "",
    passport_status: "",
    skills: "",
  })

  const [cvFile, setCvFile] = useState(null)

  // FETCH JOBS FROM SUPABASE
  useEffect(() => {

    fetchJobs()

  }, [])

  async function fetchJobs() {

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {

      console.log(error)

    } else {

      setJobs(data)
    }
  }

  // HANDLE INPUT CHANGES
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // HANDLE FORM SUBMISSION
  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    let cvUrl = ""

    // UPLOAD CV TO SUPABASE STORAGE
    if (cvFile) {

      const fileName = `${Date.now()}-${cvFile.name}`

      const { error: uploadError } = await supabase
        .storage
        .from("cvs")
        .upload(fileName, cvFile)

      if (uploadError) {

        console.log(uploadError)

        alert("CV upload failed")

        setLoading(false)

        return
      }

      const { data } = supabase
        .storage
        .from("cvs")
        .getPublicUrl(fileName)

      cvUrl = data.publicUrl
    }

    // SAVE APPLICATION TO DATABASE
    const { error } = await supabase
      .from("applications")
      .insert([
        {
          ...formData,
          cv_url: cvUrl,
        },
      ])

    setLoading(false)

    if (error) {

      console.log(error)

      alert("Application submission failed")

    } else {

      alert("Application submitted successfully!")

      // RESET FORM
      setFormData({
        full_name: "",
        phone: "",
        email: "",
        position: "",
        experience: "",
        nationality: "",
        passport_status: "",
        skills: "",
      })

      setCvFile(null)
    }
  }

  return (
    <section
      id="apply"
      className="py-20 px-6 bg-white"
    >

      <div className="max-w-6xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-14">

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Submit Your Application
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Apply for premium domestic staff, childcare,
            hospitality, and palace opportunities in Saudi Arabia.
          </p>

        </div>

        {/* FORM CARD */}
        <div className="bg-gray-50 border rounded-[35px] shadow-2xl p-8 md:p-12">

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-7"
          >

            {/* FULL NAME */}
            <div>

              <label className="block text-gray-700 font-semibold mb-3">
                Full Name
              </label>

              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black"
              />

            </div>

            {/* PHONE */}
            <div>

              <label className="block text-gray-700 font-semibold mb-3">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+254..."
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black"
              />

            </div>

            {/* EMAIL */}
            <div className="md:col-span-2">

              <label className="block text-gray-700 font-semibold mb-3">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@gmail.com"
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black"
              />

            </div>

            {/* POSITION */}
            <div>

              <label className="block text-gray-700 font-semibold mb-3">
                Position Applying For
              </label>

              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black"
              >

                <option value="">
                  Select Position
                </option>

                {jobs.map((job) => (

                  <option
                    key={job.id}
                    value={job.title}
                  >
                    {job.title}
                  </option>

                ))}

              </select>

            </div>

            {/* EXPERIENCE */}
            <div>

              <label className="block text-gray-700 font-semibold mb-3">
                Years of Experience
              </label>

              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                placeholder="e.g 5 years"
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black"
              />

            </div>

            {/* NATIONALITY */}
            <div>

              <label className="block text-gray-700 font-semibold mb-3">
                Nationality
              </label>

              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
                placeholder="Enter nationality"
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black"
              />

            </div>

            {/* PASSPORT STATUS */}
            <div>

              <label className="block text-gray-700 font-semibold mb-3">
                Passport Status
              </label>

              <select
                name="passport_status"
                value={formData.passport_status}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black"
              >

                <option value="">
                  Select Status
                </option>

                <option value="Available">
                  Available
                </option>

                <option value="In Process">
                  In Process
                </option>

                <option value="Not Available">
                  Not Available
                </option>

              </select>

            </div>

            {/* SKILLS */}
            <div className="md:col-span-2">

              <label className="block text-gray-700 font-semibold mb-3">
                Work Experience & Skills
              </label>

              <textarea
                rows="6"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                required
                placeholder="Describe your work experience, childcare skills, hospitality background, languages spoken, qualifications, and other professional experience..."
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black"
              ></textarea>

            </div>

            {/* CV UPLOAD */}
            <div className="md:col-span-2">

              <label className="block text-gray-700 font-semibold mb-3">
                Upload CV / Resume
              </label>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setCvFile(e.target.files[0])}
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 bg-white"
              />

            </div>

            {/* SUBMIT BUTTON */}
            <div className="md:col-span-2">

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-5 rounded-2xl text-lg font-bold hover:scale-[1.01] transition duration-300 disabled:opacity-50"
              >

                {loading
                  ? "Submitting Application..."
                  : "Submit Application"}

              </button>

            </div>

          </form>

        </div>

      </div>

    </section>
  )
}