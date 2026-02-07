'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar - Lab Name and Contact */}
      <div className="bg-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2 sm:py-3 flex items-center justify-between">
          {/* Lab Name */}
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold tracking-wide">
              CogBio<span className="text-orange-400">AV</span> Lab
            </h1>
            <span className="text-xs sm:text-sm text-gray-200 hidden lg:inline">
              | Cognitive Audio-Visual Biomedical Research Laboratory
            </span>
          </div>

          {/* Contact Us */}
          <div className="flex items-center gap-4">
            <Link 
              href="#contact" 
              className="flex items-center gap-1 sm:gap-2 hover:text-gray-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">CONTACT US</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white shadow-md border-b-2 border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Left Navigation - Desktop */}
            <div className="hidden lg:flex items-center gap-1">
              <Link 
                href="/" 
                className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-3 xl:px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide"
              >
                Home
              </Link>
              <Link 
                href="/news" 
                className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-3 xl:px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide"
              >
                News
              </Link>
              <Link 
                href="/members" 
                className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-3 xl:px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide"
              >
                Lab
              </Link>
              <Link 
                href="/publications" 
                className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-3 xl:px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide"
              >
                Publication
              </Link>
            </div>

            {/* Center - Lab Logo */}
            <div className="flex items-center justify-center">
              <Link href="/">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden shadow-lg border-2 border-indigo-200">
                  <Image 
                    src="/logo.jpeg" 
                    alt="CogBioAV Lab Logo" 
                    width={120} 
                    height={120}
                    className="object-cover"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Right Navigation - Desktop */}
            <div className="hidden lg:flex items-center gap-1">
              <Link 
                href="/resources" 
                className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-3 xl:px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide"
              >
                Resources
              </Link>
              <Link 
                href="/album" 
                className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-3 xl:px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide"
              >
                Album
              </Link>
              <a 
                href="https://youtube.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-3 xl:px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide flex items-center gap-1"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="hidden xl:inline">Social</span>
              </a>
              <a 
                href="https://bu.ac.bd/department/CSE/profile/MHBCSE" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-3 xl:px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide"
              >
                Profile
              </a>
            </div>

            {/* Placeholder for mobile alignment */}
            <div className="w-10 lg:hidden"></div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              <div className="flex flex-col space-y-1">
                <Link 
                  href="/" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-4 py-3 rounded transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  Home
                </Link>
                <Link 
                  href="/news" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-4 py-3 rounded transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  News
                </Link>
                <Link 
                  href="/members" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-4 py-3 rounded transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  Lab Members
                </Link>
                <Link 
                  href="/publications" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-4 py-3 rounded transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  Publications
                </Link>
                <Link 
                  href="/resources" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-4 py-3 rounded transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  Resources
                </Link>
                <Link 
                  href="/album" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-4 py-3 rounded transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  Album
                </Link>
                <a 
                  href="https://youtube.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-4 py-3 rounded transition-colors font-medium text-sm uppercase tracking-wide flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Social Media
                </a>
                <a 
                  href="https://bu.ac.bd/department/CSE/profile/MHBCSE" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-4 py-3 rounded transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  Profile
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
