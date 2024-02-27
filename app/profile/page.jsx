"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import PredictScore from "@components/PredictScore";
import ResumePDF from '@components/ResumePDF';
import InterviewQue from '@components/InterviewQue';



const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
  <section className="w-full max-w-full flex-start flex-col gap-10 mt-5"> 
    <h1 className="head_text text-left">
      <span className="blue_gradient">{session?.user.name}'s Profile</span>
    </h1>
    <div className="desc text-left max-w-md">
      Level up your career, it's not just a game (but it could be).
    </div>
    <div className="flex-end max-w-md">
      <Profile />
    </div>
    <div className="mt-3">
      <PredictScore />
      <InterviewQue />
      <ResumePDF />
    </div>
  </section>
    </>
  );
};

export default MyProfile;
