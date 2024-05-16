"use client"
import {FormEvent, useState} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter} from 'next/navigation';

import FormComponent from '@components/Form.component';

import { type PromptType } from '@types';

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [post, setPost] = useState<PromptType>({
        prompt: "",
        tag: ""
    });

    const createPrompt = async(e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/prompt/new', {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                    userId: session?.user?.id
                })
            });

            if(response.ok){
                router.push("/")
            }
        } catch (error: any) {
            console.log(error);
        } finally{
            setSubmitting(false);
        }
    }

    return (
        <FormComponent
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt;