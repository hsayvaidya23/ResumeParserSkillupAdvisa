import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const name = session?.user.name || ''; 
  const email = session?.user.email || ''; 
  
  return (
    <>
 

    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex  overflow-hidden">
    <div className="flex-[0.75] bg-black-100 p-8 rounded-2xl mt-5 max-w-md mx-auto">
      <div className="flex items-center ">
        <img
          src={session?.user.image}
          className="w-32 h-32 rounded-full"
          alt="Avatar"
        />
      </div>
      <div className="flex flex-col mt-7">
        <label className="mb-4">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Name
          </span>
          <input
            type="text"
            value={name}
            required
            disabled
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>

        <label className="mb-4">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Email ID
          </span>
          <input
            type="email"
            value={email}
            required
            disabled
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 focus:ring-opacity-50 "
          />
        </label>
      </div>
    </div>
  </div>
  <div className="mt-5"></div>
  </>
  );
};

export default Profile;
