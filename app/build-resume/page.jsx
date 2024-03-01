"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; 
import Form from "@components/Form";
import Loading from '@components/Loading';

const BuildResume = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) {
      setIsLoading(true);
      router.push('/');
    }
    else {
      setIsLoading(false);
    }
  }, [session, router]);

  if (isLoading) {
    return <div> <Loading /></div>;
  }


  const [submitting, setSubmitting] = useState(false);
  const [resumeData, setResumeData] = useState({
    name: "",
    contactNumber: "",
    linkedinURL: "",
    email: "",
    education: [], 
    experience: [], 
    projects: [], 
    technicalSkills: [], 
    certificates: [], 
    tag: "",
  });

  const buildResume = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/resume/new", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          userId: session?.user.id,
          ...resumeData, 
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