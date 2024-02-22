import React from "react";
import Link from "next/link";

const ResumeForm = ({
  type,
  resumeData,
  setResumeData,
  submitting,
  handleSubmit,
}) => {
  const handleProjectChange = (value, index) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[index] = value;
    setResumeData({ ...resumeData, projects: updatedProjects });
  };

  const addProject = () => {
    const newProject = { name: "", description: "" };
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, newProject],
    });
  };

  const removeProject = (index) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects.splice(index, 1);
    setResumeData({ ...resumeData, projects: updatedProjects });
  };
  const handleTechnicalSkillChange = (value, index) => {
    const updatedTechnicalSkills = [...resumeData.technicalSkills];
    updatedTechnicalSkills[index] = value;
    setResumeData({ ...resumeData, technicalSkills: updatedTechnicalSkills });
  };

  const addTechnicalSkill = () => {
    const newTechnicalSkill = "";
    setResumeData({
      ...resumeData,
      technicalSkills: [...resumeData.technicalSkills, newTechnicalSkill],
    });
  };

  const removeTechnicalSkill = (index) => {
    const updatedTechnicalSkills = [...resumeData.technicalSkills];
    updatedTechnicalSkills.splice(index, 1);
    setResumeData({ ...resumeData, technicalSkills: updatedTechnicalSkills });
  };
  const handleCertificateChange = (value, index) => {
    const updatedCertificates = [...resumeData.certificates];
    updatedCertificates[index] = value;
    setResumeData({ ...resumeData, certificates: updatedCertificates });
  };

  const addCertificate = () => {
    const newCertificate = { name: "", issuer: "", date: "" };
    setResumeData({
      ...resumeData,
      certificates: [...resumeData.certificates, newCertificate],
    });
  };

  const removeCertificate = (index) => {
    const updatedCertificates = [...resumeData.certificates];
    updatedCertificates.splice(index, 1);
    setResumeData({ ...resumeData, certificates: updatedCertificates });
  };

  const handleArrayChange = (value, field) => {
    setResumeData({
      ...resumeData,
      [field]: value.split(",").map((item) => item.trim()),
    });
  };

  const handleObjectChange = (value, field, index) => {
    const updatedArray = [...resumeData[field]];
    updatedArray[index] = value;
    setResumeData({ ...resumeData, [field]: updatedArray });
  };

  const addEntry = (field, newEntry) => {
    setResumeData({ ...resumeData, [field]: [...resumeData[field], newEntry] });
  };

  const removeEntry = (field, index) => {
    const updatedArray = [...resumeData[field]];
    updatedArray.splice(index, 1);
    setResumeData({ ...resumeData, [field]: updatedArray });
  };

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
        <label className="font-bold">
          Full Name
          <input
            type="text"
            value={resumeData.name}
            onChange={(e) =>
              setResumeData({ ...resumeData, name: e.target.value })
            }
            placeholder="Your Full Name"
            required
            className="form_input"
          />
        </label>

        {/* Email */}
        <label className="font-bold">
          Email ID
          <input
            type="email"
            value={resumeData.email}
            onChange={(e) =>
              setResumeData({ ...resumeData, email: e.target.value })
            }
            placeholder="Your Email ID"
            required
            className="form_input"
          />
        </label>

        {/* LinkedIn URL */}
        <label className="font-bold">
          LinkedIn URL
          <input
            type="url"
            value={resumeData.linkedinURL}
            onChange={(e) =>
              setResumeData({ ...resumeData, linkedinURL: e.target.value })
            }
            placeholder="Your LinkedIn URL"
            required
            className="form_input"
          />
        </label>

        {/* Contact Number */}
        <label className="font-bold">
          Contact Number
          <input
            type="tel"
            value={resumeData.contactNumber}
            onChange={(e) =>
              setResumeData({ ...resumeData, contactNumber: e.target.value })
            }
            placeholder="Your Contact Number"
            required
            className="form_input"
          />
        </label>

        {/* Technical Skills */}
        <label className="font-bold">
          Technical Skills
          {resumeData.technicalSkills.map((skill, index) => (
            <div key={index} className="mb-4 flex items-center gap-2">
              <input
                type="text"
                value={skill}
                onChange={(e) =>
                  handleTechnicalSkillChange(e.target.value, index)
                }
                placeholder="Technical Skill"
                required
                className="form_input"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  className="red_btn"
                  onClick={() => removeTechnicalSkill(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-2">
            <button
              type="button"
              className="green_btn"
              onClick={addTechnicalSkill}
            >
              Add Technical Skill
            </button>
          </div>
        </label>

        {/* Projects */}
        <label className="font-bold">
          Projects
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <label className=" block font-normal mt-4">
                Project Name
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) =>
                    handleProjectChange(
                      { ...project, name: e.target.value },
                      index
                    )
                  }
                  placeholder="Project Name"
                  required
                  className="form_input"
                />
              </label>
              <label className="font-normal">
                Project Description
                <textarea
                  value={project.description}
                  onChange={(e) =>
                    handleProjectChange(
                      { ...project, description: e.target.value },
                      index
                    )
                  }
                  placeholder="Project Description"
                  required
                  className="form_textarea"
                />
              </label>
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  className="red_btn"
                  onClick={() => removeProject(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-2">
            <button type="button" className="green_btn" onClick={addProject}>
              Add Project
            </button>
          </div>
        </label>

        {/* Education Section */}
        <label className="font-bold">
          Education
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <label className=" block font-normal mt-4">
                Degree
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) =>
                    handleObjectChange(
                      { ...edu, degree: e.target.value },
                      "education",
                      index
                    )
                  }
                  placeholder="Degree"
                  required
                  className="form_input"
                />
              </label>
              <label className="font-normal">
                Institution
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) =>
                    handleObjectChange(
                      { ...edu, institution: e.target.value },
                      "education",
                      index
                    )
                  }
                  placeholder="Institution"
                  required
                  className="form_input"
                />
              </label>
              <label className="font-normal">
                Year
                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) =>
                    handleObjectChange(
                      { ...edu, year: e.target.value },
                      "education",
                      index
                    )
                  }
                  placeholder="Year"
                  required
                  className="form_input"
                />
              </label>
              {/* Align button to the right */}
              <div className="flex justify-end mt-2">
                <button
                  className="red_btn"
                  type="button"
                  onClick={() => removeEntry("education", index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {/* Align button to the right */}
          <div className="flex justify-end mt-2">
            <button
              className="green_btn"
              type="button"
              onClick={() =>
                addEntry("education", { degree: "", institution: "", year: "" })
              }
            >
              Add Education
            </button>
          </div>
        </label>

        {/* Experience Section */}
        <label className="font-bold">
          Experience
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <label className=" block font-normal mt-4">
                Role
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) =>
                    handleObjectChange(
                      { ...exp, role: e.target.value },
                      "experience",
                      index
                    )
                  }
                  placeholder="Role"
                  required
                  className="form_input"
                />
              </label>
              <label className="font-normal">
                Company
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) =>
                    handleObjectChange(
                      { ...exp, company: e.target.value },
                      "experience",
                      index
                    )
                  }
                  placeholder="Company"
                  required
                  className="form_input"
                />
              </label>
              <label className="font-normal">
                Start Date
                <input
                  type="date"
                  value={exp.startDate}
                  onChange={(e) =>
                    handleObjectChange(
                      { ...exp, startDate: e.target.value },
                      "experience",
                      index
                    )
                  }
                  className="form_input"
                />
              </label>
              <label className="font-normal">
                End Date
                <input
                  type="date"
                  value={exp.endDate}
                  onChange={(e) =>
                    handleObjectChange(
                      { ...exp, endDate: e.target.value },
                      "experience",
                      index
                    )
                  }
                  className="form_input"
                />
              </label>
              <label className="font-normal">
                Description
                <textarea
                  value={exp.description}
                  onChange={(e) =>
                    handleObjectChange(
                      { ...exp, description: e.target.value },
                      "experience",
                      index
                    )
                  }
                  placeholder="Description"
                  required
                  className="form_textarea"
                />
              </label>
              <div className="flex justify-end mt-2">
                <button
                  className="red_btn"
                  type="button"
                  onClick={() => removeEntry("experience", index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {/* Align button to the right */}
          <div className="flex justify-end mt-2">
            <button
              className="green_btn"
              type="button"
              onClick={() =>
                addEntry("experience", {
                  role: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
            >
              Add Experience
            </button>
          </div>
        </label>

        {/* Certificates Section */}
        <label className="font-bold">
          Certificates
          {resumeData.certificates.map((certificate, index) => (
            <div key={index} className="mb-4">
              <label className=" block font-normal mt-4">
                Certificate Name
                <input
                  type="text"
                  value={certificate.name}
                  onChange={(e) =>
                    handleCertificateChange(
                      { ...certificate, name: e.target.value },
                      index
                    )
                  }
                  placeholder="Certificate Name"
                  required
                  className="form_input"
                />
              </label>
              <label className="font-normal">
                Issuer
                <input
                  type="text"
                  value={certificate.issuer}
                  onChange={(e) =>
                    handleCertificateChange(
                      { ...certificate, issuer: e.target.value },
                      index
                    )
                  }
                  placeholder="Issuer"
                  required
                  className="form_input"
                />
              </label>
              <label className="font-normal">
                Date
                <input
                  type="date"
                  value={certificate.date}
                  onChange={(e) =>
                    handleCertificateChange(
                      { ...certificate, date: e.target.value },
                      index
                    )
                  }
                  placeholder="Date"
                  required
                  className="form_input"
                />
              </label>
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  className="red_btn"
                  onClick={() => removeCertificate(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-2">
            <button
              type="button"
              className="green_btn"
              onClick={addCertificate}
            >
              Add Certificate
            </button>
          </div>
        </label>

        {/* Tag */}
        <label className="font-bold">
          Tag
          <input
            type="text"
            value={resumeData.tag}
            onChange={(e) =>
              setResumeData({ ...resumeData, tag: e.target.value })
            }
            placeholder="#web"
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
            className="px-5 py-1.5 text-md bg-primary-blue rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ResumeForm;
