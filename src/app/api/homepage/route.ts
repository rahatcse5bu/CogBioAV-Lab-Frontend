import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizePrismaPayload, toClientDoc } from '@/lib/db-mappers';

const HOMEPAGE_DEFAULTS = {
  heroTitle: 'Cog-Bio',
  heroHighlight: 'AV',
  heroSubtitle: 'Cognitive Audio-Visual Biomedical Research Laboratory',
  aboutTitle: 'About the Laboratory',
  aboutContent: [
    'The <strong>Cognitive Audio-Visual Biomedical Research Laboratory (CogBioAV Lab)</strong> conducts collaborative and interdisciplinary research on audio-based, video-based, and integrated audio-visual signal analysis for biomedical and healthcare applications. The laboratory employs cognitive signal processing, artificial intelligence, machine learning, and deep learning techniques to interpret signals arising from medical, biological, and human-centered systems where acoustic, visual, or combined audio-visual information is present.',
    'Our mission is to develop intelligent, reliable, and clinically relevant technologies through collaboration with academic, clinical, and industry partners. We focus on advancing computational methods for healthcare diagnostics, patient monitoring, assistive technologies, and medical decision support systems using state-of-the-art machine learning and deep neural network architectures.',
  ],
  researchTitle: 'Research Focus Areas',
  researchAreas: [
    {
      title: 'Audio Signal Processing',
      description:
        'Analysis of respiratory sounds, heart sounds, speech signals, and acoustic biomarkers for disease detection and diagnosis.',
      icon: 'audio',
      color: 'blue',
    },
    {
      title: 'Video Analysis',
      description:
        'Patient monitoring, movement analysis, facial expression recognition, and behavioral pattern detection using computer vision.',
      icon: 'video',
      color: 'purple',
    },
    {
      title: 'Multimodal Fusion',
      description:
        'Integration of audio and visual information for enhanced diagnostic accuracy and comprehensive healthcare solutions.',
      icon: 'data',
      color: 'orange',
    },
  ],
  contactTitle: 'Contact Information',
  contactEmail: 'mmenoor@bu.ac.bd',
  contactLocation: [
    'Department of Computer Science & Engineering',
    'University of Barishal',
    'Kornakathi, Barishal, Bangladesh',
  ],
  piName: 'Md Mahbub E Noor',
  piTitle: 'Assistant Professor',
  department: 'Computer Science & Engineering',
  footerText: 'University of Barishal',
};

// GET - Fetch homepage content (create default if not exists)
export async function GET() {
  try {
    let homepage = await prisma.homepage.findFirst({
      orderBy: { createdAt: 'asc' },
    });

    if (!homepage) {
      homepage = await prisma.homepage.create({
        data: HOMEPAGE_DEFAULTS as any,
      });
    }

    return NextResponse.json({ success: true, data: toClientDoc(homepage as any) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT - Update homepage content
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = sanitizePrismaPayload(body);

    let homepage = await prisma.homepage.findFirst({
      orderBy: { createdAt: 'asc' },
    });

    if (!homepage) {
      homepage = await prisma.homepage.create({
        data: {
          ...HOMEPAGE_DEFAULTS,
          ...payload,
        } as any,
      });
    } else {
      homepage = await prisma.homepage.update({
        where: { id: homepage.id },
        data: payload,
      });
    }

    return NextResponse.json({ success: true, data: toClientDoc(homepage as any) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
