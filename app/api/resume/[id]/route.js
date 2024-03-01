import { connnectToDB } from "@utils/database";
import Resume from "@models/resume";


// GET (read)
export const GET = async( request, { params }) => {
    try {
        await connnectToDB();

        const resume = await Resume.findById(params.id).populate('creator');

        if(!resume) return new Response("Resume not found", { status: 404 })

        return new Response(JSON.stringify(resume), {
            status: 200
        })

    } catch(error) {
        return new Response("Failed to fetch all resumes", { status: 500 })
    }
}
// PATCH (update)
export const PATCH = async(request, { params }) => {
    const {
        name,
        contactNumber,
        linkedinURL,
        email,
        education,
        experience,
        projects,
        technicalSkills,
        certificates,
        tag,
    } = await request.json();

    try {
        await connnectToDB();

        const existingResume = await Resume.findById(params.id); 

        if (!existingResume) return new Response("Resume not found", { status: 404 });

        existingResume.name = name;
        existingResume.contactNumber = contactNumber;
        existingResume.linkedinURL = linkedinURL;
        existingResume.email = email;
        existingResume.education = education;
        existingResume.experience = experience;
        existingResume.projects = projects;
        existingResume.technicalSkills = technicalSkills;
        existingResume.certificates = certificates;
        existingResume.tag = tag;

        await existingResume.save();

        return new Response(JSON.stringify(existingResume), { status: 200 })
    } catch (error) {
        return new Response("Failed to update resume", { status: 500 })
    }
}

// DELETE (delete)

export const DELETE = async (request, { params }) => {
    try {
        await connnectToDB();
        
        const deletedResume = await Resume.findByIdAndDelete(params.id);

        if (!deletedResume) {
            return new Response("Resume not found", { status: 404 });
        }

        return new Response("Resume deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete resume", { status: 500 });
    }
};

