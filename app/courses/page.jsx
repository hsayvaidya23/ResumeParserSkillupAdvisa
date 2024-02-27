"use client"
import React, { useState }  from "react";
import Image from "next/image";
import { Courses } from "@utils/courses";
import SearchBar from '@components/SearchBar';


const CourseCard = ({ name, description, image, link, tags }) => {
  return (
    <div className="bg-[#F9F6EE] shadow-2xl p-5 rounded-2xl sm:w-[360px] w-full">
      <div className="relative w-full h-[230px] shadow-md">
        <Image
          src={image}
          alt={name}
          layout="fill" 
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>
      <div className="mt-5">
        <h3 className="font-extrabold text-[24px] cursor-pointer hover:underline shadow-sm hover:shadow-md">
          <a href={link} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        </h3>
        <p className="mt-2 font-normal text-[14px]">{description}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags && tags.map((tag, index) => (
          <p key={index} className={`text-[14px] ${tag.color}`}>
            #{tag.name}
          </p>
        ))}
      </div>
    </div>
  );
};

const Resources = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(Courses);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const filtered = Courses.filter(course => 
      course.name.toLowerCase().includes(value.toLowerCase()) ||
      course.description.toLowerCase().includes(value.toLowerCase()) ||
      (course.tags && course.tags.some(tag => tag.name.toLowerCase().includes(value.toLowerCase())))
    );
    setFilteredCourses(filtered);
  };

  return (
    <section className="w-full max-w-full flex-start flex-col gap-10">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Courses</span>
      </h1>
      <p className="desc text-left max-w-md">
      Master web development stacks like ReactJS, Next.js, HTML, CSS, and more. 🌐 Dive into data engineering, data science, and artificial intelligence. 📊 Explore Android and iOS development with Kotlin, Swift, and frameworks. 📱 Elevate your cloud computing skills with AWS, Azure, and Google Cloud. ☁️ Hone competitive coding expertise in algorithms and problem-solving for a comprehensive tech skillset. 💻
      </p>

      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        onSearchChange={handleSearchChange}
        context="courses"
      />

      <div className="mt-20 flex flex-wrap gap-7">
        {filteredCourses.map((course, index) => (
          <CourseCard key={`course-${index}`} {...course} />
        ))}
      </div>
      <div className="mt-20"></div>
    </section>
  );
};

export default Resources;