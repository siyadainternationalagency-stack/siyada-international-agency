import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const LANGUAGE_OPTIONS = [
  "English",
  "Arabic",
  "Swahili",
  "French",
  "Hindi",
  "Urdu",
  "Tagalog",
  "Indonesian",
  "Amharic",
  "Other",
];

const SKILL_OPTIONS = [
  "Housekeeping",
  "Laundry",
  "Ironing",
  "Cooking",
  "Arabic Cooking",
  "Childcare",
  "Infant Care",
  "Elderly Care",
  "Patient Care",
  "Driving",
  "Gardening",
  "Hospitality",
  "Hotel Service",
  "VIP Household Service",
  "First Aid",
  "Computer Skills",
];

export default function ApplicationForm() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [cvFile, setCvFile] = useState(null);
  const [passportFile, setPassportFile] = useState(null);
  const [nationalIdFile, setNationalIdFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const [formData, setFormData] = useState({
    // PERSONAL INFORMATION
    full_name: "",
    gender: "",
    date_of_birth: "",
    marital_status: "",
    nationality: "",
    current_country: "",
    current_city: "",
    phone: "",
    whatsapp: "",
    email: "",

    // DOCUMENTS
    passport_status: "",
    passport_number: "",
    passport_expiry: "",
    national_id: "",

    // SAUDI STATUS
    currently_in_saudi: false,
    iqama_status: "",
    iqama_number: "",
    iqama_expiry: "",
    sponsor_name: "",
    transferable: false,

    // JOB DETAILS
    position: "",
    alternative_position: "",
    expected_salary: "",
    experience: "",
    available_start_date: "",
    employment_type: "",
    live_in_out: "",

    // EXPERIENCE
    countries_worked: "",
    previous_employer: "",
    previous_position: "",
    reason_for_leaving: "",
    reference_contact: "",

    // LANGUAGES & SKILLS
    languages: [],
    skills: [],

    // EDUCATION
    education_level: "",
    certifications: "",
    driving_license: "",

    // MEDICAL
    medical_conditions: "",
    allergies: "",
    physically_fit: "",
    smoker: "",

    // FAMILY
    children_count: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",

    // NOTES
    additional_notes: "",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setJobs(data || []);
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleLanguage = (language) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((item) => item !== language)
        : [...prev.languages, language],
    }));
  };

  const toggleSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((item) => item !== skill)
        : [...prev.skills, skill],
    }));
  };

  const uploadFile = async (bucket, file) => {
    if (!file) return "";

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) {
      throw error;
    }

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const candidateId = `SIY-${Date.now()}`

      const cv_url = await uploadFile("cvs", cvFile);
      const passport_url = await uploadFile(
        "documents",
        passportFile
      );

      const national_id_url = await uploadFile(
        "documents",
        nationalIdFile
      );

      const photo_url = await uploadFile(
        "photos",
        photoFile
      );

      const cleanedData = Object.fromEntries(
  Object.entries(formData).map(([key, value]) => [
    key,
    value === "" ? null : value,
  ])
);

console.log("Submitting application:", cleanedData);

  const { error } = await supabase
    .from("applications")
    .insert([
      {
  ...cleanedData,
        candidate_id: candidateId,

        cv_url,
        passport_url,
        national_id_url,
        photo_url,

        application_status: "New",
        candidate_stage: "Applied",
        interview_status: "Pending",
        deployment_status: "Not Deployed",

        candidate_score: 0,
        recruiter_notes: "",
      },
    ]);

  if (error) throw error;

      alert(
        "Application submitted successfully."
      );
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="apply"
      className="py-20 px-6 bg-white"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Job Seeker Application
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Apply for domestic workers, drivers,
            caregivers, nannies, chefs, hospitality
            staff and VIP household positions in
            Saudi Arabia.
          </p>
        </div>

        <div className="bg-gray-50 border rounded-3xl shadow-2xl p-8 md:p-12">

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-6"
          >

            {/* PERSONAL INFORMATION */}

            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold border-b pb-3">
                Personal Information
              </h3>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
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
              <label className="block mb-2 font-semibold">
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              >
                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Date of Birth
              </label>

              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Marital Status
              </label>

              <select
                name="marital_status"
                value={formData.marital_status}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              >
                <option value="">
                  Select Status
                </option>

                <option value="Single">
                  Single
                </option>

                <option value="Married">
                  Married
                </option>

                <option value="Divorced">
                  Divorced
                </option>

                <option value="Widowed">
                  Widowed
                </option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
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

            <div>
              <label className="block mb-2 font-semibold">
                Current Country
              </label>

              <input
                type="text"
                name="current_country"
                value={formData.current_country}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

                        <div>
              <label className="block mb-2 font-semibold">
                Current City
              </label>

              <input
                type="text"
                name="current_city"
                value={formData.current_city}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border rounded-xl p-4"
                placeholder="+254..."
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                WhatsApp Number
              </label>

              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
                placeholder="+254..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">
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

            {/* DOCUMENT INFORMATION */}

            <div className="md:col-span-2 mt-6">
              <h3 className="text-2xl font-bold border-b pb-3">
                Passport & Identity Information
              </h3>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Passport Status
              </label>

              <select
                name="passport_status"
                value={formData.passport_status}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
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

                <option value="Expired">
                  Expired
                </option>

                <option value="Not Available">
                  Not Available
                </option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Passport Number
              </label>

              <input
                type="text"
                name="passport_number"
                value={formData.passport_number}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Passport Expiry Date
              </label>

              <input
                type="date"
                name="passport_expiry"
                value={formData.passport_expiry}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                National ID Number
              </label>

              <input
                type="text"
                name="national_id"
                value={formData.national_id}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            {/* SAUDI STATUS */}

            <div className="md:col-span-2 mt-6">
              <h3 className="text-2xl font-bold border-b pb-3">
                Saudi Arabia Status
              </h3>
            </div>

            <div className="md:col-span-2 flex items-center gap-3">
              <input
                type="checkbox"
                name="currently_in_saudi"
                checked={formData.currently_in_saudi}
                onChange={handleChange}
              />

              <span>
                I am currently in Saudi Arabia
              </span>
            </div>

            {formData.currently_in_saudi && (
              <>
                <div>
                  <label className="block mb-2 font-semibold">
                    Iqama Status
                  </label>

                  <select
                    name="iqama_status"
                    value={formData.iqama_status}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-4"
                  >
                    <option value="">
                      Select Iqama Status
                    </option>

                    <option value="Valid">
                      Valid
                    </option>

                    <option value="Expired">
                      Expired
                    </option>

                    <option value="Transferable">
                      Transferable
                    </option>

                    <option value="Non-Transferable">
                      Non-Transferable
                    </option>

                    <option value="Exit & Re-Entry">
                      Exit & Re-Entry
                    </option>

                    <option value="Final Exit">
                      Final Exit
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-semibold">
                    Iqama Number
                  </label>

                  <input
                    type="text"
                    name="iqama_number"
                    value={formData.iqama_number}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-4"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold">
                    Iqama Expiry Date
                  </label>

                  <input
                    type="date"
                    name="iqama_expiry"
                    value={formData.iqama_expiry}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-4"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold">
                    Current Sponsor / Kafeel
                  </label>

                  <input
                    type="text"
                    name="sponsor_name"
                    value={formData.sponsor_name}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-4"
                  />
                </div>

                <div className="md:col-span-2 flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="transferable"
                    checked={formData.transferable}
                    onChange={handleChange}
                  />

                  <span>
                    Iqama Transfer Available
                  </span>
                </div>
              </>
            )}

            {/* POSITION DETAILS */}

            <div className="md:col-span-2 mt-6">
              <h3 className="text-2xl font-bold border-b pb-3">
                Position Information
              </h3>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Position Applying For
              </label>

              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full border rounded-xl p-4"
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

            <div>
              <label className="block mb-2 font-semibold">
                Alternative Position
              </label>

              <input
                type="text"
                name="alternative_position"
                value={formData.alternative_position}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
                placeholder="Optional"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Expected Salary (SAR)
              </label>

              <input
                type="text"
                name="expected_salary"
                value={formData.expected_salary}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
                placeholder="Example 2500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Years of Experience
              </label>

              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
                placeholder="5 Years"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Available Start Date
              </label>

              <input
                type="date"
                name="available_start_date"
                value={formData.available_start_date}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Employment Type
              </label>

              <select
                name="employment_type"
                value={formData.employment_type}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              >
                <option value="">
                  Select Type
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
              <label className="block mb-2 font-semibold">
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

                        {/* WORK EXPERIENCE */}

            <div className="md:col-span-2 mt-6">
              <h3 className="text-2xl font-bold border-b pb-3">
                Work Experience
              </h3>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Countries Worked In
              </label>

              <input
                type="text"
                name="countries_worked"
                value={formData.countries_worked}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
                placeholder="Saudi Arabia, UAE, Qatar"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Previous Employer
              </label>

              <input
                type="text"
                name="previous_employer"
                value={formData.previous_employer}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Previous Position
              </label>

              <input
                type="text"
                name="previous_position"
                value={formData.previous_position}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Reason For Leaving
              </label>

              <input
                type="text"
                name="reason_for_leaving"
                value={formData.reason_for_leaving}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">
                Reference Contact
              </label>

              <input
                type="text"
                name="reference_contact"
                value={formData.reference_contact}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
                placeholder="Name + Phone Number"
              />
            </div>

            {/* LANGUAGES */}

            <div className="md:col-span-2 mt-6">
              <h3 className="text-2xl font-bold border-b pb-3">
                Languages Spoken
              </h3>
            </div>

            <div className="md:col-span-2 grid md:grid-cols-3 gap-3">
              {LANGUAGE_OPTIONS.map((language) => (
                <label
                  key={language}
                  className="flex items-center gap-2 border rounded-xl p-3"
                >
                  <input
                    type="checkbox"
                    checked={formData.languages.includes(language)}
                    onChange={() => toggleLanguage(language)}
                  />

                  {language}
                </label>
              ))}
            </div>

            {/* SKILLS */}

            <div className="md:col-span-2 mt-6">
              <h3 className="text-2xl font-bold border-b pb-3">
                Skills & Competencies
              </h3>
            </div>

            <div className="md:col-span-2 grid md:grid-cols-3 gap-3">
              {SKILL_OPTIONS.map((skill) => (
                <label
                  key={skill}
                  className="flex items-center gap-2 border rounded-xl p-3"
                >
                  <input
                    type="checkbox"
                    checked={formData.skills.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                  />

                  {skill}
                </label>
              ))}
            </div>

            {/* EDUCATION */}

            <div className="md:col-span-2 mt-6">
              <h3 className="text-2xl font-bold border-b pb-3">
                Education & Qualifications
              </h3>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Highest Education Level
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

                <option value="Diploma">
                  Diploma
                </option>

                <option value="Bachelor">
                  Bachelor
                </option>

                <option value="Master">
                  Master
                </option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Driving License
              </label>

              <select
                name="driving_license"
                value={formData.driving_license}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              >
                <option value="">
                  Select Option
                </option>

                <option value="Yes">
                  Yes
                </option>

                <option value="No">
                  No
                </option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">
                Certifications & Training
              </label>

              <textarea
                rows="4"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            {/* MEDICAL */}

            <div className="md:col-span-2 mt-6">
              <h3 className="text-2xl font-bold border-b pb-3">
                Medical Information
              </h3>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Medical Conditions
              </label>

              <input
                type="text"
                name="medical_conditions"
                value={formData.medical_conditions}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Allergies
              </label>

              <input
                type="text"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Physically Fit For Work?
              </label>

              <select
                name="physically_fit"
                value={formData.physically_fit}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              >
                <option value="">
                  Select Option
                </option>

                <option value="Yes">
                  Yes
                </option>

                <option value="No">
                  No
                </option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Smoker?
              </label>

              <select
                name="smoker"
                value={formData.smoker}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              >
                <option value="">
                  Select Option
                </option>

                <option value="Yes">
                  Yes
                </option>

                <option value="No">
                  No
                </option>
              </select>
            </div>

            {/* FAMILY */}

            <div className="md:col-span-2 mt-6">
              <h3 className="text-2xl font-bold border-b pb-3">
                Family & Emergency Contact
              </h3>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
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
              <label className="block mb-2 font-semibold">
                Emergency Contact Name
              </label>

              <input
                type="text"
                name="emergency_contact_name"
                value={formData.emergency_contact_name}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Emergency Contact Phone
              </label>

              <input
                type="text"
                name="emergency_contact_phone"
                value={formData.emergency_contact_phone}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>

            {/* DOCUMENTS */}

            <div className="md:col-span-2 mt-6">
              <h3 className="text-2xl font-bold border-b pb-3">
                Upload Documents
              </h3>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Upload CV / Resume
              </label>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) =>
                  setCvFile(e.target.files[0])
                }
                className="w-full border rounded-xl p-4 bg-white"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Passport Copy
              </label>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  setPassportFile(e.target.files[0])
                }
                className="w-full border rounded-xl p-4 bg-white"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                National ID Copy
              </label>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  setNationalIdFile(e.target.files[0])
                }
                className="w-full border rounded-xl p-4 bg-white"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Profile Photo
              </label>

              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) =>
                  setPhotoFile(e.target.files[0])
                }
                className="w-full border rounded-xl p-4 bg-white"
              />
            </div>

            {/* NOTES */}

            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">
                Additional Notes
              </label>

              <textarea
                rows="5"
                name="additional_notes"
                value={formData.additional_notes}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
                placeholder="Anything else you would like the agency to know..."
              />
            </div>

            {/* SUBMIT */}

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-5 rounded-2xl text-lg font-bold hover:opacity-90 transition disabled:opacity-50"
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
  );
}