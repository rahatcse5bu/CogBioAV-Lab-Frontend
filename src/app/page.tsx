import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Lab Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-600 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Cognitive Audio-Visual Biomedical Research Lab</h1>
              <p className="text-green-600 font-semibold mt-1">Department of CSE, University of Barishal</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4 leading-relaxed">
              The Cognitive Audio-Visual Biomedical Research Laboratory (CogBioAV Lab) conducts collaborative 
              and interdisciplinary research on audio-based, video-based, and integrated audio–video signal 
              analysis for biomedical and healthcare applications. The laboratory employs cognitive signal 
              processing, artificial intelligence, machine learning, and deep learning techniques to interpret 
              signals arising from medical, biological, and human-centered systems where acoustic, visual, or 
              combined audio–visual information is present.
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              Our mission is to develop intelligent, reliable, and clinically relevant technologies through 
              collaboration with academic, clinical, and industry partners. We focus on advancing computational 
              methods for healthcare diagnostics, patient monitoring, assistive technologies, and medical 
              decision support systems using state-of-the-art machine learning and deep neural network 
              architectures.
            </p>
          </div>
        </div>

        {/* Research Areas */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Audio Signal Processing</h3>
            <p className="text-gray-600 text-sm">Analysis of respiratory sounds, heart sounds, speech signals, and acoustic biomarkers for disease detection and diagnosis.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-600 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Video Analysis</h3>
            <p className="text-gray-600 text-sm">Patient monitoring, movement analysis, facial expression recognition, and behavioral pattern detection using computer vision.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-600 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Multimodal Fusion</h3>
            <p className="text-gray-600 text-sm">Integration of audio and visual information for enhanced diagnostic accuracy and comprehensive healthcare solutions.</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-600">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Contact Laboratory</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <div>
                <p className="text-sm font-semibold text-gray-600">Email</p>
                <a href="mailto:mmenoor@bu.ac.bd" className="text-green-600 hover:text-green-700 font-medium">
                  mmenoor@bu.ac.bd
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              <div>
                <p className="text-sm font-semibold text-gray-600">Location</p>
                <p className="text-gray-700">Department of Computer Science & Engineering</p>
                <p className="text-gray-700">University of Barishal</p>
                <p className="text-gray-700">Kornakathi, Barishal, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="font-semibold text-lg">CogBio<span className="text-green-400">AV</span> Lab</p>
              <p className="text-gray-400 text-sm mt-1">University of Barishal</p>
            </div>
            <div className="text-gray-400 text-sm">
              <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
