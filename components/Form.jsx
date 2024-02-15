import React from "react";
import Link from "next/link";

const ResumeForm = ({ type, resumeData, setResumeData, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {type} Resume </span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} Resume and share your professional information with the world.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        {/* Name */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Full Name
          </span>
          <input
            type="text"
            value={resumeData.name}
            onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
            placeholder="Your Full Name"
            required
            className="form_input"
          />
        </label>

        {/* Contact Number */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Contact Number
          </span>
          <input
            type="tel"
            value={resumeData.contactNumber}
            onChange={(e) => setResumeData({ ...resumeData, contactNumber: e.target.value })}
            placeholder="Your Contact Number"
            required
            className="form_input"
          />
        </label>

        {/* LinkedIn URL */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            LinkedIn URL
          </span>
          <input
            type="url"
            value={resumeData.linkedinURL}
            onChange={(e) => setResumeData({ ...resumeData, linkedinURL: e.target.value })}
            placeholder="Your LinkedIn URL"
            required
            className="form_input"
          />
        </label>

        {/* Email ID */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Email ID
          </span>
          <input
            type="email"
            value={resumeData.email}
            onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
            placeholder="Your Email ID"
            required
            className="form_input"
          />
        </label>

        {/* Education Section */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Education
          </span>
          <textarea
            type="text"
            value={resumeData.education}
            onChange={(e) => setResumeData({ ...resumeData, education: e.target.value })}
            placeholder="Your Education"
            required
            className="form_textarea"
          />
        </label>

        {/* Experience Section */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Experience
          </span>
          <textarea
            type="text"
            value={resumeData.experience}
            onChange={(e) => setResumeData({ ...resumeData, experience: e.target.value })}
            placeholder="Your Experience"
            required
            className="form_textarea"
          />
        </label>

        {/* Projects Section */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Projects
          </span>
          <textarea
            value={resumeData.projects}
            onChange={(e) => setResumeData({ ...resumeData, projects: e.target.value })}
            placeholder="List your projects, one per line"
            required
            className="form_textarea"
          />
        </label>

        {/* Technical Skills */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Technical Skills
          </span>
          <input
            type="text"
            value={resumeData.technicalSkills}
            onChange={(e) => setResumeData({ ...resumeData, technicalSkills: e.target.value })}
            placeholder="List your technical skills, separated by commas"
            required
            className="form_input"
          />
        </label>

        {/* Extracurricular Activities */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Extracurricular Activities
          </span>
          <textarea
            value={resumeData.extracurricularActivities}
            onChange={(e) => setResumeData({ ...resumeData, extracurricularActivities: e.target.value })}
            placeholder="List your extracurricular activities, one per line"
            required
            className="form_textarea"
          />
        </label>

        
        {/* Job Category  */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {' '}
            <span className="font-normal">(#SDE, #Webdeveloper, #DataEngineer)</span>
          </span>
          <input
            type="text"
            value={resumeData.tag}
            onChange={(e) => setResumeData({ ...resumeData, tag: e.target.value })}
            placeholder="Your Tag for this Resume"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-blue rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ResumeForm;
