import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import About from "../components/About"
import Services from "../components/Services"
import Jobs from "../components/Jobs"
import ApplicationForm from "../components/ApplicationForm"
import Contact from "../components/Contact"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <div id="home">
        <Hero />
      </div>

      {/* ABOUT SECTION */}
      <div id="about">
        <About />
      </div>

      {/* SERVICES SECTION */}
      <div id="services">
        <Services />
      </div>

      {/* JOBS SECTION */}
      <div id="jobs">
        <Jobs />
      </div>

      {/* APPLICATION FORM */}
      <div id="apply">
        <ApplicationForm />
      </div>

      {/* CONTACT SECTION */}
      <div id="contact">
        <Contact />
      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  )
}