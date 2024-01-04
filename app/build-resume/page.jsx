"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const BuildResume = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [resumeData, setResumeData] = useState({
    name: "",
    contactNumber: "",
    linkedinURL: "",
    email: "",
    education: "",
    experience: "",
    projects: "",
    technicalSkills: "",
    extracurricularActivities: "",
    tag: "",
  });

  const buildResume = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/resume/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          name: resumeData.name,
          contactNumber: resumeData.contactNumber,
          linkedinURL: resumeData.linkedinURL,
          email: resumeData.email,
          education: resumeData.education,
          experience: resumeData.experience,
          projects: resumeData.projects,
          technicalSkills: resumeData.technicalSkills,
          extracurricularActivities: resumeData.extracurricularActivities,
          tag: resumeData.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Build"
      resumeData={resumeData}
      setResumeData={setResumeData}
      submitting={submitting}
      handleSubmit={buildResume}
    />
  );
};

export default BuildResume;
