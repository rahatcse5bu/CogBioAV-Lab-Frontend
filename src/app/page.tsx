import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Banner - Similar to Bio-ASP */}
      <div className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-black overflow-hidden">
        {/* Wave Pattern Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-0 top-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
              Cog-Bio<span className="text-blue-400">AV</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wide">
              Cognitive Audio-Visual Biomedical Research Laboratory
            </p>
          </div>
        </div>

        {/* Decorative Wave Lines */}
        <svg className="absolute right-0 top-0 h-full w-1/2 opacity-20" viewBox="0 0 400 400" fill="none">
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
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Lab Introduction */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
            About the Laboratory
          </h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              The <strong>Cognitive Audio-Visual Biomedical Research Laboratory (CogBioAV Lab)</strong> conducts collaborative 
              and interdisciplinary research on audio-based, video-based, and integrated audio–video signal 
              analysis for biomedical and healthcare applications. The laboratory employs cognitive signal 
              processing, artificial intelligence, machine learning, and deep learning techniques to interpret 
              signals arising from medical, biological, and human-centered systems where acoustic, visual, or 
              combined audio–visual information is present.
            </p>

            <p>
              Our mission is to develop intelligent, reliable, and clinically relevant technologies through 
              collaboration with academic, clinical, and industry partners. We focus on advancing computational 
              methods for healthcare diagnostics, patient monitoring, assistive technologies, and medical 
              decision support systems using state-of-the-art machine learning and deep neural network 
              architectures.
            </p>
          </div>
        </div>

        {/* Research Areas */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
            Research Focus Areas
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-l-4 border-blue-600 pl-4 hover:bg-blue-50 p-4 rounded transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Audio Signal Processing</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Analysis of respiratory sounds, heart sounds, speech signals, and acoustic biomarkers for disease detection and diagnosis.
              </p>
            </div>

            <div className="border-l-4 border-purple-600 pl-4 hover:bg-purple-50 p-4 rounded transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Video Analysis</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Patient monitoring, movement analysis, facial expression recognition, and behavioral pattern detection using computer vision.
              </p>
            </div>

            <div className="border-l-4 border-orange-600 pl-4 hover:bg-orange-50 p-4 rounded transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Multimodal Fusion</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Integration of audio and visual information for enhanced diagnostic accuracy and comprehensive healthcare solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-8" id="contact">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
            Contact Information
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Email</p>
                  <a href="mailto:mmenoor@bu.ac.bd" className="text-blue-600 hover:text-blue-700 hover:underline">
                    mmenoor@bu.ac.bd
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Location</p>
                  <p className="text-gray-700">Department of Computer Science &amp; Engineering</p>
                  <p className="text-gray-700">University of Barishal</p>
                  <p className="text-gray-700">Kornakathi, Barishal, Bangladesh</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Principal Investigator</p>
                  <p className="text-gray-800 font-medium">Md Mahbub E Noor</p>
                  <p className="text-gray-700 text-sm">Assistant Professor</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Department</p>
                  <p className="text-gray-700">Computer Science &amp; Engineering</p>
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
              <p className="font-bold text-xl">Cog-Bio<span className="text-blue-400">AV</span> Lab</p>
              <p className="text-gray-300 text-sm mt-1">University of Barishal</p>
            </div>
            <div className="text-gray-300 text-sm text-center md:text-right">
              <p>&copy; {new Date().getFullYear()} CogBioAV Laboratory. All rights reserved.</p>
              <p className="text-xs mt-1">Department of Computer Science &amp; Engineering</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
