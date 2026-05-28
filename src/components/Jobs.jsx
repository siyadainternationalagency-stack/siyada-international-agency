import { useState } from "react"
import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Jobs() {

  // OWNER PASSWORD
  // Change this password to your own secure password
  const OWNER_PASSWORD = "SiyadaAdmin123"

  // STATES
  const [jobs, setJobs] = useState([])

  const [isAdmin, setIsAdmin] = useState(false)
  const [password, setPassword] = useState("")

  useEffect(() => {

    fetchJobs()

    }, [])

    async function fetchJobs() {

      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {

        console.log(error)

      } else {

        setJobs(data)
      }
    }

  const [newJob, setNewJob] = useState({
    title: "",
    location: "",
    salary: "",
    description: "",
  })

  // LOGIN FUNCTION
  const handleLogin = () => {
    if (password === OWNER_PASSWORD) {
      setIsAdmin(true)
      alert("Admin access granted!")
    } else {
      alert("Incorrect password")
    }
  }

  // ADD JOB FUNCTION
  const handleAddJob = async (e) => {

  e.preventDefault()

  if (
    !newJob.title ||
    !newJob.location ||
    !newJob.salary ||
    !newJob.description
  ) {
    alert("Please fill all fields")
    return
  }

  const { error } = await supabase
    .from('jobs')
    .insert([newJob])

  if (error) {

    console.log(error)

    alert("Error posting job")

  } else {

    alert("Job posted successfully!")

    setNewJob({
      title: "",
      location: "",
      salary: "",
      description: "",
    })

    fetchJobs()
  }
}

  return (
    <section id="jobs" className="py-20 px-6 bg-gray-50">

      <div className="max-w-7xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-14">

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Open Job Opportunities
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore available positions for domestic staff,
            childcare professionals, hospitality workers,
            and private household personnel in Saudi Arabia.
          </p>

        </div>

        {/* JOB LIST */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">

          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-[30px] overflow-hidden shadow-xl border hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              {/* TOP IMAGE */}
              <div className="relative">

                <img
                  src={
                    // NANNY / CHILDCARE
                    job.title.toLowerCase().includes("nanny") ||
                    job.title.toLowerCase().includes("babysitter") ||
                    job.title.toLowerCase().includes("governess") ||
                    job.title.toLowerCase().includes("childcare")
                      ? "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop"

                    // CHEF / COOK
                    : job.title.toLowerCase().includes("chef") ||
                      job.title.toLowerCase().includes("cook") ||
                      job.title.toLowerCase().includes("kitchen")
                    ? "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop"

                    // DRIVER / TRANSPORT
                    : job.title.toLowerCase().includes("driver") ||
                      job.title.toLowerCase().includes("chauffeur")
                    ? "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"

                    // HOUSEKEEPER / CLEANING
                    : job.title.toLowerCase().includes("housekeeper") ||
                      job.title.toLowerCase().includes("maid") ||
                      job.title.toLowerCase().includes("cleaner") ||
                      job.title.toLowerCase().includes("laundry")
                    ? "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop"

                    // BUTLER / HOSPITALITY
                    : job.title.toLowerCase().includes("butler") ||
                      job.title.toLowerCase().includes("hospitality") ||
                      job.title.toLowerCase().includes("waiter") ||
                      job.title.toLowerCase().includes("server")
                    ? "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop"

                    // SECURITY
                    : job.title.toLowerCase().includes("security") ||
                      job.title.toLowerCase().includes("guard") ||
                      job.title.toLowerCase().includes("protection")
                    ? "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop"

                    // CAREGIVER / MEDICAL
                    : job.title.toLowerCase().includes("caregiver") ||
                      job.title.toLowerCase().includes("nurse") ||
                      job.title.toLowerCase().includes("elderly") ||
                      job.title.toLowerCase().includes("medical")
                    ? "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop"

                    // PERSONAL ASSISTANT / OFFICE
                    : job.title.toLowerCase().includes("assistant") ||
                      job.title.toLowerCase().includes("secretary") ||
                      job.title.toLowerCase().includes("administrator")
                    ? "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop"

                    // MANAGEMENT
                    : job.title.toLowerCase().includes("manager") ||
                      job.title.toLowerCase().includes("supervisor") ||
                      job.title.toLowerCase().includes("director")
                    ? "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop"

                    // RECEPTION / FRONT DESK
                    : job.title.toLowerCase().includes("receptionist") ||
                      job.title.toLowerCase().includes("front desk")
                    ? "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop"

                    // BEAUTY / SPA
                    : job.title.toLowerCase().includes("spa") ||
                      job.title.toLowerCase().includes("beauty") ||
                      job.title.toLowerCase().includes("salon") ||
                      job.title.toLowerCase().includes("hair")
                    ? "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop"

                    // GARDENER / OUTDOOR
                    : job.title.toLowerCase().includes("gardener") ||
                      job.title.toLowerCase().includes("garden") ||
                      job.title.toLowerCase().includes("landscape")
                    ? "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1200&auto=format&fit=crop"

                    // TUTOR / EDUCATION
                    : job.title.toLowerCase().includes("teacher") ||
                      job.title.toLowerCase().includes("tutor") ||
                      job.title.toLowerCase().includes("education")
                    ? "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"

                    // DEFAULT PROFESSIONAL IMAGE
                    : "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop"
                  }
                  alt={job.title}
                  className="w-full h-56 object-cover"
                />

                {/* SALARY BADGE */}
                <div className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded-xl font-semibold shadow-lg">
                  {job.salary}
                </div>

              </div>

              {/* CARD CONTENT */}
              <div className="p-8">

                {/* JOB TITLE */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {job.title}
                </h3>

                {/* LOCATION */}
                <div className="flex items-center gap-2 text-gray-500 mb-5">

                  <span className="text-lg">📍</span>

                  <p className="font-medium">
                    {job.location}
                  </p>

                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-700 leading-relaxed mb-8">
                  {job.description}
                </p>

                {/* BUTTON */}
                <a
                  href="#apply"
                  className="block text-center bg-black text-white py-4 rounded-2xl font-semibold hover:scale-[1.02] transition duration-300"
                >
                  Apply Now
                </a>

              </div>

            </div>
          ))}

        </div>

        {/* ADMIN LOGIN */}
        {!isAdmin && (

          <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl border p-10 mb-20">

            <h3 className="text-3xl font-bold text-center mb-8">
              Owner Login
            </h3>

            <div className="space-y-5">

              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black"
              />

              <button
                onClick={handleLogin}
                className="w-full bg-black text-white py-4 rounded-2xl text-lg font-semibold hover:scale-[1.02] transition duration-300"
              >
                Login as Owner
              </button>

            </div>

          </div>

        )}

        {/* ADMIN JOB POST FORM */}
        {isAdmin && (

          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border p-10">

            <h3 className="text-4xl font-bold text-center mb-10">
              Post a New Job
            </h3>

            <form
              onSubmit={handleAddJob}
              className="grid md:grid-cols-2 gap-6"
            >

              {/* Job Title */}
              <div>

                <label className="block text-gray-700 font-medium mb-2">
                  Job Title
                </label>

                <input
                  type="text"
                  placeholder="e.g Professional Nanny"
                  value={newJob.title}
                  onChange={(e) =>
                    setNewJob({ ...newJob, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black"
                />

              </div>

              {/* Location */}
              <div>

                <label className="block text-gray-700 font-medium mb-2">
                  Location
                </label>

                <input
                  type="text"
                  placeholder="e.g Riyadh, Saudi Arabia"
                  value={newJob.location}
                  onChange={(e) =>
                    setNewJob({ ...newJob, location: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black"
                />

              </div>

              {/* Salary */}
              <div className="md:col-span-2">

                <label className="block text-gray-700 font-medium mb-2">
                  Salary Range
                </label>

                <input
                  type="text"
                  placeholder="e.g $1200 - $2000"
                  value={newJob.salary}
                  onChange={(e) =>
                    setNewJob({ ...newJob, salary: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black"
                />

              </div>

              {/* Description */}
              <div className="md:col-span-2">

                <label className="block text-gray-700 font-medium mb-2">
                  Job Description
                </label>

                <textarea
                  rows="6"
                  placeholder="Describe the position requirements..."
                  value={newJob.description}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      description: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black"
                ></textarea>

              </div>

              {/* Submit */}
              <div className="md:col-span-2">

                <button
                  type="submit"
                  className="w-full bg-black text-white py-5 rounded-2xl text-lg font-semibold hover:scale-[1.02] transition duration-300"
                >
                  Post Job
                </button>

              </div>

            </form>

          </div>

        )}

      </div>

    </section>
  )
}