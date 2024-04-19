"use client"
import React, { useState, useEffect} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Jobs } from "@utils/jobs";
import SearchBar from '@components/SearchBar';
import Loading from '@components/Loading';

const JobsCard = ({ index, image, link, tags, company_name, job_position }) => {
  return (
    <div className="bg-[#F9F6EE] shadow-2xl p-5 rounded-2xl sm:w-[360px] w-full">
      <div className="relative w-full h-[230px] shadow-md">
        <Image
          src={image}
          alt={company_name}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      <div className="mt-5">
        <h3 className="font-extrabold text-[24px] cursor-pointer hover:underline shadow-sm ">
          <a href={link} target="_blank" rel="noopener noreferrer">
            {job_position}
          </a>
        </h3>
        <p className="mt-2 font-normal text-[14px]">{company_name}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags &&
          tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
      </div>
      <div className="mt-3 font-bold w-24 blue_btn">
        <a href={link} target="_blank" rel="noopener noreferrer">APPLY</a>
      </div>
    </div>
  );
};

const JobsList = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(Jobs);

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

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filtered = Jobs.filter(job => 
      job.company_name.toLowerCase().includes(value) ||
      job.job_position.toLowerCase().includes(value) ||
      (job.tags && job.tags.some(tag => tag.name.toLowerCase().includes(value)))
    );
    setFilteredJobs(filtered);
  };

  return (
    <section className="w-full max-w-full flex-start flex-col gap-10">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Jobs</span>
      </h1>
      <p className="desc text-left max-w-md">
        🚀 Unlock Your Career Potential with SkillUpAdvisa! 🌐 Are you ready to take the next big step in your career journey? Look no further! SkillUpAdvisa is your one-stop destination for discovering, applying, and securing your dream job. We connect talent with opportunity, making job hunting a seamless and rewarding experience.
      </p>

      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        onSearchChange={handleSearchChange}
        context="jobs"
      />
      <div className="mt-20 flex flex-wrap gap-7">
        {filteredJobs.map((job, index) => (
          <JobsCard key={`job-${index}`} index={index} {...job} />
        ))}
      </div>
      <div className="mt-20"></div>
    </section>
  );
};

export default JobsList;