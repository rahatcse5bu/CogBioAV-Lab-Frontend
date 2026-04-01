import Navigation from '@/components/Navigation';
import { connectDB } from '@/lib/mongodb';
import NewsModel from '@/models/News';

export const dynamic = 'force-dynamic';

interface NewsItem {
  _id: string;
  category: string;
  date: string;
  title: string;
  icon: string;
}

async function getNews(): Promise<NewsItem[]> {
  try {
    await connectDB();
    const news = await NewsModel.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(news));
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export default async function NewsPage() {
  const newsItems = await getNews();

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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">News</h1>
            <p className="text-gray-300 text-xs sm:text-sm">Latest updates and announcements</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-10 md:py-12">
        {newsItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 md:p-12 text-center border-t-4 border-green-600">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">No News Available</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Check back later for lab updates and announcements.
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {newsItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-blue-500">
                <div className="p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row items-start gap-4 sm:gap-5 md:gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center text-2xl sm:text-3xl">
                      {item.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-2">
                      <span className="text-red-600 font-semibold text-xs sm:text-sm uppercase tracking-wide">
                        {item.category}
                      </span>
                      <span className="text-gray-400 hidden sm:inline">•</span>
                      <span className="text-gray-500 text-xs sm:text-sm font-medium">
                        {item.date}
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800 leading-relaxed">
                      {item.title}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
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
