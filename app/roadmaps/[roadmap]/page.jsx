"use client"
import React, {useState} from "react";
import RoadmapViewer from '@components/RoadmapViewer';
import { RoadMaps } from "@utils/developer_roadmaps";
import { useRouter, usePathname  } from 'next/navigation';
import Loading from '@components/Loading';

const RoadmapPage = () => {
  const router = useRouter();
  const pathname = usePathname() 
  const [loading, setLoading] = useState(true); 

  if (router.isFallback) {
    return <div>Loading...</div>;
  }


  let pageTitle = "Default Roadmap Title";

  switch (pathname) {
    case '/roadmaps/frontend-developer-roadmap':
      pageTitle = "Frontend Developer Roadmap";
      break;
    case '/roadmaps/backend-developer-roadmap':
      pageTitle = "Backend Developer Roadmap";
      break;
    case '/roadmaps/data-science-roadmap':
      pageTitle = "Data Science Roadmap";
      break;
    case '/roadmaps/android-developer-roadmap':
      pageTitle = "Android Developer Roadmap";
      break;
    case '/roadmaps/blockchain-developer-roadmap':
      pageTitle = "Blockchain Developer Roadmap";
      break;
    case '/roadmaps/cyber-security-roadmap':
      pageTitle = "Cyber Security Roadmap";
      break;
    case '/roadmaps/flutter-developer-roadmap':
      pageTitle = "Flutter Developer Roadmap";
      break;
    case '/roadmaps/full-stack-developer-roadmap':
      pageTitle = "Full Stack Developer Roadmap";
      break;
    case '/roadmaps/game-developer-roadmap':
      pageTitle = "Game Developer Roadmap";
      break;
    case '/roadmaps/mlops-roadmap':
      pageTitle = "MLOps Roadmap";
      break;
    case '/roadmaps/postgresql-roadmap':
      pageTitle = "PostgreSQL Roadmap";
      break;
    case '/roadmaps/qa-engineer-roadmap':
      pageTitle = "QA Engineer Roadmap";
      break;
    case '/roadmaps/react-native-developer-roadmap':
      pageTitle = "React Native Developer Roadmap";
      break;
    case '/roadmaps/software-architect-roadmap':
      pageTitle = "Software Architect Roadmap";
      break;
    case '/roadmaps/ux-design-roadmap':
      pageTitle = "UX Design Roadmap";
      break;
    default:
      break;
  }

  const selectedRoadmap = RoadMaps.find(
    (roadmap) =>
      roadmap.title.toLowerCase().replace(/\s+/g, "-") === pageTitle.toLowerCase().replace(/\s+/g, "-")
  );

  return (
    <div>
      <RoadmapViewer selectedTitle={pageTitle} />
    </div>
  );
};

export default RoadmapPage;

