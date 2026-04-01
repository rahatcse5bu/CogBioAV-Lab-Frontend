import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { connectDB } from '@/lib/mongodb';
import Homepage from '@/models/Homepage';
import { ReactElement } from 'react';

export const dynamic = 'force-dynamic';

interface ResearchArea {
  title: string;
  description: string;
  icon: string;
  color: string;
}

const iconMap: Record<string, ReactElement> = {
  audio: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>,
  video: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
  data: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>,
  brain: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  heart: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
};

const colorMap: Record<string, { border: string; bg: string; text: string; hover: string }> = {
  blue: { border: 'border-blue-600', bg: 'bg-blue-100', text: 'text-blue-600', hover: 'hover:bg-blue-50' },
  purple: { border: 'border-purple-600', bg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:bg-purple-50' },
  orange: { border: 'border-orange-600', bg: 'bg-orange-100', text: 'text-orange-600', hover: 'hover:bg-orange-50' },
  green: { border: 'border-green-600', bg: 'bg-green-100', text: 'text-green-600', hover: 'hover:bg-green-50' },
  red: { border: 'border-red-600', bg: 'bg-red-100', text: 'text-red-600', hover: 'hover:bg-red-50' },
  cyan: { border: 'border-cyan-600', bg: 'bg-cyan-100', text: 'text-cyan-600', hover: 'hover:bg-cyan-50' },
};

async function getHomepageData() {
  try {
    await connectDB();
    let data = await Homepage.findOne().lean();
    if (!data) {
      data = await Homepage.create({});
    }
    return data;
  } catch (error) {
    console.error('Error fetching homepage:', error);
    return null;
  }
}

export default async function Home() {
  const data = await getHomepageData();
  
  // Default values if no data
  const heroTitle = data?.heroTitle || 'Cog-Bio';
  const heroHighlight = data?.heroHighlight || 'AV';
  const heroSubtitle = data?.heroSubtitle || 'Cognitive Audio-Visual Biomedical Research Laboratory';
  const aboutTitle = data?.aboutTitle || 'About the Laboratory';
  const aboutContent = data?.aboutContent || [];
  const researchTitle = data?.researchTitle || 'Research Focus Areas';
  const researchAreas: ResearchArea[] = data?.researchAreas || [];
  const contactTitle = data?.contactTitle || 'Contact Information';
  const contactEmail = data?.contactEmail || 'mmenoor@bu.ac.bd';
  const contactLocation = data?.contactLocation || [];
  const piName = data?.piName || 'Md Mahbub E Noor';
  const piTitle = data?.piTitle || 'Assistant Professor';
  const department = data?.department || 'Computer Science & Engineering';
  const footerText = data?.footerText || 'University of Barishal';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Banner - Similar to Bio-ASP */}
      <div className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-black overflow-hidden">
        {/* Wave Pattern Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-0 top-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute right-0 bottom-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
              {heroTitle}<span className="text-blue-400">{heroHighlight}</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 font-light tracking-wide px-4">
              {heroSubtitle}
            </p>
          </div>
        </div>

        {/* Decorative Wave Lines - Hidden on mobile */}
        <svg className="absolute right-0 top-0 h-full w-1/2 opacity-20 hidden sm:block" viewBox="0 0 400 400" fill="none">
          <path d="M0,100 Q100,50 200,100 T400,100" stroke="url(#gradient)" strokeWidth="2"/>
          <path d="M0,150 Q100,100 200,150 T400,150" stroke="url(#gradient)" strokeWidth="2"/>
          <path d="M0,200 Q100,150 200,200 T400,200" stroke="url(#gradient)" strokeWidth="2"/>
          <path d="M0,250 Q100,200 200,250 T400,250" stroke="url(#gradient)" strokeWidth="2"/>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-10 md:py-12">
        {/* Lab Introduction */}
        <div className="bg-white rounded-lg shadow-md p-5 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 border-b-2 border-blue-500 pb-2">
            {aboutTitle}
          </h2>

          <div className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
            {aboutContent.map((paragraph: string, index: number) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>
        </div>

        {/* Research Areas */}
        <div className="bg-white rounded-lg shadow-md p-5 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 border-b-2 border-blue-500 pb-2">
            {researchTitle}
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {researchAreas.map((area: ResearchArea, index: number) => {
              const colors = colorMap[area.color] || colorMap.blue;
              return (
                <div key={index} className={`border-l-4 ${colors.border} pl-3 sm:pl-4 ${colors.hover} p-3 sm:p-4 rounded transition-colors`}>
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0 ${colors.text}`}>
                      {iconMap[area.icon] || iconMap.audio}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-800">{area.title}</h3>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {area.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-5 sm:p-6 md:p-8" id="contact">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 border-b-2 border-blue-500 pb-2">
            {contactTitle}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1">Email</p>
                  <a href={`mailto:${contactEmail}`} className="text-blue-600 hover:text-blue-700 hover:underline text-sm sm:text-base break-all">
                    {contactEmail}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1">Location</p>
                  {contactLocation.map((line: string, index: number) => (
                    <p key={index} className="text-gray-700 text-sm sm:text-base">{line}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1">Principal Investigator</p>
                  <p className="text-gray-800 font-medium text-sm sm:text-base">{piName}</p>
                  <p className="text-gray-700 text-xs sm:text-sm">{piTitle}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Department</p>
                  <p className="text-gray-700">{department}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="font-bold text-xl">{heroTitle}<span className="text-blue-400">{heroHighlight}</span> Lab</p>
              <p className="text-gray-300 text-sm mt-1">{footerText}</p>
            </div>
            <div className="text-gray-300 text-sm text-center md:text-right">
              <p>&copy; {new Date().getFullYear()} CogBioAV Laboratory. All rights reserved.</p>
              <p className="text-xs mt-1">{department}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
