"use client";

import RoadmapViewer from "@components/RoadmapViewer";
import { RoadMaps } from "@utils/developer_roadmaps";
import React, { useState } from "react";
import Link from "next/link";

const RoadmapCard = ({ title, imageUrl, onClick }) => {
  return (
    <div
      className="bg-[#FFFFFF] shadow-2xl p-5 rounded-2xl sm:w-[360px] w-full text-center"
      onClick={() => onClick(title)}
    >
      <div className="mt-5">
        <h3 className="font-extrabold text-[24px] cursor-pointer hover:underline">
          <Link
            legacyBehavior
            href={`/roadmaps/${encodeURIComponent(
              title.toLowerCase().replace(/\s+/g, "-")
            )}`}
          >
            {title}
          </Link>
        </h3>
      </div>
      <div className="mt-10"></div>
    </div>
  );
};

const DevRoadmapPage = () => {
  const [selectedTitle, setSelectedTitle] = useState(null);

  const handleCardClick = (title) => {
    setSelectedTitle(title);
  };

  return (
    <>
      <section className="w-full max-w-full flex-start flex-col gap-10">
        <h1 className="head_text text-left">
          <span className="blue_gradient">Developer RoadMaps</span>
        </h1>
        <p className="desc text-left max-w-md">
          🌐 Welcome to the Roadmaps Page at SkillUpAdvisa! Are you ready to
          embark on an exhilarating journey of skill development and career
          advancement? Look no further! Our Roadmaps Page is your gateway to
          unlocking your full potential and navigating the ever-evolving
          landscape of technology and career paths.
        </p>

        <div className="mt-20"></div>
      </section>

      <div className="flex flex-wrap gap-4">
        {RoadMaps.map((roadmap, index) => (
          <RoadmapCard
            key={index}
            title={roadmap.title}
            imageUrl={roadmap.imageUrl}
            onClick={() => {
              handleCardClick(roadmap.title);
              console.log("Clicked Title:", roadmap.title);
            }}
          />
        ))}
      </div>
      <div className="mt-20">
        {selectedTitle && <RoadmapViewer selectedTitle={selectedTitle} />}
      </div>
    </>
  );
};

export default DevRoadmapPage;
