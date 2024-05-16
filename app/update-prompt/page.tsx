"use client"

import { FormEvent, useEffect, useState} from 'react';
import { useRouter, useSearchParams} from 'next/navigation';

import FormComponent from '@components/Form.component';

import { type PromptType } from '@types';

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [post, setPost] = useState<PromptType>({
        prompt: "",
        tag: ""
    });


    useEffect(()=>{
        const getPromptDetail = async() => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                prompt: data.prompt, 
                tag: data.tag
            });
        } 

        if(promptId) getPromptDetail();
    }, [promptId]);

    const updatePrompt = async(e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) return alert("Prompt ID not found");

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            });

            if(response.ok){
                router.push("/profile");
            }
        } catch (error: any) {
            console.log(error);
        } finally{
            setSubmitting(false);
        }
    }

    return (
        <FormComponent
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt;