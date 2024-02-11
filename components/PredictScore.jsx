import React, { useEffect, useState } from "react";

const PredictScore = () => {
  const [userSkills, setUserSkills] = useState(null); 
  const [jobDescription, setJobDescription] = useState("");
  const [matchingScore, setMatchingScore] = useState(0);

  
  const handleJobDescriptionChange = (event) => {
    setJobDescription(event.target.value);
  };

  
  const calculateMatchingScore = () => {
    if (jobDescription.trim() === "" || !userSkills) {
      setMatchingScore(0);
      return;
    }

    const jobDescriptionTokens = jobDescription.toLowerCase().match(/\b\w+\b/g); 

    let matchingSkillsCount = 0;

    userSkills.forEach((skill) => {
      if (jobDescriptionTokens.includes(skill.toLowerCase())) {
        matchingSkillsCount++;
      }
    });

    const score = (matchingSkillsCount / userSkills.length) * 100;
    setMatchingScore(score.toFixed(2));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    calculateMatchingScore();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/resume");
        const userData = await response.json();
        const technicalSkills = userData[0]?.technicalSkills;

        if (Array.isArray(technicalSkills) && technicalSkills.length > 0) {
          const skillsString = technicalSkills[0]; 
          setUserSkills(skillsString.split(",").map((skill) => skill.trim()));
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

  return (
    <>
      <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
        <div className="flex-[0.75] bg-black-100 p-8 rounded-2xl mt-5">
          <h1 className="font-extrabold  text-4xl text-blue-500 mt">
            Predict Score
          </h1>
          <p className="text-gray-700 mt-7">
            Feeling unsure about your chances of landing that dream job?
            Introducing the Predict Score Module, your personalized assessment
            tool for success! This innovative module analyzes your skills and
            experience, compares them to specific job descriptions, and delivers
            a real-time prediction of your potential fit.
          </p>
          <div className="mt-7 mb-6">
            <h3 className="text-gray-900 font-bold mb-2">User Skills:</h3>
            <ul className="list-disc list-inside flex flex-wrap">
              {userSkills &&
                userSkills.map((skill, index) => (
                  <li
                    key={index}
                    className="mb-2 w-full sm:w-auto sm:flex-grow"
                  >
                    {skill}
                  </li>
                ))}
            </ul>
          </div>

          <form className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism" onSubmit={handleSubmit}>
            <label htmlFor="jobDescriptionInput">
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Enter Job Description
              </span>
              <textarea
                value={jobDescription}
                onChange={handleJobDescriptionChange}
                placeholder="Write or paste job description here"
                required
                className="form_textarea"
              />
            </label>
            <button className="blue_btn mt-3 font-bold" type="submit">
              Calculate Matching Score
            </button>
          </form>
          <p className="mt-4 text-center text-gray-700 font-semibold blue_gradient">Matching Score: {matchingScore}%</p> 
        </div>
      </div>
      <div className="mt-20"></div>
    </>
  );
};

export default PredictScore;
