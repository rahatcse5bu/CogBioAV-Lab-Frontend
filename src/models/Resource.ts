import mongoose from 'mongoose';

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Resource || mongoose.model('Resource', ResourceSchema);
