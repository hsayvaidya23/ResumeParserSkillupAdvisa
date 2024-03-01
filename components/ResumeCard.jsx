'use client';
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const ResumeCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  return (
    <div className="prompt_card bg-white/80 backdrop-blur-lg shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-between items-start gap-5 p-4">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
        onClick={handleProfileClick}>
          <Image 
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
      </div>
      <div className="px-4 py-2">
        <p className="text-sm text-gray-400" >
          <span className="text-gray-900 ">Contact Number : </span>  {post.contactNumber} 
        </p>
        <p className="text-sm text-gray-400">
          <span className="text-gray-900 ">Email : </span>  {post.email} 
        </p>
        <p className="text-sm text-gray-400">
          <span className="text-gray-900 ">LinkedIn : </span>  {post.linkedinURL} 
        </p>
      </div>
    
      <p className="px-4 py-2 text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && 
      pathName === '/profile' && (
        <div className="mt-5 flex justify-center gap-4 border-t border-gray-100 pt-3 px-4">
          <p className="text-sm green_btn cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p className="text-sm  red_btn cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default ResumeCard