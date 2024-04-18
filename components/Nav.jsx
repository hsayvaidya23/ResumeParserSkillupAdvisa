"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  const toggleDropdown = () => {
    setToggleDropDown(!toggleDropDown);
  };
  

  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current); 
    setToggleDropDown(true);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current); 
    timeoutRef.current = setTimeout(() => {
      setToggleDropDown(false);
    }, 500); 
  };

  const handleOptionClick = () => {
    clearTimeout(timeoutRef.current); 
    setToggleDropDown(false);
  };

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, [session]);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.png"
          alt="SkillupAdvisa Logo"
          width={45}
          height={45}
          className="object-contain"
        />
        <p className="logo_text text-[18px]">SkillupAdvisa</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/build-resume" className="black_btn">
              Build Resume
            </Link>
            <Link href="/jobs" className="black_btn">
              Jobs
            </Link>
            <Link href="/courses" className="black_btn">
              Courses
            </Link>
            <Link href="/roadmaps" className="black_btn">
              Roadmaps
            </Link>

            <div className="relative">
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className="rounded-full cursor-pointer"
                  alt="profile"
                />
                {toggleDropDown && (
                  <div className="absolute left mt-2 w-40 text-center bg-white border border-gray-200 rounded shadow-md z-8">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-800 font-semibold hover:bg-gray-200"
                      onClick={() => setToggleDropDown(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setToggleDropDown(false);
                        signOut();
                      }}
                      className="block w-full text-center px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-200"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />

            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/build-resume"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Build Resume
                </Link>
                <Link
                  href="/jobs"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Jobs
                </Link>
                <Link
                  href="/courses"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Courses
                </Link>
                <Link
                  href="/roadmaps"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Roadmaps
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
