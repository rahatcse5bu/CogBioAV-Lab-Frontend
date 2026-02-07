import mongoose from 'mongoose';

const PublicationSchema = new mongoose.Schema({
  citation: { type: String, required: true },
  note: { type: String, default: '' },
  doi: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['article', 'book', 'book_chapter', 'conference', 'monograph', 'workshop'], 
    default: 'article' 
  },
}, {
  timestamps: true,
});

export default mongoose.models.Publication || mongoose.model('Publication', PublicationSchema);
