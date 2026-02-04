import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  category: { type: String, required: true },
  date: { type: String, required: true },
  title: { type: String, required: true },
  icon: { type: String, default: '📄' },
}, {
  timestamps: true,
});

export default mongoose.models.News || mongoose.model('News', NewsSchema);
