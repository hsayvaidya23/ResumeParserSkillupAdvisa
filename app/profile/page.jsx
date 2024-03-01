"use client";
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import PredictScore from "@components/PredictScore";
import ResumePDF from '@components/ResumePDF';
import InterviewQue from '@components/InterviewQue';
import Loading from '@components/Loading';



const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (!session?.user) {
      setIsLoading(true);
      router.push('/');
    }
    else {
      setIsLoading(false);
    }
  }, [session, router]);

 

  useEffect(() => {
    const fetchPosts = async() => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();

        setPosts(data);
    }

    if(session?.user.id) fetchPosts();
},[]);

 if (isLoading) {
    return <div> <Loading /></div>;
  }

  const handleEdit = (post) => {
    router.push(`/update-resume?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = window.confirm("Are you sure you want to delete this Resume?");
  
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/resume/${post._id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          // Remove the deleted post from the local state
          const updatedPosts = posts.filter(p => p._id !== post._id);
          setPosts(updatedPosts);
          alert('Resume deleted successfully.');
        } else {
          const errorMessage = await response.text();
          throw new Error(errorMessage || 'Failed to delete the resume.');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while trying to delete the resume.');
      }
    }
  };
  
  
  

  return (
    <>
  <section className="w-full max-w-full flex-start flex-col gap-10 mt-5"> 
    <div className="">
    <Profile 
    name='My'
    desc = "Level up your career, it's not just a game but it could be."
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
  />
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
