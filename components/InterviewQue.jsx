import React from "react";
import { WebInterviews, AIInterviews, DataScienceInterviews } from "@utils/interviewData";

const InterviewCard = ({
  name,
  link,
}) => (
  <div className="bg-black-200 p-3 rounded-3xl xs:w-[280px] w-full shadow-xl">
    <a href={link} target="_blank" rel="noopener noreferrer" className="text-black font-medium text-[18px] hover:text-blue-300">
      {name}
    </a>
  </div>
);

const InterviewsSection = ({ title, interviews }) => (
  <div className="mt-4 bg-black-100 rounded-[20px]"> 
    <div className="padding bg-tertiary rounded-2xl min-h-[150px]">
      <div>
        <h2 className="font-extrabold text-4xl text-blue-500 mb-2">{title}</h2>
      </div>
    </div>
    <div className="paddingX -mt-8 pb-8 flex flex-wrap gap-3">
      {interviews.map((interview, index) => (
        <InterviewCard key={index} {...interview} />
      ))}
    </div>
  </div>
);

const InterviewsList = () => {
  return (
    <>
      <div className="xl:mt-4 xl:flex-row flex-col-reverse flex gap-8 overflow-hidden">
        <div className="flex-[0.75] bg-black-100 p-10 rounded-xl mt-4">
          <h1 className="font-extrabold text-4xl text-blue-500 mt">Interview Resources</h1>
          <p className="text-gray-700 mt-5">
            Explore our curated list of interview questions and resources to prepare for your next interview. Gain insights and confidence to tackle challenging questions and stand out in your interviews.
          </p>
          <InterviewsSection title="Web Development Interview Questions" interviews={WebInterviews} />
          <InterviewsSection title="AI Interview Questions" interviews={AIInterviews} />
          <InterviewsSection title="Data Science Interview Questions" interviews={DataScienceInterviews} />
          <p className="text-gray-700 mt-5"> 
            Looking for more resources? Visit our courses page to explore additional learning materials and courses designed to enhance your skills and prepare you for success in your tech career.
          </p>
        </div>
      </div>
      <div className="mt-4"></div>
    </>
  );
};

export default InterviewsList;