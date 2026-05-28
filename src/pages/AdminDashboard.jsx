import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function AdminDashboard() {

  // ADMIN PASSWORD
  const ADMIN_PASSWORD = "SiyadaAdmin123"

  // STATES
  const [password, setPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  const [applications, setApplications] = useState([])
  const [jobs, setJobs] = useState([])
  const [messages, setMessages] = useState([])

  const [loading, setLoading] = useState(false)

  const [editingJobId, setEditingJobId] = useState(null)

  const [jobForm, setJobForm] = useState({
    title: "",
    location: "",
    salary: "",
    description: "",
  })

  // LOGIN
  const handleLogin = async () => {

    if (password === ADMIN_PASSWORD) {

      setIsAdmin(true)

      await fetchData()

    } else {

      alert("Incorrect password")
    }
  }

  // FETCH DATA
  const fetchData = async () => {

    setLoading(true)

    // FETCH APPLICATIONS
    const { data: applicationsData, error: applicationsError } =
      await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false })

    // FETCH JOBS
    const { data: jobsData, error: jobsError } =
      await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false })

        // FETCH CONTACT MESSAGES
    const { data: messagesData, error: messagesError } =
      await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })

    if (applicationsError) {
      console.log(applicationsError)
    }

    if (jobsError) {
      console.log(jobsError)
    }

    if (messagesError) {
        console.log(messagesError)
    }

    setApplications(applicationsData || [])
    setJobs(jobsData || [])
    setMessages(messagesData || [])

    setLoading(false)
  }

  // DELETE APPLICATION
  const deleteApplication = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this application?"
    )

    if (!confirmDelete) return

    const { error } = await supabase
      .from("applications")
      .delete()
      .eq("id", id)

    if (error) {

      alert("Failed to delete application")
      console.log(error)

    } else {

      alert("Application deleted successfully")
      fetchData()
    }
  }

  // DELETE JOB
  const deleteJob = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this job?"
    )

    if (!confirmDelete) return

    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", id)

    if (error) {

      alert("Failed to delete job")
      console.log(error)

    } else {

      alert("Job deleted successfully")
      fetchData()
    }
  }

  // ADD OR UPDATE JOB
  const handleSaveJob = async (e) => {

    e.preventDefault()

    if (
      !jobForm.title ||
      !jobForm.location ||
      !jobForm.salary ||
      !jobForm.description
    ) {

      alert("Please fill all fields")
      return
    }

    // UPDATE JOB
    if (editingJobId) {

      const { error } = await supabase
        .from("jobs")
        .update({
          title: jobForm.title,
          location: jobForm.location,
          salary: jobForm.salary,
          description: jobForm.description,
        })
        .eq("id", editingJobId)

      if (error) {

        alert("Failed to update job")
        console.log(error)

      } else {

        alert("Job updated successfully")

        setEditingJobId(null)

        setJobForm({
          title: "",
          location: "",
          salary: "",
          description: "",
        })

        fetchData()
      }

    } else {

      // ADD NEW JOB
      const { error } = await supabase
        .from("jobs")
        .insert([
          {
            title: jobForm.title,
            location: jobForm.location,
            salary: jobForm.salary,
            description: jobForm.description,
          },
        ])

      if (error) {

        alert("Failed to add job")
        console.log(error)

      } else {

        alert("Job added successfully")

        setJobForm({
          title: "",
          location: "",
          salary: "",
          description: "",
        })

        fetchData()
      }
    }
  }

  // EDIT JOB
  const handleEditJob = (job) => {

    setEditingJobId(job.id)

    setJobForm({
      title: job.title,
      location: job.location,
      salary: job.salary,
      description: job.description,
    })

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // CANCEL EDIT
  const cancelEdit = () => {

    setEditingJobId(null)

    setJobForm({
      title: "",
      location: "",
      salary: "",
      description: "",
    })
  }

  // LOGIN SCREEN
  if (!isAdmin) {

    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100 px-6">

        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">

          <h1 className="text-4xl font-bold text-center mb-3">
            Siyada Admin
          </h1>

          <p className="text-gray-500 text-center mb-8">
            Login to manage jobs and applications
          </p>

          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-2xl px-5 py-4 mb-6 outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-4 rounded-2xl font-semibold hover:opacity-90 transition"
          >
            Login
          </button>

        </div>

      </section>
    )
  }

  return (
    <section className="min-h-screen bg-gray-100 py-16 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-14">

          <div>

            <h1 className="text-5xl font-bold text-gray-900 mb-3">
              Siyada Admin Dashboard
            </h1>

            <p className="text-gray-600 text-lg">
              Manage applications and job postings
            </p>

          </div>

          <div className="flex gap-4">

            <button
              onClick={fetchData}
              className="bg-black text-white px-6 py-3 rounded-2xl font-semibold"
            >
              Refresh
            </button>

            <button
              onClick={() => setIsAdmin(false)}
              className="bg-red-600 text-white px-6 py-3 rounded-2xl font-semibold"
            >
              Logout
            </button>

          </div>

        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-8 mb-14">

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h3 className="text-gray-500 mb-3">
              Total Applications
            </h3>

            <h2 className="text-5xl font-bold">
              {applications.length}
            </h2>

          </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">

            <h3 className="text-gray-500 mb-3">
              Total Jobs
            </h3>

            <h2 className="text-5xl font-bold">
              {jobs.length}
            </h2>

          </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">

                <h3 className="text-gray-500 mb-3">
                    Contact Messages
                </h3>

                <h2 className="text-5xl font-bold">
                    {messages.length}
                </h2>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">

            <h3 className="text-gray-500 mb-3">
              Platform Status
            </h3>

            <h2 className="text-3xl font-bold text-green-600">
              Active
            </h2>

          </div>

        </div>

        {/* JOB FORM */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-16">

          <div className="flex items-center justify-between mb-10">

            <h2 className="text-4xl font-bold">

              {editingJobId
                ? "Edit Job"
                : "Post New Job"}

            </h2>

            {editingJobId && (

              <button
                onClick={cancelEdit}
                className="bg-gray-200 px-5 py-3 rounded-2xl font-semibold"
              >
                Cancel Edit
              </button>

            )}

          </div>

          <form
            onSubmit={handleSaveJob}
            className="grid md:grid-cols-2 gap-6"
          >

            {/* TITLE */}
            <div>

              <label className="block mb-2 font-semibold">
                Job Title
              </label>

              <input
                type="text"
                value={jobForm.title}
                onChange={(e) =>
                  setJobForm({
                    ...jobForm,
                    title: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-2xl px-5 py-4"
                placeholder="Professional Nanny"
              />

            </div>

            {/* LOCATION */}
            <div>

              <label className="block mb-2 font-semibold">
                Location
              </label>

              <input
                type="text"
                value={jobForm.location}
                onChange={(e) =>
                  setJobForm({
                    ...jobForm,
                    location: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-2xl px-5 py-4"
                placeholder="Riyadh, Saudi Arabia"
              />

            </div>

            {/* SALARY */}
            <div className="md:col-span-2">

              <label className="block mb-2 font-semibold">
                Salary Range
              </label>

              <input
                type="text"
                value={jobForm.salary}
                onChange={(e) =>
                  setJobForm({
                    ...jobForm,
                    salary: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-2xl px-5 py-4"
                placeholder="$1000 - $2000"
              />

            </div>

            {/* DESCRIPTION */}
            <div className="md:col-span-2">

              <label className="block mb-2 font-semibold">
                Job Description
              </label>

              <textarea
                rows="6"
                value={jobForm.description}
                onChange={(e) =>
                  setJobForm({
                    ...jobForm,
                    description: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-2xl px-5 py-4"
                placeholder="Describe the role..."
              ></textarea>

            </div>

            {/* BUTTON */}
            <div className="md:col-span-2">

              <button
                type="submit"
                className="w-full bg-black text-white py-5 rounded-2xl text-lg font-bold hover:opacity-90 transition"
              >
                {editingJobId
                  ? "Update Job"
                  : "Add Job"}
              </button>

            </div>

          </form>

        </div>

        {/* APPLICATIONS */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-16 overflow-x-auto">

          <h2 className="text-3xl font-bold mb-8">
            Candidate Applications
          </h2>

          {loading ? (

            <p>Loading applications...</p>

          ) : applications.length === 0 ? (

            <p>No applications found.</p>

          ) : (

            <table className="w-full min-w-[1000px]">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-4">
                    Name
                  </th>

                  <th className="text-left py-4">
                    Phone
                  </th>

                  <th className="text-left py-4">
                    Email
                  </th>

                  <th className="text-left py-4">
                    Position
                  </th>

                  <th className="text-left py-4">
                    Experience
                  </th>

                  <th className="text-left py-4">
                    CV
                  </th>

                  <th className="text-left py-4">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {applications.map((app) => (

                  <tr
                    key={app.id}
                    className="border-b"
                  >

                    <td className="py-5">
                      {app.full_name}
                    </td>

                    <td>
                      {app.phone}
                    </td>

                    <td>
                      {app.email}
                    </td>

                    <td>
                      {app.position}
                    </td>

                    <td>
                      {app.experience}
                    </td>

                    <td>

                      {app.cv_url ? (

                        <a
                          href={app.cv_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 font-semibold"
                        >
                          View CV
                        </a>

                      ) : (

                        "No CV"
                      )}

                    </td>

                    <td>

                      <button
                        onClick={() =>
                          deleteApplication(app.id)
                        }
                        className="bg-red-600 text-white px-4 py-2 rounded-xl"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

        {/* CONTACT MESSAGES */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-16 overflow-x-auto">

            <h2 className="text-3xl font-bold mb-8">
                Contact Messages
            </h2>

            {messages.length === 0 ? (

            <p>No contact messages found.</p>

         ) : (

            <table className="w-full min-w-[900px]">

            <thead>

                <tr className="border-b">

                <th className="text-left py-4">
                    Name
                </th>

                <th className="text-left py-4">
                    Email
                </th>

                <th className="text-left py-4">
                    Message
                </th>

                </tr>

            </thead>

            <tbody>

                {messages.map((message) => (

                <tr
                    key={message.id}
                    className="border-b"
                >

                    <td className="py-5">
                    {message.name}
                    </td>

                    <td>
                    {message.email}
                    </td>

                    <td className="max-w-[500px]">
                    {message.message}
                    </td>

                </tr>

                ))}

            </tbody>

            </table>

         )}

        </div>

        {/* JOBS */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 overflow-x-auto">

          <h2 className="text-3xl font-bold mb-8">
            Posted Jobs
          </h2>

          {jobs.length === 0 ? (

            <p>No jobs found.</p>

          ) : (

            <table className="w-full min-w-[900px]">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-4">
                    Job Title
                  </th>

                  <th className="text-left py-4">
                    Location
                  </th>

                  <th className="text-left py-4">
                    Salary
                  </th>

                  <th className="text-left py-4">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {jobs.map((job) => (

                  <tr
                    key={job.id}
                    className="border-b"
                  >

                    <td className="py-5">
                      {job.title}
                    </td>

                    <td>
                      {job.location}
                    </td>

                    <td>
                      {job.salary}
                    </td>

                    <td className="flex gap-3 py-5">

                      <button
                        onClick={() =>
                          handleEditJob(job)
                        }
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteJob(job.id)
                        }
                        className="bg-red-600 text-white px-4 py-2 rounded-xl"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </section>
  )
}