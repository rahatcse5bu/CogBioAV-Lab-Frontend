import Link from 'next/link';
import Navigation from '@/components/Navigation';

interface Publication {
  _id: string;
  citation: string;
  note?: string;
  doi: string;
  type: 'article' | 'book-chapter';
}

async function getPublications(): Promise<Publication[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3001'}/api/publications`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return data.success ? data.data : [];
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
          <div className="absolute left-0 top-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Publications</h1>
            <p className="text-gray-300 text-sm">Peer reviewed and preprint research</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Profile Links */}
        <div className="flex gap-4 mb-8">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 text-gray-700 hover:text-green-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm.5 4.5a.5.5 0 11-1 0 .5.5 0 011 0zm2.5 15.5h-6v-1.5h2V11h-2V9.5h3.5v9h2V20z"/>
            </svg>
            ORCiD
          </a>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-blue-600 hover:underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.5 4.5a.5.5 0 11-1 0 .5.5 0 011 0zm2.5 15.5h-6v-1.5h2V11h-2V9.5h3.5v9h2V20z"/>
            </svg>
            Google Scholar
          </a>
        </div>

        {/* Publications List */}
        <div className="space-y-6 mb-12">
          {publications.map((pub, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border-l-4 border-green-600">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold text-lg">{index + 1}</span>
                </div>
                <div className="flex-1">
              <p className="text-gray-700 mb-3 leading-relaxed">
                {pub.citation}
                {pub.note && (
                  <span className="ml-2 inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200">{pub.note}</span>
                )}
              </p>
              <a 
                href={pub.doi} 
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium bg-green-50 px-3 py-1 rounded-lg hover:bg-green-100 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                <span>View Publication</span>
              </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Book Chapters */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Book Chapter</h2>
          <div className="w-24 h-1 bg-green-600 rounded"></div>
        </div>
        <div className="space-y-6">
          {bookChapters.map((chapter, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border-l-4 border-orange-500">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <div className="flex-1">
              <p className="text-gray-700 mb-3 leading-relaxed">
                {chapter.citation}
              </p>
              <a 
                href={`https://doi.org/${chapter.doi}`} 
                className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm font-medium bg-orange-50 px-3 py-1 rounded-lg hover:bg-orange-100 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                <span>View Chapter</span>
              </a>
                </div>
              </div>
            </div>
          ))}
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
