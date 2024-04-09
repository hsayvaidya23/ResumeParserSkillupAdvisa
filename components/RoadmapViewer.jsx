import React from "react";
import RoadmapImage from "./RoadmapImage";
import { RoadMaps } from "@utils/developer_roadmaps";

const RoadmapViewer = ({ selectedTitle }) => {
  if (!selectedTitle || selectedTitle.trim() === "") {
    return <div>No title provided for RoadmapViewer.</div>;
  }
  
  console.log("Title passed to RoadmapViewer:", selectedTitle);

  const selectedRoadmap = RoadMaps.find(
    (roadmap) =>
      roadmap.title.toLowerCase().replace(/\s+/g, "-") === selectedTitle.toLowerCase().replace(/\s+/g, "-")
  );

  console.log("Selected roadmap from RoadmapViewer: ", selectedRoadmap)
  console.log("Selected roadmap title from RoadmapViewer: ", selectedRoadmap.title)

  if (!selectedRoadmap) {
    return <div>No roadmap found for the provided title: {selectedTitle}.</div>;
  }

  return (
    <div>
      <h2 className="font-extrabold text-4xl text-blue-500 mt-5">{selectedRoadmap.title}</h2>
      <div className="mt-10"></div>
      <RoadmapImage imageUrl={selectedRoadmap.imageUrl} />
    </div>
  );
};

export default RoadmapViewer;


