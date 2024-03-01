import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; 


const PredictScore = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [userSkills, setUserSkills] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [matchingScore, setMatchingScore] = useState(0);
  const [extractedSkills, setExtractedSkills] = useState([]);
  const [lackedSkills, setLackedSkills] = useState([]);

  const predefinedSkills = ["JavaScript", "React", "Node.js", "CSS", "HTML", "Python", "Django", "SQL", "HTML5", "CSS3", "TAILWINDCSS", "Java", "C++", "TypeScript", " Next.js", "WordPress", " Material-UI","FastAPI", "Bootstrap", "SASS","GraphQL", "Git", "Docker", " Google Cloud Platform", "AWS","Figma","Canva","Cypress","SQLite","Firebase","PostgreSQL","MongoDB","MySQL","Pandas","NumPy", "Matplotlib", "Github", "Redux", "Web3", "Solidity"];

  const handleJobDescriptionChange = (event) => {
    setJobDescription(event.target.value);
  };

  const calculateMatchingScore = () => {
    if (jobDescription.trim() === "" || !userSkills) {
      setMatchingScore(0);
      return;
    }

    const jobDescriptionTokens = jobDescription
      .toLowerCase()
      .match(/\b\w+\b/g) || [];

    let matchingSkillsCount = 0;

    userSkills.forEach((skill) => {
      if (jobDescriptionTokens.includes(skill.toLowerCase())) {
        matchingSkillsCount++;
      }
    });

    const score = (matchingSkillsCount / userSkills.length) * 100;
    setMatchingScore(score.toFixed(2));
  };

  const extractSkillsFromDescription = () => {
    const jobDescriptionTokens = jobDescription.toLowerCase().match(/\b\w+\b/g) || [];
    const foundSkills = predefinedSkills.filter(skill => jobDescriptionTokens.includes(skill.toLowerCase()));
    setExtractedSkills(foundSkills);
  };

  const identifyLackedSkills = () => {
    if (!Array.isArray(userSkills)) {
      return; 
    }
    const userSkillsLower = userSkills.map(skill => skill.toLowerCase());
    const lackedSkills = extractedSkills.filter(skill => !userSkillsLower.includes(skill.toLowerCase()));
    setLackedSkills(lackedSkills);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    calculateMatchingScore();
    extractSkillsFromDescription();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const userData = await response.json();
        const technicalSkills = userData[0]?.technicalSkills;

        if (Array.isArray(technicalSkills) && technicalSkills.length > 0) {
          const allSkills = technicalSkills.flatMap((skillString) =>
            skillString.split(",").map((skill) => skill.trim())
          );
          setUserSkills(allSkills);
        } else if (typeof technicalSkills === "string") {
          setUserSkills(
            technicalSkills.split(",").map((skill) => skill.trim())
          );
        } else {
          console.error(
            "Technical skills data is neither an array nor a string:",
            technicalSkills
          );
          setUserSkills([]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);  

  useEffect(() => {
    identifyLackedSkills();
  }, [extractedSkills, userSkills]); 

  const highlightMatchingSkills = (skill) => {
    if (!jobDescription) return skill;

    const jobDescriptionTokens = jobDescription
      .toLowerCase()
      .match(/\b\w+\b/g) || [];

    if (jobDescriptionTokens.includes(skill.toLowerCase())) {
      return <strong>{skill}</strong>;
    }

    return skill;
  };


 
  return (
    <>
      <div className="xl:mt-4 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
        <div className="flex-[0.75] bg-black-100 p-8 rounded-2xl mt-5">
          <h1 className="font-extrabold text-4xl text-blue-500 mt">Predict Score</h1>
          <p className="text-gray-700 mt-7">
            Feeling unsure about your chances of landing that dream job? Introducing the Predict Score Module, your personalized assessment tool for success! This innovative module analyzes your skills and experience, compares them to specific job descriptions, and delivers a real-time prediction of your potential fit.
          </p>
          <div className="mt-7 mb-6">
            <h3 className="text-gray-900 font-bold mb-2">User Skills:</h3>
            <ul className="list-disc list-inside flex flex-wrap">
              {userSkills && userSkills.map((skill, index) => (
                <li key={index} className="mb-2 w-full sm:w-auto sm:flex-grow">
                  {highlightMatchingSkills(skill)}
                </li>
              ))}
            </ul>
          </div>
          <form className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism" onSubmit={handleSubmit}>
            <label htmlFor="jobDescriptionInput">
              <span className="font-satoshi font-semibold text-base text-gray-700">Enter Job Description</span>
              <textarea value={jobDescription} onChange={handleJobDescriptionChange} placeholder="Write or paste job description here" required className="form_textarea" />
            </label>
            <button className="blue_btn mt-3 font-bold" type="submit">Calculate Matching Score</button>
          </form>
          <p className="mt-4 text-center text-gray-700 font-semibold blue_gradient">Matching Score: {matchingScore}%</p>
          <div className="mt-12">
            <h3 className="text-gray-900 font-bold mb-2">Extracted Skills from Job Description:</h3>
            <ul className="list-disc list-inside flex flex-wrap">
              {extractedSkills.map((skill, index) => (
                <li key={index} className="mb-2 w-full sm:w-auto sm:flex-grow">{skill}</li>
              ))}
            </ul>
          </div>
          <div className="mt-10">
            <h3 className="text-gray-900 font-bold mb-2">Lacked Skills:</h3>
            <ul className="list-disc list-inside flex flex-wrap">
              {lackedSkills.map((skill, index) => (
                <li key={index} className="mb-2 w-full sm:w-auto sm:flex-grow">{skill}</li>
              ))}
            </ul>
            <p className="text-gray-700 mt-7"> 
            Feeling stuck due to skill gaps? 🤔 Visit our courses page to learn and master the skills you need for success. 🌟 From programming to various computer science courses, we offer diverse courses suited to all levels. 📚 Start your journey to growth today! 🚀
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5"></div>
    </>
  );
};

export default PredictScore;



