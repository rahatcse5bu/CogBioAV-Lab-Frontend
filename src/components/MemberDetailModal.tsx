'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { FaEnvelope, FaPhone, FaGlobe, FaTimes } from 'react-icons/fa';
import { SiGooglescholar, SiResearchgate, SiLinkedin, SiGithub } from 'react-icons/si';

interface MemberType {
  _id: string;
  name: string;
  degree: string;
  award?: string;
  description: string;
  type: 'pi' | 'member' | 'technical_collaborators' | 'alumni' | 'collaborator';
  email?: string;
  title?: string;
  department?: string;
  institution?: string;
  photo?: string;
  phone?: string;
  website?: string;
  googleScholar?: string;
  researchGate?: string;
  linkedin?: string;
  github?: string;
  orcid?: string;
  biography?: string;
  researchInterests?: string[];
  status?: string;
  currentPosition?: string;
}

interface MemberDetailModalProps {
  member: MemberType | null;
  isOpen: boolean;
  onClose: () => void;
}

function LinkPill({ href, icon: Icon, label, color }: { href: string; icon: React.ElementType; label: string; color: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 hover:border-slate-300`}
    >
      <Icon className={`w-4 h-4 ${color}`} />
      {label}
    </a>
  );
}

export default function MemberDetailModal({ member, isOpen, onClose }: MemberDetailModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !member) return null;

  const typeLabel: Record<string, string> = {
    pi: 'Principal Investigator',
    member: 'Lab Member',
    technical_collaborators: 'Technical Collaborator',
    alumni: 'Alumni',
    collaborator: 'Collaborator',
  };

  const hasContactInfo = member.email || member.phone || member.website;
  const hasSocialLinks = member.googleScholar || member.researchGate || member.linkedin || member.github;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-start justify-center p-4 pt-20 sm:pt-24 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-4 animate-modal-enter"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 sm:p-8 pb-0">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors z-10"
          >
            <FaTimes className="w-4 h-4" />
          </button>

          {/* Profile header */}
          <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
            {/* Photo */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden relative flex-shrink-0 ring-4 ring-slate-100 shadow-md">
              {member.photo ? (
                <Image src={member.photo} alt={member.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
                  <span className="text-4xl font-bold text-white">{member.name.charAt(0)}</span>
                </div>
              )}
            </div>

            {/* Name and basic info */}
            <div className="text-center sm:text-left flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                <h2 className="text-2xl font-bold text-slate-900">{member.name}</h2>
              </div>
              {member.title && (
                <p className="text-blue-600 font-medium mt-1">{member.title}</p>
              )}
              <p className="text-slate-500 text-sm mt-0.5">{member.degree}</p>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 justify-center sm:justify-start text-sm text-slate-600">
                {member.department && <span>{member.department}</span>}
                {member.department && member.institution && <span className="text-slate-300">|</span>}
                {member.institution && <span>{member.institution}</span>}
              </div>

              {/* Type badge + status */}
              <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                  {typeLabel[member.type] || member.type}
                </span>
                {member.status && (
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                    member.status === 'active'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                      : 'bg-slate-50 text-slate-600 border border-slate-200'
                  }`}>
                    {member.status === 'active' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                    )}
                    {member.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 pt-6 space-y-6">
          {/* Contact info */}
          {hasContactInfo && (
            <div className="flex flex-wrap gap-3">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                >
                  <FaEnvelope className="w-3.5 h-3.5" />
                  {member.email}
                </a>
              )}
              {member.phone && (
                <a
                  href={`tel:${member.phone}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg border border-slate-200 transition-colors"
                >
                  <FaPhone className="w-3.5 h-3.5 text-slate-500" />
                  {member.phone}
                </a>
              )}
              {member.website && (
                <a
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg border border-slate-200 transition-colors"
                >
                  <FaGlobe className="w-3.5 h-3.5 text-slate-500" />
                  Website
                </a>
              )}
            </div>
          )}

          {/* About */}
          {member.description && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">About</h3>
              <div className="text-slate-600 leading-relaxed rich-text-content" dangerouslySetInnerHTML={{ __html: member.description }} />
            </div>
          )}

          {/* Current Position */}
          {member.currentPosition && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Current Position</h3>
              <p className="text-slate-600 leading-relaxed">{member.currentPosition}</p>
            </div>
          )}

          {/* Biography */}
          {member.biography && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Biography</h3>
              <div className="text-slate-600 leading-relaxed text-sm rich-text-content" dangerouslySetInnerHTML={{ __html: member.biography }} />
            </div>
          )}

          {/* Awards */}
          {member.award && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Awards</h3>
              <div className="flex items-start gap-2 text-slate-600">
                <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <p>{member.award}</p>
              </div>
            </div>
          )}

          {/* Research Interests */}
          {member.researchInterests && member.researchInterests.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Research Interests</h3>
              <div className="flex flex-wrap gap-2">
                {member.researchInterests.map((interest, i) => (
                  <span key={i} className="inline-block bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-100">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social & Academic Links */}
          {hasSocialLinks && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Academic Profiles</h3>
              <div className="flex flex-wrap gap-2">
                {member.googleScholar && (
                  <LinkPill href={member.googleScholar} icon={SiGooglescholar} label="Google Scholar" color="text-blue-600" />
                )}
                {member.researchGate && (
                  <LinkPill href={member.researchGate} icon={SiResearchgate} label="ResearchGate" color="text-teal-600" />
                )}
                {member.linkedin && (
                  <LinkPill href={member.linkedin} icon={SiLinkedin} label="LinkedIn" color="text-blue-700" />
                )}
                {member.github && (
                  <LinkPill href={member.github} icon={SiGithub} label="GitHub" color="text-slate-800" />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
