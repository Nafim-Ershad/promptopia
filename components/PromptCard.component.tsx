"use client"

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";


function PromptCardComponent({post, handleEdit, handleDelete, handleTagClick}: any): React.ReactNode {

  const pathName = usePathname();
  const router = useRouter();
  const {data: session} = useSession();

  const [copied, setCopied] = useState<string>("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    setTimeout(()=> setCopied(""), 3000);
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex flex-1 justify-start items-center gap-3 cursor-pointer">
          <Image
          width={40}
          height={40}
          src={post.creator.image}
          alt="sser"
          className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
          width={12}
          height={12}
          src={copied === post.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
          alt="copy"
          />
        </div>
      </div>

      <p className="font-satoshi text-gray-500 my-4 text-sm">{post.prompt}</p>
      <p 
      className="font-inter text-sm blue_gradient cursor-pointer"
      onClick={()=>{handleTagClick && handleTagClick(post.tag)}}
      >
        #{post.tag}
      </p>

      {
        session?.user?.id === post.creator._id && 
        pathName === '/profile' &&
        (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p 
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
            >
              Edit
            </p>
            <p 
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        ) 
      }
    </div>
  )
}

export default PromptCardComponent