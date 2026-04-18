import Link from 'next/link';
import Navigation from '@/components/Navigation';
import PageHero from '@/components/PageHero';
import BrandName from '@/components/BrandName';
import { connectDB } from '@/lib/mongodb';
import Resource from '@/models/Resource';

export const dynamic = 'force-dynamic';

interface ResourceType {
  _id: string;
  title: string;
  description: string;
  link: string;
}

async function getResources(): Promise<ResourceType[]> {
  try {
    await connectDB();
    const resources = await Resource.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(resources));
  } catch (error) {
    console.error('Error fetching resources:', error);
    return [];
  }
}

export default async function Resources() {
  const resources = await getResources();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <PageHero
        eyebrow="Tools & Datasets"
        title="Research Resources"
        description="Essential tools for audio-visual biomedical research"
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {resources.map((resource, index) => (
            <div key={index} className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-3 sm:p-4 border-l-4 border-blue-600">
              <h2 className="text-sm sm:text-base font-bold text-gray-800 mb-2">
                {resource.title}
              </h2>
              <p className="text-gray-600 mb-3 text-xs leading-relaxed">
                {resource.description}
              </p>
              {resource.link !== '#' && (
                <a
                  href={resource.link}
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-xs hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Visit</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white mt-12 sm:mt-14 md:mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="mb-3 sm:mb-4 md:mb-0">
              <p className="font-bold text-lg sm:text-xl"><BrandName /></p>
              <p className="text-gray-300 text-xs sm:text-sm mt-1">University of Barishal</p>
            </div>
            <div className="text-gray-300 text-xs sm:text-sm">
              <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
