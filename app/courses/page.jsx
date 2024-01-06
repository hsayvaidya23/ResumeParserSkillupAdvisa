import React from "react";
import Image from "next/image";
import { Courses } from "@utils/courses";

const CourseCard = ({ index, name, description, image, link, tags }) => {
  return (
    <div className="bg-[#F9F6EE] shadow-2xl p-5 rounded-2xl sm:w-[360px] w-full">
      <div className="relative w-full h-[230px] shadow-md">
        <Image
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-2xl"
        />

        <div
          className="absolute inset-0 flex justify-end m-3 card-img_hover gap-2
          "
        >
        </div>
      </div>

      <div
        className="mt-5"
      >
        <h3 className=" font-extrabold text-[24px] cursor-pointer hover:underline shadow-sm hover:shadow-md">
        <a href={link} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        </h3>
        <p className="mt-2 font-normal text-[14px]">{description}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
          {tags && tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
    </div>
  );
};

const Resources = () => {
  return (
    <section className="w-full max-w-full flex-start flex-col gap-10">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> Courses </span>
      </h1>
      <p className="desc text-left max-w-md ">
        Master web development stacks like ReactJS, Next.js, HTML, CSS, and
        more. Dive into data engineering, data science, and artificial
        intelligence. Explore Android and iOS development with Kotlin, Swift,
        and frameworks. Elevate your cloud computing skills with AWS, Azure, and
        Google Cloud. Hone competitive coding expertise in algorithms and
        problem-solving for a comprehensive tech skillset.
      </p>

      <div className="mt-20 flex flex-wrap gap-7">
        {Courses.map((course, index) => (
          <CourseCard key={`course-${index}`} index={index} {...course} />
        ))}
      </div>
      <div className="mt-20"></div>
    </section>
  );
};

export default Resources;
