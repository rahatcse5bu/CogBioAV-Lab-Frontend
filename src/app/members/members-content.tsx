'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';
import { SiGooglescholar, SiResearchgate, SiLinkedin, SiGithub } from 'react-icons/si';
import MemberDetailModal from '@/components/MemberDetailModal';

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
  biography?: string;
  researchInterests?: string[];
  status?: string;
  currentPosition?: string;
  order?: number;
}

interface MembersContentProps {
  principalInvestigator: MemberType | null;
  currentMembers: MemberType[];
  technicalCollaborators: MemberType[];
  alumni: MemberType[];
  collaborators: MemberType[];
}

const sections = [
  { id: 'pi', label: 'PI' },
  { id: 'member', label: 'Members' },
  { id: 'technical_collaborators', label: 'Technical' },
  { id: 'alumni', label: 'Alumni' },
  { id: 'collaborator', label: 'Collaborators' },
];

function SocialIcon({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      className="w-9 h-9 rounded-full bg-slate-100 hover:bg-blue-50 flex items-center justify-center text-slate-500 hover:text-blue-600 transition-all duration-200"
    >
      <Icon className="w-4 h-4" />
    </a>
  );
}

export default function MembersContent({
  principalInvestigator,
  currentMembers,
  technicalCollaborators,
  alumni,
  collaborators,
}: MembersContentProps) {
  const [selectedMember, setSelectedMember] = useState<MemberType | null>(null);

  const availableSections = sections.filter((s) => {
    if (s.id === 'pi') return !!principalInvestigator;
    if (s.id === 'member') return currentMembers.length > 0;
    if (s.id === 'technical_collaborators') return technicalCollaborators.length > 0;
    if (s.id === 'alumni') return alumni.length > 0;
    if (s.id === 'collaborator') return collaborators.length > 0;
    return false;
  });

  const MemberCard = ({ member }: { member: MemberType }) => (
    <div
      onClick={() => setSelectedMember(member)}
      className="group bg-white rounded-2xl border border-slate-200/80 hover:border-blue-200 shadow-sm hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="p-6">
        {/* Photo + Name */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-50 to-slate-100 flex-shrink-0 overflow-hidden relative ring-2 ring-white shadow-md">
            {member.photo ? (
              <Image src={member.photo} alt={member.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
                <span className="text-xl font-semibold text-white">{member.name.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 text-base leading-snug group-hover:text-blue-700 transition-colors">
              {member.name}
            </h3>
            {member.title && (
              <p className="text-sm text-blue-600/80 font-medium mt-0.5 truncate">{member.title}</p>
            )}
            <p className="text-xs text-slate-500 mt-0.5 truncate">{member.degree}</p>
          </div>
        </div>

        {/* Info chips */}
        <div className="space-y-2 mb-4">
          {member.institution && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="truncate">{member.institution}</span>
            </div>
          )}
          {member.department && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="truncate">{member.department}</span>
            </div>
          )}
          {member.currentPosition && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="truncate">{member.currentPosition}</span>
            </div>
          )}
        </div>

        {/* Description - truncated */}
        <div className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4 rich-text-content" dangerouslySetInnerHTML={{ __html: member.description }} />

        {/* Research interests tags */}
        {member.researchInterests && member.researchInterests.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {member.researchInterests.slice(0, 3).map((interest, i) => (
              <span key={i} className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full">
                {interest}
              </span>
            ))}
            {member.researchInterests.length > 3 && (
              <span className="inline-block bg-slate-100 text-slate-500 text-xs font-medium px-2.5 py-1 rounded-full">
                +{member.researchInterests.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer: social links + view profile */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex gap-1.5">
            {member.email && <SocialIcon href={`mailto:${member.email}`} icon={FaEnvelope} label="Email" />}
            {member.website && <SocialIcon href={member.website} icon={FaGlobe} label="Website" />}
            {member.googleScholar && <SocialIcon href={member.googleScholar} icon={SiGooglescholar} label="Google Scholar" />}
            {member.linkedin && <SocialIcon href={member.linkedin} icon={SiLinkedin} label="LinkedIn" />}
            {member.github && <SocialIcon href={member.github} icon={SiGithub} label="GitHub" />}
          </div>
        </div>
      </div>
    </div>
  );

  const SectionHeader = ({ title, subtitle, count }: { title: string; subtitle?: string; count: number }) => (
    <div className="mb-8 flex items-end justify-between">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{title}</h2>
        {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
      </div>
      <span className="text-sm font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
        {count} {count === 1 ? 'member' : 'members'}
      </span>
    </div>
  );

  return (
    <>
      {/* Quick navigation pills */}
      {availableSections.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {availableSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 hover:border-blue-200 shadow-sm transition-all duration-200"
            >
              {section.label}
            </a>
          ))}
        </div>
      )}

      {/* Principal Investigator Section */}
      {principalInvestigator && (
        <section id="pi" className="mb-16 sm:mb-20 scroll-mt-40">
          <SectionHeader title="Principal Investigator" subtitle="Lab Director" count={1} />

          <div
            onClick={() => setSelectedMember(principalInvestigator)}
            className="group bg-white rounded-2xl border border-slate-200/80 hover:border-blue-200 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="p-6 sm:p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10">
                {/* Photo */}
                <div className="md:flex-shrink-0 flex justify-center md:justify-start">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-2xl bg-gradient-to-br from-blue-50 to-slate-100 overflow-hidden relative ring-4 ring-white shadow-lg">
                    {principalInvestigator.photo ? (
                      <Image
                        src={principalInvestigator.photo}
                        alt={principalInvestigator.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
                        <span className="text-5xl font-bold text-white">{principalInvestigator.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {principalInvestigator.name}
                  </h3>
                  {principalInvestigator.title && (
                    <p className="text-lg text-blue-600 font-medium mt-1">{principalInvestigator.title}</p>
                  )}
                  <p className="text-slate-500 text-sm mt-1">{principalInvestigator.degree}</p>

                  {(principalInvestigator.department || principalInvestigator.institution) && (
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 justify-center md:justify-start text-sm text-slate-600">
                      {principalInvestigator.department && (
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          {principalInvestigator.department}
                        </span>
                      )}
                      {principalInvestigator.department && principalInvestigator.institution && (
                        <span className="text-slate-300">|</span>
                      )}
                      {principalInvestigator.institution && (
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {principalInvestigator.institution}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="text-slate-600 leading-relaxed mt-4 text-base line-clamp-4 rich-text-content" dangerouslySetInnerHTML={{ __html: principalInvestigator.description }} />

                  {/* Research interests */}
                  {principalInvestigator.researchInterests && principalInvestigator.researchInterests.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-5 justify-center md:justify-start">
                      {principalInvestigator.researchInterests.map((interest, i) => (
                        <span key={i} className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1.5 rounded-full">
                          {interest}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Contact + social links */}
                  <div className="flex flex-wrap items-center gap-3 mt-6 justify-center md:justify-start">
                    {principalInvestigator.email && (
                      <a
                        href={`mailto:${principalInvestigator.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                      >
                        <FaEnvelope className="w-3.5 h-3.5" />
                        Contact
                      </a>
                    )}
                    {principalInvestigator.phone && (
                      <a
                        href={`tel:${principalInvestigator.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg border border-slate-200 transition-colors"
                      >
                        <FaPhone className="w-3.5 h-3.5" />
                        Call
                      </a>
                    )}
                    <div className="flex gap-2 ml-1" onClick={(e) => e.stopPropagation()}>
                      {principalInvestigator.website && <SocialIcon href={principalInvestigator.website} icon={FaGlobe} label="Website" />}
                      {principalInvestigator.googleScholar && <SocialIcon href={principalInvestigator.googleScholar} icon={SiGooglescholar} label="Google Scholar" />}
                      {principalInvestigator.researchGate && <SocialIcon href={principalInvestigator.researchGate} icon={SiResearchgate} label="ResearchGate" />}
                      {principalInvestigator.linkedin && <SocialIcon href={principalInvestigator.linkedin} icon={SiLinkedin} label="LinkedIn" />}
                      {principalInvestigator.github && <SocialIcon href={principalInvestigator.github} icon={SiGithub} label="GitHub" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Current Lab Members Section */}
      {currentMembers.length > 0 && (
        <section id="member" className="mb-16 sm:mb-20 scroll-mt-40">
          <SectionHeader title="Current Lab Members" subtitle="Active researchers in the lab" count={currentMembers.length} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentMembers.map((member) => (
              <MemberCard key={member._id} member={member} />
            ))}
          </div>
        </section>
      )}

      {/* Technical Collaborators Section */}
      {technicalCollaborators.length > 0 && (
        <section id="technical_collaborators" className="mb-16 sm:mb-20 scroll-mt-40">
          <SectionHeader title="Technical Collaborators" subtitle="Technical expertise and support" count={technicalCollaborators.length} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {technicalCollaborators.map((member) => (
              <MemberCard key={member._id} member={member} />
            ))}
          </div>
        </section>
      )}

      {/* Alumni Section */}
      {alumni.length > 0 && (
        <section id="alumni" className="mb-16 sm:mb-20 scroll-mt-40">
          <SectionHeader title="Alumni" subtitle="Former lab members and graduates" count={alumni.length} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {alumni.map((member) => (
              <MemberCard key={member._id} member={member} />
            ))}
          </div>
        </section>
      )}

      {/* Collaborators Section */}
      {collaborators.length > 0 && (
        <section id="collaborator" className="mb-16 sm:mb-20 scroll-mt-40">
          <SectionHeader title="Collaborators" subtitle="External research partners" count={collaborators.length} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {collaborators.map((member) => (
              <MemberCard key={member._id} member={member} />
            ))}
          </div>
        </section>
      )}

      {/* Member Detail Modal */}
      <MemberDetailModal
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </>
  );
}
