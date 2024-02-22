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
  education: [{
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    year: { type: String, required: true }
  }],
  experience: [{
    role: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String, required: true }
  }],
  projects: [{
    name: { type: String, required: true },
    description: { type: String, required: true }
  }],
  technicalSkills: [{
    type: String,
    required: [true, 'Technical Skills are required.']
  }],
  certificates: [{
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: Date, required: true }
  }],
  tag: {
    type: String,
    required: [true, 'Tag is required.']
  },
});

const Resume = models.Resume || model('Resume', ResumeSchema);

export default Resume;
