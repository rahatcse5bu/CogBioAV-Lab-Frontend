import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  degree: { type: String, required: true },
  award: { type: String, default: '' },
  description: { type: String, required: true },
  type: { type: String, enum: ['pi', 'member'], default: 'member' },
  email: { type: String, default: '' },
  title: { type: String, default: '' },
  department: { type: String, default: '' },
  institution: { type: String, default: '' },
}, {
  timestamps: true,
});

export default mongoose.models.Member || mongoose.model('Member', MemberSchema);
