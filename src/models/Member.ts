import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  degree: { type: String, required: true },
  award: { type: String, default: '' },
  description: { type: String, required: true },
  type: { type: String, enum: ['pi', 'member', 'alumni', 'collaborator'], default: 'member' },
  email: { type: String, default: '' },
  title: { type: String, default: '' },
  department: { type: String, default: '' },
  institution: { type: String, default: '' },
  photo: { type: String, default: '' },
  // Extended Profile Fields
  phone: { type: String, default: '' },
  website: { type: String, default: '' },
  googleScholar: { type: String, default: '' },
  researchGate: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  github: { type: String, default: '' },
  orcid: { type: String, default: '' },
  // Biography
  biography: { type: String, default: '' },
  // Research
  researchInterests: [{ type: String }],
  // Education
  education: [{
    degree: String,
    field: String,
    institution: String,
    year: String,
    thesis: String
  }],
  // Experience
  experience: [{
    position: String,
    organization: String,
    startYear: String,
    endYear: String,
    description: String
  }],
  // Publications (linked or manual)
  selectedPublications: [{ type: String }],
  // Awards & Honors
  awards: [{
    title: String,
    organization: String,
    year: String,
    description: String
  }],
  // Skills
  skills: [{ type: String }],
  // Courses Taught
  courses: [{
    code: String,
    name: String,
    semester: String
  }],
  // Status
  status: { type: String, enum: ['active', 'inactive', 'graduated'], default: 'active' },
  joinDate: { type: Date },
  graduationDate: { type: Date },
  currentPosition: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, {
  timestamps: true,
});

export default mongoose.models.Member || mongoose.model('Member', MemberSchema);
