import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Stats from "../components/Stats"
import About from "../components/About"
import WhyChooseUs from "../components/WhyChooseUs"
import Services from "../components/Services"
import RecruitmentProcess from "../components/RecruitmentProcess"
import Jobs from "../components/Jobs"
import ApplicationForm from "../components/ApplicationForm"
import HireStaff from "../components/HireStaff"
import Testimonials from "../components/Testimonials"
import CTASection from "../components/CTASection"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import WhatsAppFloat from "../components/WhatsAppFloat"
import MobileActionBar from "../components/MobileActionBar"

export default function Home() {

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden pb-20 md:pb-0">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section id="home">
        <Hero />
      </section>

      {/* STATS */}
      <Stats />

      {/* ABOUT */}
      <section id="about">
        <About />
      </section>

      {/* WHY CHOOSE US */}
      <WhyChooseUs />

      {/* SERVICES */}
      <section id="services">
        <Services />
      </section>

      {/* RECRUITMENT PROCESS */}
      <RecruitmentProcess />

      {/* JOBS */}
      <section id="jobs">
        <Jobs />
      </section>

      {/* APPLICATION FORM */}
      <section id="apply">
        <ApplicationForm />
      </section>

      {/* HIRE STAFF */}
      <section id="hire-staff">
        <HireStaff />
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* CONTACT */}
      <section id="contact">
        <Contact />
      </section>

      {/* CALL TO ACTION */}
      <CTASection />

      {/* FLOATING WHATSAPP */}
      <WhatsAppFloat />

      {/* MOBILE ACTION BAR */}
      <MobileActionBar />

      {/* FOOTER */}
      <Footer />

    </div>
  )
}