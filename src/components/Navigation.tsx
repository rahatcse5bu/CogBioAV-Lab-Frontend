'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface SocialLink {
  id: string;
  label: string;
  url: string;
  openInNewTab: boolean;
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState('/logo.jpeg');
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const socialDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            if (data.data?.logo) setLogoUrl(data.data.logo);
            if (data.data?.socialLinks) setSocialLinks(data.data.socialLinks);
          }
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    };
    fetchSettings();
  }, []);

  // Close social dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (socialDropdownRef.current && !socialDropdownRef.current.contains(event.target as Node)) {
        setIsSocialOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {/* Top Bar - Lab Name and Contact */}
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-2 sm:py-3 flex items-center justify-between">
          {/* Lab Name */}
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold tracking-wide">
              Cog-Bio<span className="text-blue-400">AV</span> Lab
            </h1>
            <span className="text-xs sm:text-sm text-gray-300 hidden lg:inline">
              | Cognitive Audio-Visual Biomedical Research Laboratory
            </span>
          </div>

          {/* Contact Us & Admin */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link 
              href="#contact" 
              className="flex items-center gap-1 sm:gap-2 hover:text-gray-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">CONTACT US</span>
            </Link>
            <span className="text-gray-500 hidden sm:inline">|</span>
            <Link 
              href="/admin/login" 
              className="flex items-center gap-1 sm:gap-2 hover:text-gray-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">ADMIN</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white shadow-md border-b-2 border-gray-200">
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

            {/* Center spacer for logo */}
            <div className="w-20 sm:w-24 md:w-28 lg:w-32"></div>

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
              {/* Social Dropdown */}
              {socialLinks.length > 0 && (
                <div className="relative" ref={socialDropdownRef}>
                  <button 
                    onClick={() => setIsSocialOpen(!isSocialOpen)}
                    className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-3 xl:px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide flex items-center gap-1"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                    </svg>
                    <span className="hidden xl:inline">Social</span>
                    <svg className={`w-4 h-4 transition-transform ${isSocialOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isSocialOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {socialLinks.map((link) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target={link.openInNewTab ? '_blank' : '_self'}
                          rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                          className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 text-sm transition-colors"
                          onClick={() => setIsSocialOpen(false)}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
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
                {/* Mobile Social Links */}
                {socialLinks.length > 0 && (
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Social Links</p>
                    {socialLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target={link.openInNewTab ? '_blank' : '_self'}
                        rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-4 py-3 rounded transition-colors font-medium text-sm uppercase tracking-wide flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
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

      {/* Centered Overlapping Logo - spans from topbar through nav into hero */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 z-[100] pt-1">
        <Link href="/">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden shadow-2xl border-4 border-white bg-white">
            <Image 
              src={logoUrl} 
              alt="CogBioAV Lab Logo" 
              width={150} 
              height={150}
              className="object-cover w-full h-full"
              priority
              unoptimized={logoUrl.includes('ibb.co') || logoUrl.includes('imgbb.com')}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
