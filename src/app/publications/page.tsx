import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { connectDB } from '@/lib/mongodb';
import Publication from '@/models/Publication';

export const dynamic = 'force-dynamic';

interface PublicationType {
  _id: string;
  citation: string;
  note?: string;
  doi: string;
  type: 'article' | 'book-chapter';
}

async function getPublications(): Promise<PublicationType[]> {
  try {
    await connectDB();
    const publications = await Publication.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(publications));
  } catch (error) {
    console.error('Error fetching publications:', error);
    return [];
  }
}

export default async function Publications() {
  const allPublications = await getPublications();
  const publications = allPublications.filter((pub) => pub.type === 'article');
  const bookChapters = allPublications.filter((pub) => pub.type === 'book-chapter');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-0 top-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute right-0 bottom-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-10 sm:py-12 md:py-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Publications</h1>
            <p className="text-gray-300 text-xs sm:text-sm">Peer reviewed and preprint research</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-10 md:py-12">
        
        {/* Profile Links */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 text-gray-700 hover:text-green-600 text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm.5 4.5a.5.5 0 11-1 0 .5.5 0 011 0zm2.5 15.5h-6v-1.5h2V11h-2V9.5h3.5v9h2V20z"/>
            </svg>
            ORCiD
          </a>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-blue-600 hover:underline font-medium text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.5 4.5a.5.5 0 11-1 0 .5.5 0 011 0zm2.5 15.5h-6v-1.5h2V11h-2V9.5h3.5v9h2V20z"/>
            </svg>
            Google Scholar
          </a>
        </div>

        {/* Publications List */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6 mb-8 sm:mb-10 md:mb-12">
          {publications.map((pub, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4 sm:p-5 md:p-6 border-l-4 border-green-600">
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto sm:mx-0">
                  <span className="text-green-600 font-bold text-base sm:text-lg">{index + 1}</span>
                </div>
                <div className="flex-1 text-center sm:text-left">
              <p className="text-sm sm:text-base text-gray-700 mb-3 leading-relaxed">
                {pub.citation}
                {pub.note && (
                  <span className="ml-2 inline-block bg-green-50 text-green-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-green-200">{pub.note}</span>
                )}
              </p>
              <a 
                href={pub.doi} 
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 text-xs sm:text-sm font-medium bg-green-50 px-3 py-1 rounded-lg hover:bg-green-100 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                <span>View Publication</span>
              </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Book Chapters */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">Book Chapter</h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-green-600 rounded"></div>
        </div>
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          {bookChapters.map((chapter, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4 sm:p-5 md:p-6 border-l-4 border-orange-500">
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto sm:mx-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <div className="flex-1 text-center sm:text-left">
              <p className="text-sm sm:text-base text-gray-700 mb-3 leading-relaxed">
                {chapter.citation}
              </p>
              <a 
                href={`https://doi.org/${chapter.doi}`} 
                className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 text-xs sm:text-sm font-medium bg-orange-50 px-3 py-1 rounded-lg hover:bg-orange-100 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                <span>View Chapter</span>
              </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 sm:mt-16 md:mt-20">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="mb-3 sm:mb-4 md:mb-0">
              <p className="font-semibold text-base sm:text-lg">CogBio<span className="text-green-400">AV</span> Lab</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">University of Barishal</p>
            </div>
            <div className="text-gray-400 text-xs sm:text-sm">
              <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
