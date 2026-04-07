'use client';

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
}

interface MemberDetailModalProps {
  member: MemberType | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MemberDetailModal({ member, isOpen, onClose }: MemberDetailModalProps) {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4 pt-20">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">
        {/* Header with Close Button */}
        <div className="sticky top-0 bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white p-6 flex items-start justify-between">
          <h2 className="text-2xl font-bold">{member.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white transition-colors"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Photo and Basic Info */}
          <div className="flex gap-6">
            {member.photo ? (
              <div className="relative w-32 h-32 flex-shrink-0">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            ) : (
              <div className="w-32 h-32 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-4xl font-bold text-gray-400">{member.name.charAt(0)}</span>
              </div>
            )}
            <div className="flex-1">
              {member.title && <p className="text-lg font-semibold text-blue-600 mb-1">{member.title}</p>}
              <p className="text-gray-600 mb-2">{member.degree}</p>
              {member.institution && <p className="text-gray-600 mb-2">{member.institution}</p>}
              {member.department && <p className="text-gray-600 mb-3">{member.department}</p>}
              {member.status && (
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  member.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {member.status}
                </span>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t pt-4">
            <h3 className="font-bold text-gray-800 mb-3">Contact Information</h3>
            <div className="space-y-2">
              {member.email && (
                <div className="flex items-center gap-3 text-gray-700">
                  <FaEnvelope className="text-blue-600 flex-shrink-0" />
                  <a href={`mailto:${member.email}`} className="hover:text-blue-600">
                    {member.email}
                  </a>
                </div>
              )}
              {member.phone && (
                <div className="flex items-center gap-3 text-gray-700">
                  <FaPhone className="text-blue-600 flex-shrink-0" />
                  {member.phone}
                </div>
              )}
              {member.website && (
                <div className="flex items-center gap-3 text-gray-700">
                  <FaGlobe className="text-blue-600 flex-shrink-0" />
                  <a href={member.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                    Website
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {member.description && (
            <div className="border-t pt-4">
              <h3 className="font-bold text-gray-800 mb-2">About</h3>
              <p className="text-gray-600 leading-relaxed">{member.description}</p>
            </div>
          )}

          {/* Biography */}
          {member.biography && (
            <div className="border-t pt-4">
              <h3 className="font-bold text-gray-800 mb-2">Biography</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{member.biography}</p>
            </div>
          )}

          {/* Research Interests */}
          {member.researchInterests && member.researchInterests.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="font-bold text-gray-800 mb-3">Research Interests</h3>
              <div className="flex flex-wrap gap-2">
                {member.researchInterests.map((interest, i) => (
                  <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          <div className="border-t pt-4">
            <h3 className="font-bold text-gray-800 mb-3">Links</h3>
            <div className="flex flex-wrap gap-3">
              {member.googleScholar && (
                <a
                  href={member.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
                >
                  <SiGooglescholar className="text-blue-600" />
                  <span className="text-sm">Google Scholar</span>
                </a>
              )}
              {member.researchGate && (
                <a
                  href={member.researchGate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
                >
                  <SiResearchgate className="text-green-600" />
                  <span className="text-sm">ResearchGate</span>
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
                >
                  <SiLinkedin className="text-blue-700" />
                  <span className="text-sm">LinkedIn</span>
                </a>
              )}
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
                >
                  <SiGithub className="text-gray-800" />
                  <span className="text-sm">GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
