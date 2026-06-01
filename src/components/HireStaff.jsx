import { useState } from "react";
import { supabase } from "../lib/supabase";


export default function HireStaff() {
  const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const PERIODS = [
    "Morning",
    "Afternoon",
    "Evening",
    "Night",
  ];

  const LANGUAGE_OPTIONS = [
    "English",
    "Arabic",
    "Swahili",
    "French",
    "Hindi",
    "Urdu",
    "Tagalog",
    "Nepali",
    "Indonesian",
    "Amharic",
    "Other",
  ];

  const NATIONALITY_OPTIONS = [
    "Kenyan",
    "Ugandan",
    "Tanzanian",
    "Ethiopian",
    "Filipino",
    "Indonesian",
    "Nepalese",
    "Sri Lankan",
    "Indian",
    "Bangladeshi",
    "Any Nationality",
  ];

  const [formData, setFormData] = useState({
    // Employer
    full_name: "",
    company_name: "",
    phone: "",
    whatsapp: "",
    email: "",
    nationality: "",

    // Identification
    id_type: "",
    id_number: "",
    iqama_status: "",

    // Job
    position_needed: "",
    staff_count: "",
    employment_type: "",
    live_in_out: "",
    start_date: "",
    contract_duration: "",

    // Salary
    salary_budget: "",

    // Location
    address: "",
    city: "",
    country: "Saudi Arabia",
    google_maps_link: "",
    latitude: "",
    longitude: "",

    // Family
    adults_count: "",
    children_count: "",
    children_ages: "",
    pets_count: "",
    pet_details: "",
    elderly_members: "",
    elderly_care_needed: false,

    // Requirements
    experience_required: "",
    education_level: "",
    languages: [],
    preferred_languages: [],
    preferred_nationality: "",
    gender_preference: "",
    age_range: "",
    special_skills: "",

    // Schedule
    working_hours_from: "",
    working_hours_to: "",
    weekly_day_off: "",

    availability: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    },

    // Live In
    private_room: false,
    private_bathroom: false,
    wifi_available: false,
    meals_provided: false,

    // Benefits
    medical_insurance: false,
    transport_allowance: false,
    air_ticket_provided: false,
    overtime_available: false,
    bonus_available: false,

    // Emergency Contact
    emergency_name: "",
    emergency_phone: "",

    // Uploads
    id_document: null,

    // Notes
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  const handleLanguageToggle = (language) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language],
    }));
  };

  const handlePreferredLanguageToggle = (language) => {
    setFormData((prev) => ({
      ...prev,
      preferred_languages:
        prev.preferred_languages.includes(language)
          ? prev.preferred_languages.filter(
              (l) => l !== language
            )
          : [...prev.preferred_languages, language],
    }));
  };

  const toggleAvailability = (day, period) => {
    setFormData((prev) => {
      const current = prev.availability[day];

      return {
        ...prev,
        availability: {
          ...prev.availability,
          [day]: current.includes(period)
            ? current.filter((p) => p !== period)
            : [...current, period],
        },
      };
    });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const submitData = {
          full_name: formData.full_name,
          company_name: formData.company_name,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          email: formData.email,
          nationality: formData.nationality,

          id_type: formData.id_type,
          id_number: formData.id_number,
          iqama_status: formData.iqama_status,

          position_needed: formData.position_needed,
          staff_count: Number(formData.staff_count),
          employment_type: formData.employment_type,
          live_in_out: formData.live_in_out,

          start_date: formData.start_date || null,
          contract_duration: formData.contract_duration,

          salary_budget: formData.salary_budget,

          address: formData.address,
          city: formData.city,
          country: formData.country,
          google_maps_link: formData.google_maps_link,

          adults_count: Number(formData.adults_count),
          children_count: Number(formData.children_count),
          children_ages: formData.children_ages,

          pets_count: Number(formData.pets_count),
          pet_details: formData.pet_details,

          elderly_members: Number(formData.elderly_members),
          elderly_care_needed: Boolean(formData.elderly_care_needed),

          experience_required: formData.experience_required,
          education_level: formData.education_level,

          languages: formData.languages, // must be array or object
          preferred_languages: formData.preferred_languages,

          preferred_nationality: formData.preferred_nationality,
          gender_preference: formData.gender_preference,
          age_range: formData.age_range,

          special_skills: formData.special_skills,

          working_hours_from: formData.working_hours_from,
          working_hours_to: formData.working_hours_to,
          weekly_day_off: formData.weekly_day_off,

          availability: formData.availability, // JSON

          private_room: Boolean(formData.private_room),
          private_bathroom: Boolean(formData.private_bathroom),
          wifi_available: Boolean(formData.wifi_available),
          meals_provided: Boolean(formData.meals_provided),

          medical_insurance: Boolean(formData.medical_insurance),
          transport_allowance: Boolean(formData.transport_allowance),
          air_ticket_provided: Boolean(formData.air_ticket_provided),
          overtime_available: Boolean(formData.overtime_available),
          bonus_available: Boolean(formData.bonus_available),

          emergency_name: formData.emergency_name,
          emergency_phone: formData.emergency_phone,

          notes: formData.notes,

          // HR PIPELINE
          request_status: "New Request",
          assigned_recruiter: null,
          priority_level: "Normal",
          request_stage: "Pending Review",
          matched_candidates: 0,
          interviews_scheduled: 0,
          placements_completed: 0,
          created_at: new Date().toISOString(),
        };

        console.log("Submitting:", submitData);

        console.log("===== SENDING TO SUPABASE =====");
        console.log(submitData);

        const {
          data,
          error,
          status,
          statusText,
        } = await supabase
          .from("employer_requests")
          .insert([submitData])
          .select();

        console.log("===== SUPABASE RESPONSE =====");
        console.log("STATUS:", status);
        console.log("STATUS TEXT:", statusText);
        console.log("DATA:", data);
        console.log("ERROR:", error);
        console.log("=============================");

        if (error) {
          throw error;
        }

        alert(
          "Request submitted successfully. Our team will contact you shortly."
        );

          setFormData((prev) => ({
            ...prev,

            full_name: "",
            company_name: "",
            phone: "",
            whatsapp: "",
            email: "",
            nationality: "",

            position_needed: "",
            staff_count: "",
            salary_budget: "",

            notes: "",
          }));

      } catch (error) {
        console.error("Supabase insert error:", error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

  return (
    <section
      id="hire-staff"
      className="py-20 px-6 bg-white"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">
            Hire Professional Staff
          </h2>

          <p className="text-gray-600 text-lg max-w-4xl mx-auto">
            Complete the form below and our
            recruitment team will source,
            screen and match qualified staff
            according to your requirements.
          </p>
        </div>

        <div className="bg-gray-50 border rounded-3xl shadow-xl p-8">

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-6"
          >

            {/* EMPLOYER INFORMATION */}

            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold border-b pb-3">
                Employer Information
              </h3>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Family / Company Name
              </label>

              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                required
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                WhatsApp Number
              </label>

              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Nationality
              </label>

              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            {/* IDENTIFICATION */}

            <div className="md:col-span-2 mt-4">
              <h3 className="text-2xl font-bold border-b pb-3">
                Identification
              </h3>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                ID Type
              </label>

              <select
                name="id_type"
                value={formData.id_type}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              >
                <option value="">
                  Select ID Type
                </option>

                <option value="National ID">
                  National ID
                </option>

                <option value="Iqama">
                  Iqama
                </option>

                <option value="Passport">
                  Passport
                </option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                ID / Passport / Iqama Number
              </label>

              <input
                type="text"
                name="id_number"
                value={formData.id_number}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Iqama Status
              </label>

              <select
                name="iqama_status"
                value={formData.iqama_status}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              >
                <option value="">
                  Select Status
                </option>

                <option value="Citizen">
                  Citizen
                </option>

                <option value="Resident">
                  Resident
                </option>

                <option value="Sponsored">
                  Sponsored
                </option>

                <option value="Not Applicable">
                  Not Applicable
                </option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Upload ID / Passport Copy
              </label>

              <input
                type="file"
                name="id_document"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>
                        {/* JOB REQUIREMENTS */}

            <div className="md:col-span-2 mt-6">
              <h3 className="text-2xl font-bold border-b pb-3">
                Job Requirements
              </h3>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Position Needed
              </label>

              <input
                type="text"
                name="position_needed"
                value={formData.position_needed}
                onChange={handleChange}
                placeholder="Professional Nanny"
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Number of Staff Needed
              </label>

              <input
                type="number"
                name="staff_count"
                value={formData.staff_count}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
                min="1"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Employment Type
              </label>

              <select
                name="employment_type"
                value={formData.employment_type}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              >
                <option value="">
                  Select Employment Type
                </option>

                <option value="Full Time">
                  Full Time
                </option>

                <option value="Part Time">
                  Part Time
                </option>

                <option value="Temporary">
                  Temporary
                </option>

                <option value="Contract">
                  Contract
                </option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Live In / Live Out
              </label>

              <select
                name="live_in_out"
                value={formData.live_in_out}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              >
                <option value="">
                  Select Option
                </option>

                <option value="Live In">
                  Live In
                </option>

                <option value="Live Out">
                  Live Out
                </option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Start Date
              </label>

              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Contract Duration
              </label>

              <select
                name="contract_duration"
                value={formData.contract_duration}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              >
                <option value="">
                  Select Duration
                </option>

                <option value="3 Months">
                  3 Months
                </option>

                <option value="6 Months">
                  6 Months
                </option>

                <option value="1 Year">
                  1 Year
                </option>

                <option value="2 Years">
                  2 Years
                </option>

                <option value="Permanent">
                  Permanent
                </option>
              </select>
            </div>

            {/* SALARY */}

            <div className="md:col-span-2 mt-6">
              <h3 className="text-2xl font-bold border-b pb-3">
                Salary & Benefits
              </h3>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Salary Budget
              </label>

              <input
                type="text"
                name="salary_budget"
                value={formData.salary_budget}
                onChange={handleChange}
                placeholder=""
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div className="flex items-center gap-3 mt-8">
              <input
                type="checkbox"
                name="medical_insurance"
                checked={formData.medical_insurance}
                onChange={handleChange}
              />

              <span>Medical Insurance Provided</span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="transport_allowance"
                checked={formData.transport_allowance}
                onChange={handleChange}
              />

              <span>Transport Allowance</span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="air_ticket_provided"
                checked={formData.air_ticket_provided}
                onChange={handleChange}
              />

              <span>Air Ticket Provided</span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="overtime_available"
                checked={formData.overtime_available}
                onChange={handleChange}
              />

              <span>Overtime Available</span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="bonus_available"
                checked={formData.bonus_available}
                onChange={handleChange}
              />

              <span>Performance Bonus Available</span>
            </div>

            {/* LIVE-IN DETAILS */}

            {formData.live_in_out === "Live In" && (
              <>
                <div className="md:col-span-2 mt-6">
                  <h3 className="text-2xl font-bold border-b pb-3">
                    Live-In Accommodation Details
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="private_room"
                    checked={formData.private_room}
                    onChange={handleChange}
                  />

                  <span>Private Room</span>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="private_bathroom"
                    checked={formData.private_bathroom}
                    onChange={handleChange}
                  />

                  <span>Private Bathroom</span>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="wifi_available"
                    checked={formData.wifi_available}
                    onChange={handleChange}
                  />

                  <span>WiFi Available</span>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="meals_provided"
                    checked={formData.meals_provided}
                    onChange={handleChange}
                  />

                  <span>Meals Provided</span>
                </div>
              </>
            )}

            {/* LOCATION */}

            <div className="md:col-span-2 mt-6">
              <h3 className="text-2xl font-bold border-b pb-3">
                Work Location
              </h3>
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold mb-2">
                Full Address
              </label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street, District, City"
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Country
              </label>

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold mb-2">
                Google Maps Link
              </label>

              <input
                type="text"
                name="google_maps_link"
                value={formData.google_maps_link}
                onChange={handleChange}
                placeholder="Paste Google Maps URL"
                className="w-full border rounded-xl p-4"
              />
            </div>

            {/* FAMILY INFORMATION */}

            <div className="md:col-span-2 mt-6">
              <h3 className="text-2xl font-bold border-b pb-3">
                Household Information
              </h3>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Number of Adults
              </label>

              <input
                type="number"
                name="adults_count"
                value={formData.adults_count}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Number of Children
              </label>

              <input
                type="number"
                name="children_count"
                value={formData.children_count}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Children's Ages
              </label>

              <input
                type="text"
                name="children_ages"
                value={formData.children_ages}
                onChange={handleChange}
                placeholder="2, 5, 8"
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Number of Pets
              </label>

              <input
                type="number"
                name="pets_count"
                value={formData.pets_count}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold mb-2">
                Pet Details
              </label>

              <textarea
                rows="3"
                name="pet_details"
                value={formData.pet_details}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
                placeholder="Dog, Cat, Birds etc."
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Elderly Members
              </label>

              <input
                type="number"
                name="elderly_members"
                value={formData.elderly_members}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div className="flex items-center gap-3 mt-8">
              <input
                type="checkbox"
                name="elderly_care_needed"
                checked={formData.elderly_care_needed}
                onChange={handleChange}
              />

              <span>Elderly Care Required</span>
            </div>

                        {/* WORKER REQUIREMENTS */}

            <div className="md:col-span-2 mt-6">
              <h3 className="text-2xl font-bold border-b pb-3">
                Worker Requirements
              </h3>
            </div>

            {/* LANGUAGES SPOKEN */}

            <div className="md:col-span-2">
              <label className="block font-semibold mb-3">
                Languages Spoken in Household
              </label>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {LANGUAGE_OPTIONS.map((language) => (
                  <label
                    key={language}
                    className="flex items-center gap-2 border rounded-lg p-3"
                  >
                    <input
                      type="checkbox"
                      checked={formData.languages.includes(language)}
                      onChange={() =>
                        handleLanguageToggle(language)
                      }
                    />

                    <span>{language}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* PREFERRED WORKER LANGUAGES */}

            <div className="md:col-span-2">
              <label className="block font-semibold mb-3">
                Preferred Worker Languages
              </label>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {LANGUAGE_OPTIONS.map((language) => (
                  <label
                    key={language}
                    className="flex items-center gap-2 border rounded-lg p-3"
                  >
                    <input
                      type="checkbox"
                      checked={formData.preferred_languages.includes(
                        language
                      )}
                      onChange={() =>
                        handlePreferredLanguageToggle(
                          language
                        )
                      }
                    />

                    <span>{language}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* PREFERRED NATIONALITY */}

            <div>
              <label className="block font-semibold mb-2">
                Preferred Nationality
              </label>

              <select
                name="preferred_nationality"
                value={formData.preferred_nationality}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              >
                <option value="">
                  Select Nationality
                </option>

                {NATIONALITY_OPTIONS.map((nation) => (
                  <option
                    key={nation}
                    value={nation}
                  >
                    {nation}
                  </option>
                ))}
              </select>
            </div>

            {/* GENDER */}

            <div>
              <label className="block font-semibold mb-2">
                Gender Preference
              </label>

              <select
                name="gender_preference"
                value={formData.gender_preference}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              >
                <option value="">
                  No Preference
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>
              </select>
            </div>

            {/* AGE */}

            <div>
              <label className="block font-semibold mb-2">
                Preferred Age Range
              </label>

              <input
                type="text"
                name="age_range"
                value={formData.age_range}
                onChange={handleChange}
                placeholder="25 - 45 Years"
                className="w-full border rounded-xl p-4"
              />
            </div>

            {/* EDUCATION */}

            <div>
              <label className="block font-semibold mb-2">
                Education Level
              </label>

              <select
                name="education_level"
                value={formData.education_level}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              >
                <option value="">
                  Select Education
                </option>

                <option value="Primary">
                  Primary
                </option>

                <option value="Secondary">
                  Secondary
                </option>

                <option value="College">
                  College
                </option>

                <option value="University">
                  University
                </option>
              </select>
            </div>

            {/* EXPERIENCE */}

            <div className="md:col-span-2">
              <label className="block font-semibold mb-2">
                Experience Required
              </label>

              <input
                type="text"
                name="experience_required"
                value={formData.experience_required}
                onChange={handleChange}
                placeholder="3+ Years"
                className="w-full border rounded-xl p-4"
              />
            </div>

            {/* SPECIAL SKILLS */}

            <div className="md:col-span-2">
              <label className="block font-semibold mb-2">
                Special Skills Required
              </label>

              <textarea
                rows="4"
                name="special_skills"
                value={formData.special_skills}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
                placeholder="Cooking, Infant Care, Elderly Care, Driving, VIP Service, Housekeeping, Laundry, First Aid..."
              />
            </div>

            {/* SCHEDULE */}

            <div className="md:col-span-2 mt-6">
              <h3 className="text-2xl font-bold border-b pb-3">
                Weekly Schedule
              </h3>
            </div>

            <div className="md:col-span-2 overflow-x-auto">
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-3">
                      Day
                    </th>

                    {PERIODS.map((period) => (
                      <th
                        key={period}
                        className="border p-3"
                      >
                        {period}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {DAYS.map((day) => (
                    <tr key={day}>
                      <td className="border p-3 font-medium">
                        {day}
                      </td>

                      {PERIODS.map((period) => (
                        <td
                          key={period}
                          className="border text-center"
                        >
                          <input
                            type="checkbox"
                            checked={formData.availability[
                              day
                            ].includes(period)}
                            onChange={() =>
                              toggleAvailability(
                                day,
                                period
                              )
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* WORKING HOURS */}

            <div>
              <label className="block font-semibold mb-2">
                Working Hours From
              </label>

              <input
                type="time"
                name="working_hours_from"
                value={formData.working_hours_from}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Working Hours To
              </label>

              <input
                type="time"
                name="working_hours_to"
                value={formData.working_hours_to}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold mb-2">
                Weekly Day Off
              </label>

              <select
                name="weekly_day_off"
                value={formData.weekly_day_off}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              >
                <option value="">
                  Select Day Off
                </option>

                {DAYS.map((day) => (
                  <option
                    key={day}
                    value={day}
                  >
                    {day}
                  </option>
                ))}
              </select>
            </div>

            {/* EMERGENCY CONTACT */}

            <div className="md:col-span-2 mt-6">
              <h3 className="text-2xl font-bold border-b pb-3">
                Emergency Contact
              </h3>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Emergency Contact Name
              </label>

              <input
                type="text"
                name="emergency_name"
                value={formData.emergency_name}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Emergency Contact Phone
              </label>

              <input
                type="text"
                name="emergency_phone"
                value={formData.emergency_phone}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            {/* NOTES */}

            <div className="md:col-span-2">
              <label className="block font-semibold mb-2">
                Additional Notes / Special Instructions
              </label>

              <textarea
                rows="6"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
                placeholder="Provide any additional information that will help us find the perfect candidate."
              />
            </div>

            {/* SUBMIT */}

            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-5 rounded-2xl text-lg font-bold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading
                  ? "Submitting Request..."
                  : "Submit Recruitment Request"}
              </button>
            </div>

          </form>

        </div>

      </div>

    </section>
  );
}