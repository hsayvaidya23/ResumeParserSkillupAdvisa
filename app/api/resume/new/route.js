import { connnectToDB } from "@utils/database";
import Resume from "@models/resume";

export const POST = async (req) => {
  const {
    userId,
    name,
    contactNumber,
    linkedinURL,
    email,
    education,
    experience,
    projects,
    technicalSkills,
    extracurricularActivities,
    tag,
  } = await req.json();

  try {
    await connnectToDB();
    const newResume = new Resume({
      creator: userId,
      name,
      contactNumber,
      linkedinURL,
      email,
      education,
      experience,
      projects,
      technicalSkills,
      extracurricularActivities,
      tag,
    });

    await newResume.save();

    return new Response(JSON.stringify(newResume), {
      status: 201
    });
  } catch (error) {
    return new Response("Failed to create a new resume", { status: 500 })
  }
};
