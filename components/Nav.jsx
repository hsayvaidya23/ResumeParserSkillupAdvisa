"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

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
        <p className="logo_text">SkillupAdvisa</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user  ? (
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

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
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
        {session?.user  ? (
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
        ): (
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