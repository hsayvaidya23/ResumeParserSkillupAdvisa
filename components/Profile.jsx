import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ResumeCard from "./ResumeCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const namer = session?.user.name || "";
  const emailr = session?.user.email || "";

  return (
    <>
      <section className="w-full">
        {/* Profile Name and Description */}
        <div className="text-left">
          <h1 className="head_text">
            <span className="blue_gradient">{name} Profile</span>
          </h1>
          <p className="desc">{desc}</p>
        </div>

        {/* Avatar, Name, and Email */}
        <div className="xl:mt-12 flex flex-col overflow-hidden">
          <div className="bg-black-100 p-8 rounded-2xl mt-5 max-w-md">
            <div className="flex items-start">
              <img
                src={session?.user.image}
                className="w-32 h-32 rounded-full"
                alt="Avatar"
              />
            </div>
            <div className="flex flex-col mt-7 items-center lg:items-start">
              <div className="mb-4 w-full">
                <span className="font-satoshi font-semibold text-base text-gray-700 block text-left">
                  Name
                </span>
                <input
                  type="text"
                  value={namer}
                  required
                  disabled
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 focus:ring-opacity-50 mt-2"
                />
              </div>

              <div className="mb-4 w-full">
                <span className="font-satoshi font-semibold text-base text-gray-700 block text-left">
                  Email ID
                </span>
                <input
                  type="email"
                  value={emailr}
                  required
                  disabled
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 focus:ring-opacity-50 mt-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ResumeCard Components */}
        <div className="mt-10">
          <div className="prompt_layout">
            {data.map((post) => (
              <ResumeCard
                key={post._id}
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
