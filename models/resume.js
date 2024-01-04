import { Schema, model, models } from "mongoose";

const ResumeSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, 'Name is required.']
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact Number is required.']
  },
  linkedinURL: {
    type: String,
    required: [true, 'LinkedIn URL is required.']
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  education: {
    type: String,
    required: [true, 'Education is required.']
  },
  experience: {
    type: String,
    required: [true, 'Experience is required.']
  },
  projects: {
    type: String,
    required: [true, 'Projects is required.']
  },
  technicalSkills: {
    type: String,
    required: [true, 'Technical Skills is required.']
  },
  extracurricularActivities: {
    type: String,
    required: [true, 'Extracurricular Activities is required.']
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.']
  },
});

const Resume = models.Resume  || model('Resume', ResumeSchema);

export default Resume;
