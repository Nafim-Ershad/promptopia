"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import ProfileComponent from "@components/Profile.component";
import { PromptType } from "@types";

const Profile = () => {
    const {data: session} = useSession();
    const router = useRouter();

    const [posts, setPosts] = useState<PromptType[]>([]);

    const handleEdit = (post: any) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async(post: any) => {
        const hasConfirmed = confirm("Are you sure you want to delete the Post?");

        if(hasConfirmed){
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE",
                });

                const filteredPosts = posts.filter(p => p._id !== post._id);

                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect((): void => {
        const fetchPosts = async() => { 
            // console.log(session?.user?.id);
            const response = await fetch(`/api/users/${session?.user?.id}/posts`);
    
            const data = await response.json();
    
            setPosts(data);
        }

        if(session?.user?.id) fetchPosts();

      },[session?.user?.id]);

    return (
        <ProfileComponent
        name="My"
        desc="Welcome to your personalized Profile"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        />
    )
}

export default Profile;