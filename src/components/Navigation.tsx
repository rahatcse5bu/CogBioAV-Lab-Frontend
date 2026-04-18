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
  const [isPublicationsOpen, setIsPublicationsOpen] = useState(false);
  const [isLabOpen, setIsLabOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState('/logo.jpeg');
  const [avColor, setAvColor] = useState('text-blue-400');
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const socialDropdownRef = useRef<HTMLDivElement>(null);
  const publicationsDropdownRef = useRef<HTMLDivElement>(null);
  const labDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            if (data.data?.logo) setLogoUrl(data.data.logo);
            if (data.data?.avColor) setAvColor(data.data.avColor);
            if (data.data?.socialLinks) setSocialLinks(data.data.socialLinks);
          }
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    };
    fetchSettings();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (socialDropdownRef.current && !socialDropdownRef.current.contains(event.target as Node)) {
        setIsSocialOpen(false);
      }
      if (publicationsDropdownRef.current && !publicationsDropdownRef.current.contains(event.target as Node)) {
        setIsPublicationsOpen(false);
      }
      if (labDropdownRef.current && !labDropdownRef.current.contains(event.target as Node)) {
        setIsLabOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed w-full top-0 z-50">
      {/* Top Bar - Lab Name and Contact */}
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
          {/* Lab Name - Responsive */}
          <div className="flex items-center gap-1 sm:gap-2 flex-1 sm:flex-none">
            <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-300">
              <span className="hidden md:inline">Welcome to CogBio<span className={avColor}>AV</span> Lab</span>
              <span className="md:hidden">CogBio<span className={avColor}>AV</span> Lab</span>
            </span>
          </div>

          {/* Contact Us & Admin */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="#contact"
              title="Contact Us"
              className="flex items-center gap-1 hover:text-gray-200 transition-colors"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">CONTACT US</span>
            </Link>
            <span className="text-gray-500 hidden sm:inline text-xs">|</span>
            <Link
              href="/admin/login"
              title="Admin Login"
              className="flex items-center gap-1 hover:text-gray-200 transition-colors"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">ADMIN</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white shadow-md border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button - Better positioning */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
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
              {/* Lab Dropdown */}
              <div
                className="relative"
                ref={labDropdownRef}
                onMouseEnter={() => setIsLabOpen(true)}
                onMouseLeave={() => setIsLabOpen(false)}
              >
                <Link
                  href="/members"
                  className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-3 xl:px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide flex items-center gap-1"
                >
                  Lab
                  <svg className={`w-4 h-4 transition-transform ${isLabOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                {isLabOpen && (
                  <div className="absolute left-0 mt-0 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                    <Link
                      href="/members#pi"
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 text-sm font-medium transition-all duration-150 ease-in-out"
                    >
                      Principal Investigator
                    </Link>
                    <Link
                      href="/members#member"
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 text-sm font-medium transition-all duration-150 ease-in-out"
                    >
                      Current Lab Members
                    </Link>
                    <Link
                      href="/members#technical_collaborators"
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 text-sm font-medium transition-all duration-150 ease-in-out"
                    >
                      Technical Collaborators
                    </Link>
                    <Link
                      href="/members#alumni"
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 text-sm font-medium transition-all duration-150 ease-in-out"
                    >
                      Alumni
                    </Link>
                    <Link
                      href="/members#collaborator"
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 text-sm font-medium transition-all duration-150 ease-in-out"
                    >
                      Collaborators
                    </Link>
                  </div>
                )}
              </div>
              {/* Publications Dropdown */}
              <div
                className="relative"
                ref={publicationsDropdownRef}
                onMouseEnter={() => setIsPublicationsOpen(true)}
                onMouseLeave={() => setIsPublicationsOpen(false)}
              >
                <Link
                  href="/publications"
                  className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-3 xl:px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide flex items-center gap-1"
                  onClick={(e) => {
                    // Allow normal navigation while keeping dropdown visible on hover
                  }}
                >
                  Publication
                  <svg className={`w-4 h-4 transition-transform ${isPublicationsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                {isPublicationsOpen && (
                  <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                    <Link
                      href="/publications#article"
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 text-sm font-medium transition-all duration-150 ease-in-out"
                    >
                      Articles
                    </Link>
                    <Link
                      href="/publications#book"
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 text-sm font-medium transition-all duration-150 ease-in-out"
                    >
                      Books
                    </Link>
                    <Link
                      href="/publications#book_chapter"
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 text-sm font-medium transition-all duration-150 ease-in-out"
                    >
                      Book Chapter
                    </Link>
                    <Link
                      href="/publications#conference"
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 text-sm font-medium transition-all duration-150 ease-in-out"
                    >
                      Conferences
                    </Link>
                    <Link
                      href="/publications"
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 text-sm font-medium transition-all duration-150 ease-in-out"
                    >
                      Publications
                    </Link>
                    <Link
                      href="/publications#monograph"
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 text-sm font-medium transition-all duration-150 ease-in-out"
                    >
                      Monograph
                    </Link>
                    <Link
                      href="/publications#workshop"
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 text-sm font-medium transition-all duration-150 ease-in-out"
                    >
                      Workshop
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Center spacer for logo - Responsive sizing */}
            <div className="w-16 sm:w-20 md:w-24 lg:w-32"></div>

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
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
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

            {/* Placeholder for mobile alignment - adjusts for smaller screens */}
            <div className="w-10 sm:w-8 lg:hidden"></div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-3 pb-4 border-t border-gray-200 pt-3 max-h-[calc(100vh-200px)] overflow-y-auto">
              <div className="flex flex-col space-y-1">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-3 sm:px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  Home
                </Link>
                <Link
                  href="/news"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-3 sm:px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  News
                </Link>
                <Link
                  href="/members"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-3 sm:px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  Lab Members
                </Link>
                {/* Mobile Lab Submenu */}
                <div className="border-t border-gray-100 pt-2 mt-2 pl-2">
                  <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Lab Categories</p>
                  <Link
                    href="/members#pi"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 px-5 py-2 rounded transition-colors text-sm block"
                  >
                    Principal Investigator
                  </Link>
                  <Link
                    href="/members#member"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 px-5 py-2 rounded transition-colors text-sm block"
                  >
                    Current Lab Members
                  </Link>
                  <Link
                    href="/members#technical_collaborators"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 px-5 py-2 rounded transition-colors text-sm block"
                  >
                    Technical Collaborators
                  </Link>
                  <Link
                    href="/members#alumni"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 px-5 py-2 rounded transition-colors text-sm block"
                  >
                    Alumni
                  </Link>
                  <Link
                    href="/members#collaborator"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 px-5 py-2 rounded transition-colors text-sm block"
                  >
                    Collaborators
                  </Link>
                </div>
                {/* Mobile Publications Submenu */}
                <div className="border-t border-gray-100 pt-2 mt-2 pl-2">
                  <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Publications</p>
                  <Link
                    href="/publications#article"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 px-5 py-2 rounded transition-colors text-sm block"
                  >
                    Articles
                  </Link>
                  <Link
                    href="/publications#book"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 px-5 py-2 rounded transition-colors text-sm block"
                  >
                    Books
                  </Link>
                  <Link
                    href="/publications#book_chapter"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 px-5 py-2 rounded transition-colors text-sm block"
                  >
                    Book Chapter
                  </Link>
                  <Link
                    href="/publications#conference"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 px-5 py-2 rounded transition-colors text-sm block"
                  >
                    Conferences
                  </Link>
                  <Link
                    href="/publications"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 px-5 py-2 rounded transition-colors text-sm block"
                  >
                    All Publications
                  </Link>
                  <Link
                    href="/publications#monograph"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 px-5 py-2 rounded transition-colors text-sm block"
                  >
                    Monograph
                  </Link>
                  <Link
                    href="/publications#workshop"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 px-5 py-2 rounded transition-colors text-sm block"
                  >
                    Workshop
                  </Link>
                </div>
                <Link
                  href="/resources"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-3 sm:px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  Resources
                </Link>
                <Link
                  href="/album"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-3 sm:px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  Album
                </Link>
                {/* Mobile Social Links */}
                {socialLinks.length > 0 && (
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Social Links</p>
                    {socialLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target={link.openInNewTab ? '_blank' : '_self'}
                        rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-3 sm:px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 px-3 sm:px-4 py-2 rounded transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  Profile
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Centered Overlapping Logo - spans from topbar through nav into hero - Responsive sizing */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 z-[100] pt-1">
        <Link href="/">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded-full overflow-hidden shadow-2xl bg-white">
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
