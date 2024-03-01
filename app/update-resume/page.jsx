"use client";
import React, { useState, useEffect } from "react";
import { format } from 'date-fns';
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation"; 
import Form from "@components/Form";
import Loading from '@components/Loading';

const EditResume = () => {
  
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const resumeId = searchParams.get('id')

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

  useEffect(() => {
    const getResumeDetails = async () => {
      if (!resumeId) return; 
      const response = await fetch(`/api/resume/${resumeId}`); 
      const data = await response.json();

      const formattedData = {
        ...data,
        experience: data.experience.map(exp => ({
          ...exp,
          startDate: format(new Date(exp.startDate), 'yyyy-MM-dd'),
          endDate: exp.endDate ? format(new Date(exp.endDate), 'yyyy-MM-dd') : '',
        })),
        certificates: data.certificates.map(cert => ({
          ...cert,
          date: format(new Date(cert.date), 'yyyy-MM-dd'),
        })),
      };
      setResumeData(formattedData);
    };

    getResumeDetails();
  }, [resumeId]);

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

  const updateResume = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!resumeId) return alert("Resume ID not found!");

    try {
      const response = await fetch(`/api/resume/${resumeId}`, { 
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          ...resumeData, 
        }),
      });

      const responseData = await response.json(); 
      console.log(responseData); 

      if (response.ok) {
        router.push("/"); 
      } else {
        alert("Failed to update resume.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      resumeData={resumeData}
      setResumeData={setResumeData}
      submitting={submitting}
      handleSubmit={updateResume}
    />
  );
};

export default EditResume;