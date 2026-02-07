'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface PublicationType {
  _id: string;
  citation: string;
  note?: string;
  doi: string;
  type: string;
}

const publicationTypeLabels: Record<string, { label: string; color: string; icon: string }> = {
  article: { label: 'Articles', color: 'green', icon: '📄' },
  book: { label: 'Books', color: 'blue', icon: '📚' },
  book_chapter: { label: 'Book Chapters', color: 'orange', icon: '📖' },
  conference: { label: 'Conferences', color: 'purple', icon: '🎤' },
  monograph: { label: 'Monographs', color: 'red', icon: '📋' },
  workshop: { label: 'Workshops', color: 'yellow', icon: '🔧' },
};

function PublicationsContent() {
  const [publications, setPublications] = useState<PublicationType[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const typeFilter = searchParams.get('type');

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const res = await fetch('/api/publications');
      const data = await res.json();
      if (data.success) {
        setPublications(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch publications:', error);
    }
    setLoading(false);
  };

  // Filter publications based on type parameter
  const filteredPublications = typeFilter 
    ? publications.filter(pub => pub.type === typeFilter)
    : publications;

  // Group publications by type
  const groupedPublications = filteredPublications.reduce((acc, pub) => {
    if (!acc[pub.type]) {
      acc[pub.type] = [];
    }
    acc[pub.type].push(pub);
    return acc;
  }, {} as Record<string, PublicationType[]>);

  const getTypeConfig = (type: string) => {
    return publicationTypeLabels[type] || { label: type, color: 'gray', icon: '📄' };
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { border: string; bg: string; text: string; bgHover: string }> = {
      green: { border: 'border-green-500', bg: 'bg-green-100', text: 'text-green-600', bgHover: 'hover:bg-green-100' },
      blue: { border: 'border-blue-500', bg: 'bg-blue-100', text: 'text-blue-600', bgHover: 'hover:bg-blue-100' },
      orange: { border: 'border-orange-500', bg: 'bg-orange-100', text: 'text-orange-600', bgHover: 'hover:bg-orange-100' },
      purple: { border: 'border-purple-500', bg: 'bg-purple-100', text: 'text-purple-600', bgHover: 'hover:bg-purple-100' },
      red: { border: 'border-red-500', bg: 'bg-red-100', text: 'text-red-600', bgHover: 'hover:bg-red-100' },
      yellow: { border: 'border-yellow-500', bg: 'bg-yellow-100', text: 'text-yellow-600', bgHover: 'hover:bg-yellow-100' },
      gray: { border: 'border-gray-500', bg: 'bg-gray-100', text: 'text-gray-600', bgHover: 'hover:bg-gray-100' },
    };
    return colorMap[color] || colorMap.gray;
  };

  const currentTypeLabel = typeFilter ? getTypeConfig(typeFilter).label : 'All Publications';

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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">{currentTypeLabel}</h1>
            <p className="text-gray-300 text-xs sm:text-sm">Peer reviewed and preprint research</p>
            {typeFilter && (
              <Link href="/publications" className="inline-block mt-4 text-blue-300 hover:text-white transition-colors">
                ← View All Publications
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-10 md:py-12">
        
        {/* Filter Tabs */}
        {!typeFilter && (
          <div className="flex flex-wrap gap-2 mb-8">
            <Link 
              href="/publications"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium"
            >
              All ({publications.length})
            </Link>
            {Object.entries(publicationTypeLabels).map(([type, config]) => {
              const count = publications.filter(pub => pub.type === type).length;
              if (count === 0) return null;
              const colors = getColorClasses(config.color);
              return (
                <Link 
                  key={type}
                  href={`/publications?type=${type}`}
                  className={`px-4 py-2 rounded-lg ${colors.bg} ${colors.text} text-sm font-medium ${colors.bgHover} transition-colors`}
                >
                  {config.icon} {config.label} ({count})
                </Link>
              );
            })}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          </div>
        ) : filteredPublications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No publications found.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedPublications).map(([type, pubs]) => {
              const typeConfig = getTypeConfig(type);
              const colors = getColorClasses(typeConfig.color);
              
              return (
                <div key={type}>
                  {!typeFilter && (
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <span className="text-2xl">{typeConfig.icon}</span>
                        {typeConfig.label}
                        <span className="text-lg text-gray-500">({pubs.length})</span>
                      </h2>
                      <div className={`w-24 h-1 ${colors.bg} rounded`}></div>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    {pubs.map((pub, index) => (
                      <div key={pub._id} className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4 sm:p-5 md:p-6 border-l-4 ${colors.border}`}>
                        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                          <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 ${colors.bg} rounded-lg flex items-center justify-center mx-auto sm:mx-0`}>
                            <span className={`${colors.text} font-bold text-base sm:text-lg`}>{index + 1}</span>
                          </div>
                          <div className="flex-1 text-center sm:text-left">
                            <p className="text-sm sm:text-base text-gray-700 mb-3 leading-relaxed">
                              {pub.citation}
                              {pub.note && (
                                <span className={`ml-2 inline-block ${colors.bg} ${colors.text} px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${colors.border.replace('border-', 'border-')}`}>
                                  {pub.note}
                                </span>
                              )}
                            </p>
                            <a 
                              href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`}
                              className={`inline-flex items-center gap-2 ${colors.text} ${colors.bgHover} text-xs sm:text-sm font-medium ${colors.bg} px-3 py-1 rounded-lg transition-colors`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              <span>View Publication</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
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

export default function Publications() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PublicationsContent />
    </Suspense>
  );
}
