import mongoose, { Schema, Document } from 'mongoose';

export interface IResearchArea {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface IHomepage extends Document {
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutContent: string[];
  researchTitle: string;
  researchAreas: IResearchArea[];
  contactTitle: string;
  contactEmail: string;
  contactLocation: string[];
  piName: string;
  piTitle: string;
  department: string;
  footerText: string;
}

const HomepageSchema = new Schema<IHomepage>({
  heroTitle: { type: String, default: 'Cog-Bio' },
  heroHighlight: { type: String, default: 'AV' },
  heroSubtitle: { type: String, default: 'Cognitive Audio-Visual Biomedical Research Laboratory' },
  aboutTitle: { type: String, default: 'About the Laboratory' },
  aboutContent: { type: [String], default: [
    'The <strong>Cognitive Audio-Visual Biomedical Research Laboratory (CogBioAV Lab)</strong> conducts collaborative and interdisciplinary research on audio-based, video-based, and integrated audio–video signal analysis for biomedical and healthcare applications. The laboratory employs cognitive signal processing, artificial intelligence, machine learning, and deep learning techniques to interpret signals arising from medical, biological, and human-centered systems where acoustic, visual, or combined audio–visual information is present.',
    'Our mission is to develop intelligent, reliable, and clinically relevant technologies through collaboration with academic, clinical, and industry partners. We focus on advancing computational methods for healthcare diagnostics, patient monitoring, assistive technologies, and medical decision support systems using state-of-the-art machine learning and deep neural network architectures.'
  ]},
  researchTitle: { type: String, default: 'Research Focus Areas' },
  researchAreas: { type: [{
    title: String,
    description: String,
    icon: String,
    color: String
  }], default: [
    {
      title: 'Audio Signal Processing',
      description: 'Analysis of respiratory sounds, heart sounds, speech signals, and acoustic biomarkers for disease detection and diagnosis.',
      icon: 'audio',
      color: 'blue'
    },
    {
      title: 'Video Analysis',
      description: 'Patient monitoring, movement analysis, facial expression recognition, and behavioral pattern detection using computer vision.',
      icon: 'video',
      color: 'purple'
    },
    {
      title: 'Multimodal Fusion',
      description: 'Integration of audio and visual information for enhanced diagnostic accuracy and comprehensive healthcare solutions.',
      icon: 'data',
      color: 'orange'
    }
  ]},
  contactTitle: { type: String, default: 'Contact Information' },
  contactEmail: { type: String, default: 'mmenoor@bu.ac.bd' },
  contactLocation: { type: [String], default: [
    'Department of Computer Science & Engineering',
    'University of Barishal',
    'Kornakathi, Barishal, Bangladesh'
  ]},
  piName: { type: String, default: 'Md Mahbub E Noor' },
  piTitle: { type: String, default: 'Assistant Professor' },
  department: { type: String, default: 'Computer Science & Engineering' },
  footerText: { type: String, default: 'University of Barishal' }
}, { timestamps: true });

export default mongoose.models.Homepage || mongoose.model<IHomepage>('Homepage', HomepageSchema);
