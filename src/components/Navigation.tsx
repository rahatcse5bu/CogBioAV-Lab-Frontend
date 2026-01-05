'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="bg-green-700 shadow-lg border-b-4 border-green-800">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - University and Lab branding */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-white">
                <div className="text-sm font-semibold leading-tight">University of</div>
                <div className="text-sm font-semibold leading-tight">Barishal</div>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-white text-xs font-bold">UB</span>
              </div>
            </div>
            <div className="border-l border-white/30 pl-4 ml-2">
              <span className="text-white font-bold text-lg tracking-wide">
                CogBio<span className="text-orange-400">AV</span> Lab
              </span>
            </div>
          </div>

          {/* Center - Lab Name */}
          <div className="hidden lg:block">
            <Link href="/" className="text-white text-xl font-semibold hover:text-gray-100 transition-colors">
              Research Laboratory
            </Link>
          </div>

          {/* Right side - Navigation links */}
          <div className="flex items-center gap-1">
            <Link 
              href="/news" 
              className="text-white hover:bg-white/10 px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide"
            >
              News
            </Link>

            {/* Lab Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('lab')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-white hover:bg-white/10 px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide flex items-center gap-1">
                Lab
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'lab' && (
                <div className="absolute top-full left-0 mt-1 bg-white shadow-xl rounded-lg py-2 min-w-[200px] z-50">
                  <Link href="/members" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors">
                    Members
                  </Link>
                  <Link href="/schedule" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors">
                    Schedule
                  </Link>
                </div>
              )}
            </div>

            {/* Publications Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('publications')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-white hover:bg-white/10 px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide flex items-center gap-1">
                Publications
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'publications' && (
                <div className="absolute top-full left-0 mt-1 bg-white shadow-xl rounded-lg py-2 min-w-[200px] z-50">
                  <Link href="/publications" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors">
                    All Publications
                  </Link>
                  <Link href="/publications#journals" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors">
                    Journal Articles
                  </Link>
                  <Link href="/publications#chapters" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors">
                    Book Chapters
                  </Link>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-white hover:bg-white/10 px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide flex items-center gap-1">
                Resources
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'resources' && (
                <div className="absolute top-full left-0 mt-1 bg-white shadow-xl rounded-lg py-2 min-w-[200px] z-50">
                  <Link href="/resources" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors">
                    Tools & Software
                  </Link>
                  <Link href="/teaching" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors">
                    Teaching Materials
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="#" 
              className="text-white hover:bg-white/10 px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide"
            >
              Album
            </Link>

            <Link 
              href="#" 
              className="text-white hover:bg-white/10 px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide"
            >
              Contact
            </Link>

            <button className="text-white hover:bg-white/10 p-2 rounded transition-colors ml-2" aria-label="Search">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
