"use client";
import React from "react";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import "@styles/globals.css";
import { useRouter } from "next/navigation";

const Feed = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const router = useRouter();

  const redirectToBuildResume = () => {
    router.push("/build-resume");
  };

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <div className="min-h-screen w-full mt-10">
      <section className="py-16 text-center relative h-full">
        <div className="absolute inset-0 h-full">
          <img
            src="/assets/images/banner.jpg"
            alt="Banner Image"
            className="object-cover"
            layout="fill"
          />
        </div>
        {/* Content */}
        <div className="text-white relative  flex flex-col items-center justify-center md:pt-28 ">
          {session?.user ? (
            <button
                type="button"
                onClick={redirectToBuildResume}
                className="bg-blue-500 hover:bg-blue-700 text-white md:font-bold md:text-[18px] text-[10px] md:py-2 py-1 px-4 rounded "
              >
                Build Resume
              </button>
          ): (
            <>
            {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white md:font-bold md:text-[18px] text-[10px] md:py-2 py-1 px-4 rounded "
              >
                Start Building
              </button>
            ))}
            </>
          )}
        </div>
      </section>

      <section className="bg-gray-100 py-16 text-center mt-4 md:mt-44">
        <h2 className="text-3xl font-bold mb-4">What Users Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded shadow-md mx-auto max-w-2xl">
          <div className="mb-4 md:mb-0 p-8">
            <p className="text-gray-700">
              "Using Skillup Advisa i was able to learn new tech stack!"
            </p>
            <p className="text-gray-600 mt-4">- Tejas Masane</p>
          </div>
          <div className="mb-4 md:mb-0 p-8">
            <p className="text-gray-700">
              "I got hired within a week of using the Skillup Advisa. Highly
              recommended!"
            </p>
            <p className="text-gray-600 mt-4">- Yash Sardare</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <h1 className="head_text orange_gradient text-center">Features</h1>
        <div className="h-screen ">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-10 pt-28 ">
            <div className="block rounded-xl border border-gray-800 p-4 bg_orange_gradient .bg_orange_gradient:hover">
              <span className="inline-block rounded-lg p-3">
                <div className="inline-flex align-middle justify-center items-center select-none text-black">
                  <svg
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    height="32"
                    width="32"
                  >
                    <path
                      d="M8.50141 14.75C8.3114 14.75 8.12141 14.68 7.97141 14.53L5.97141 12.53C5.68141 12.24 5.68141 11.7599 5.97141 11.4699L7.97141 9.46994C8.26141 9.17994 8.7414 9.17994 9.0314 9.46994C9.3214 9.75994 9.3214 10.24 9.0314 10.53L7.5614 12L9.0314 13.4699C9.3214 13.7599 9.3214 14.24 9.0314 14.53C8.8814 14.68 8.69141 14.75 8.50141 14.75Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M16.5014 14.75C16.3114 14.75 16.1214 14.68 15.9714 14.53C15.6814 14.24 15.6814 13.7599 15.9714 13.4699L17.4414 12L15.9714 10.53C15.6814 10.24 15.6814 9.75994 15.9714 9.46994C16.2614 9.17994 16.7414 9.17994 17.0314 9.46994L19.0314 11.4699C19.3214 11.7599 19.3214 12.24 19.0314 12.53L17.0314 14.53C16.8814 14.68 16.6914 14.75 16.5014 14.75Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M12.5 22.75C6.57 22.75 1.75 17.93 1.75 12C1.75 6.07 6.57 1.25 12.5 1.25C18.43 1.25 23.25 6.07 23.25 12C23.25 17.93 18.43 22.75 12.5 22.75ZM12.5 2.75C7.4 2.75 3.25 6.9 3.25 12C3.25 17.1 7.4 21.25 12.5 21.25C17.6 21.25 21.75 17.1 21.75 12C21.75 6.9 17.6 2.75 12.5 2.75Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M11.5021 15.0801C11.4021 15.0801 11.3021 15.0601 11.2121 15.0201C10.8321 14.8601 10.6521 14.4201 10.8221 14.0301L12.8221 9.36004C12.9821 8.98004 13.4221 8.80002 13.8021 8.97002C14.1821 9.13002 14.3621 9.57008 14.1921 9.96008L12.1921 14.6301C12.0721 14.9101 11.7921 15.0801 11.5021 15.0801Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </span>

              <h2 className="mt-2 font-semibold text-base sm:text-lg text-black">
                Easy-to-use Interface
              </h2>
              <p className="sm:mt-1 block text-sm sm:text-base text-gray-900">
                {" "}
                Our Resume Builder features a user-friendly interface that makes
                creating a professional resume a breeze.
              </p>
            </div>

            <div className="block rounded-xl border border-gray-800 p-4 bg_green_gradient .bg_green_gradient:hover">
              <span className="inline-block rounded-lg p-3">
                <div className="inline-flex align-middle justify-center items-center select-none  text-black">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    height="32"
                    width="32"
                  >
                    <path
                      d="M7.55556 4.22222C7.55556 2.99492 8.55048 2 9.77778 2C11.0051 2 12 2.99492 12 4.22222V5.44444C12 5.99673 12.4477 6.44444 13 6.44444H16.5556C17.1078 6.44444 17.5556 6.89216 17.5556 7.44444V11C17.5556 11.5523 18.0033 12 18.5556 12H19.7778C21.0051 12 22 12.9949 22 14.2222C22 15.4496 21.0051 16.4444 19.7778 16.4444H18.5556C18.0033 16.4444 17.5556 16.8922 17.5556 17.4444V21C17.5556 21.5523 17.1078 22 16.5556 22H13C12.4477 22 12 21.5523 12 21V19.7778C12 18.5504 11.0051 17.5556 9.77778 17.5556C8.55048 17.5556 7.55556 18.5504 7.55556 19.7778V21C7.55556 21.5523 7.10784 22 6.55556 22H3C2.44772 22 2 21.5523 2 21V17.4444C2 16.8922 2.44772 16.4444 3 16.4444H4.22222C5.44952 16.4444 6.44444 15.4496 6.44444 14.2222C6.44444 12.9949 5.44952 12 4.22222 12H3C2.44772 12 2 11.5523 2 11V7.44444C2 6.89216 2.44772 6.44444 3 6.44444H6.55556C7.10784 6.44444 7.55556 5.99673 7.55556 5.44444V4.22222Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    ></path>
                  </svg>
                </div>
              </span>
              <h2 className="mt-2 font-semibold text-base sm:text-lg  text-black">
                Customizable Templates
              </h2>
              <p className="sm:mt-1 block text-sm sm:text-base text-gray-900">
                {" "}
                Choose from a variety of templates tailored to different
                industries and customize them to fit your preferences.
              </p>
            </div>

            <div className="block rounded-xl border border-gray-800 p-4 bg_green_gradient .bg_green_gradient:hover">
              <span className="inline-block rounded-lg p-3">
                <div className="inline-flex align-middle justify-center items-center select-none text-black">
                  <svg
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    height="32"
                    width="32"
                  >
                    <path
                      d="M12.6586 11.62C12.6286 11.62 12.6086 11.62 12.5786 11.62C12.5286 11.61 12.4586 11.61 12.3986 11.62C9.49859 11.53 7.30859 9.25 7.30859 6.44C7.30859 3.58 9.63859 1.25 12.4986 1.25C15.3586 1.25 17.6886 3.58 17.6886 6.44C17.6786 9.25 15.4786 11.53 12.6886 11.62C12.6786 11.62 12.6686 11.62 12.6586 11.62ZM12.4986 2.75C10.4686 2.75 8.80859 4.41 8.80859 6.44C8.80859 8.44 10.3686 10.05 12.3586 10.12C12.4086 10.11 12.5486 10.11 12.6786 10.12C14.6386 10.03 16.1786 8.42 16.1886 6.44C16.1886 4.41 14.5286 2.75 12.4986 2.75Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M12.6716 22.55C10.7116 22.55 8.74156 22.05 7.25156 21.05C5.86156 20.13 5.10156 18.87 5.10156 17.5C5.10156 16.13 5.86156 14.86 7.25156 13.93C10.2516 11.94 15.1116 11.94 18.0916 13.93C19.4716 14.85 20.2416 16.11 20.2416 17.48C20.2416 18.85 19.4816 20.12 18.0916 21.05C16.5916 22.05 14.6316 22.55 12.6716 22.55ZM8.08156 15.19C7.12156 15.83 6.60156 16.65 6.60156 17.51C6.60156 18.36 7.13156 19.18 8.08156 19.81C10.5716 21.48 14.7716 21.48 17.2616 19.81C18.2216 19.17 18.7416 18.35 18.7416 17.49C18.7416 16.64 18.2116 15.82 17.2616 15.19C14.7716 13.53 10.5716 13.53 8.08156 15.19Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </span>

              <h2 className="mt-2 font-semibold text-base sm:text-lg  text-black">
                Instant Download{" "}
              </h2>
              <p className="sm:mt-1 block text-sm sm:text-base text-gray-900">
                {" "}
                Download your resume instantly in various formats, including PDF
                and Word, for easy sharing with potential employers.
              </p>
            </div>

            <div className="block rounded-xl border border-gray-800 p-4 bg_orange_gradient .bg_orange_gradient:hover">
              <span className="inline-block rounded-lg p-3">
                <div className="inline-flex align-middle justify-center items-center select-none text-black">
                  <svg
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    height="32"
                    width="32"
                  >
                    <path
                      d="M15.2013 6.29998C15.0181 6.48691 14.9155 6.73823 14.9155 6.99998C14.9155 7.26173 15.0181 7.51305 15.2013 7.69998L16.8013 9.29998C16.9882 9.48321 17.2396 9.58584 17.5013 9.58584C17.7631 9.58584 18.0144 9.48321 18.2013 9.29998L21.4602 6.04107C21.7073 5.79397 22.1242 5.87146 22.229 6.20485C22.52 7.13078 22.583 8.11721 22.4078 9.07913C22.1892 10.279 21.61 11.3838 20.7476 12.2463C19.8852 13.1087 18.7804 13.6878 17.5805 13.9064C16.4942 14.1044 15.3767 13.9983 14.3504 13.6034C14.1561 13.5287 13.9339 13.5674 13.7867 13.7146L7.12132 20.38C6.7235 20.7778 6.18393 21.0013 5.62132 21.0013C5.05871 21.0013 4.51914 20.7778 4.12132 20.38C3.7235 19.9822 3.5 19.4426 3.5 18.88C3.5 18.3174 3.7235 17.7778 4.12132 17.38L10.7867 10.7146C10.9339 10.5674 10.9726 10.3452 10.8979 10.1509C10.503 9.12458 10.3969 8.00708 10.5949 6.92083C10.8135 5.72092 11.3926 4.61614 12.255 3.7537C13.1175 2.89127 14.2223 2.31215 15.4222 2.09352C16.3841 1.91826 17.3705 1.98134 18.2965 2.27232C18.6298 2.37708 18.7073 2.79397 18.4602 3.04107L15.2113 6.28998L15.2013 6.29998Z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
              </span>
              <h2 className="mt-2 font-semibold text-base sm:text-lg text-black">
                Industry-Specific Guidance{" "}
              </h2>
              <p className="sm:mt-1 block text-sm sm:text-base text-gray-900">
                Receive guidance and tips based on your industry to ensure your
                resume stands out among the competition.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-blue_gradient text-center py-4 mt-52 md:mt-0">
        <p>&copy; 2024 SkillUp Advisa </p>
      </footer>
    </div>
  );
};

export default Feed;
