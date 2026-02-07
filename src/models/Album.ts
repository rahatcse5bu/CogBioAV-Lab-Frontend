import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: { type: String, default: '' },
  order: { type: Number, default: 0 },
});

const AlbumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  photos: [PhotoSchema],
  category: { type: String, default: 'General' },
  date: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, {
  timestamps: true,
});

export default mongoose.models.Album || mongoose.model('Album', AlbumSchema);
