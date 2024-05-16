import { connectToDB } from "@utils/databse";
import Prompt from "@models/prompt";
import { Schema } from "mongoose";

export const POST = async(req: any) => {
    console.log(typeof(req));
    const {userId, prompt, tag} = await req.json();

    try {
        await connectToDB();

        const newPrompt = new Prompt({
            creator: userId, 
            tag,
            prompt
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 201})

    } catch (error) {
        return new Response("Failed to create new Prompt!!!", {status: 500});
    }
}