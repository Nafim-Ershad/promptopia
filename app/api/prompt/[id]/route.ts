import { connectToDB } from "@utils/databse";
import Prompt from "@models/prompt";

// GET (read)
export const GET = async (request: any, {params}: any) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate("creator");

        if(!prompt) return new Response("Prompt not Found!!", {status: 404});

        return new Response(JSON.stringify(prompt), {status: 200});
        
    } catch (error) {
        return new Response("Failed to fetch all prompts", {status: 500});
    }
}
// PATCH (update)
export const PATCH = async(request: any, {params}: any) => {
    const {prompt, tag} = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response("Prompt not Found!!", {status: 404});

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {status: 200});

    } catch (error) {
        return new Response("Failed to UPDATE prompt", {status: 500});
    }
}

// DELETE (delete)
export const DELETE = async(request: any, {params}: any) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted successfully", {status: 200})

    } catch (error) {
        return new Response("Failed to DELETE prompt", {status: 500});
    }
}