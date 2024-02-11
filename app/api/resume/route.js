import { connnectToDB } from "@utils/database";
import Prompt from "@models/resume";

export const GET = async( request) => {
    try {
        await connnectToDB();

        const newResume = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(newResume), {
            status: 200
        })

    } catch(error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}