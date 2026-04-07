'use client';

import Image from 'next/image';
import { useState } from 'react';
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

export default function MembersContent({
  principalInvestigator,
  currentMembers,
  technicalCollaborators,
  alumni,
  collaborators,
}: MembersContentProps) {
  const [selectedMember, setSelectedMember] = useState<MemberType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (member: MemberType) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const MemberCard = ({ member, colors }: { member: MemberType; colors: { bg: string; text: string; bg_light: string; border: string } }) => (
    <div className="block">
      <div className={`bg-white rounded-xl shadow-lg h-full border-t-4 ${colors.border}`}>
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-20 h-20 sm:w-24 sm:h-24 ${colors.bg_light} rounded-xl border-2 ${colors.border} flex items-center justify-center flex-shrink-0 overflow-hidden relative`}>
              {member.photo ? (
                <Image src={member.photo} alt={member.name} fill className="object-cover" />
              ) : (
                <span className={`text-2xl font-bold ${colors.text}`}>{member.name.charAt(0)}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-1 truncate">{member.name}</h3>
              {member.title && <p className={`text-sm ${colors.text} truncate`}>{member.title}</p>}
              <p className="text-xs sm:text-sm text-gray-600 truncate">{member.degree}</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-2 mb-4 text-xs sm:text-sm">
            {member.institution && (
              <p className="text-gray-600 truncate flex items-center gap-1">
                <span className="font-medium">Inst:</span> {member.institution}
              </p>
            )}
            {member.department && (
              <p className="text-gray-600 truncate flex items-center gap-1">
                <span className="font-medium">Dept:</span> {member.department}
              </p>
            )}
            {member.email && (
              <p className="text-gray-600 truncate flex items-center gap-1">
                <span className="font-medium">📧</span> {member.email}
              </p>
            )}
            {member.phone && (
              <p className="text-gray-600 truncate flex items-center gap-1">
                <span className="font-medium">📱</span> {member.phone}
              </p>
            )}
            {member.currentPosition && (
              <p className="text-gray-600 truncate flex items-center gap-1">
                <span className="font-medium">Now:</span> {member.currentPosition}
              </p>
            )}
          </div>

          {/* Research Interests */}
          {member.researchInterests && member.researchInterests.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1">
              {member.researchInterests.slice(0, 3).map((interest, i) => (
                <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                  {interest}
                </span>
              ))}
              {member.researchInterests.length > 3 && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  +{member.researchInterests.length - 3}
                </span>
              )}
            </div>
          )}

          <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-4">{member.description}</p>

          {/* View Details Button */}
          <button
            onClick={() => openModal(member)}
            className={`w-full py-2 px-3 rounded-lg font-medium transition-colors text-sm bg-blue-600 text-white hover:bg-blue-700`}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Principal Investigator Section */}
      {principalInvestigator && (
        <div id="pi" className="mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Principal Investigator</h1>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-green-600 rounded mb-6 sm:mb-8"></div>

          <div className="bg-white rounded-xl shadow-lg border-l-4 border-green-600">
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-6">
                <div className="md:flex-shrink-0">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-green-50 rounded-xl border-4 border-green-100 flex items-center justify-center mx-auto md:mx-0 overflow-hidden relative">
                    {principalInvestigator.photo ? (
                      <Image
                        src={principalInvestigator.photo}
                        alt={principalInvestigator.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-4xl font-bold text-green-600">{principalInvestigator.name.charAt(0)}</span>
                    )}
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1">{principalInvestigator.name}</h2>
                  {principalInvestigator.title && (
                    <p className="text-base sm:text-lg text-purple-600 font-medium mb-1">{principalInvestigator.title}</p>
                  )}
                  <p className="text-sm sm:text-base md:text-lg text-green-600 font-semibold mb-1">{principalInvestigator.degree}</p>
                  {principalInvestigator.department && (
                    <p className="text-sm text-gray-500">{principalInvestigator.department}</p>
                  )}
                  {principalInvestigator.institution && (
                    <p className="text-sm text-gray-500 mb-3">{principalInvestigator.institution}</p>
                  )}
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">{principalInvestigator.description}</p>

                  <button
                    onClick={() => openModal(principalInvestigator)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    View Full Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Current Lab Members Section */}
      {currentMembers.length > 0 && (
        <div id="member" className="mb-8 sm:mb-10 md:mb-12">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Current Lab Members</h1>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-purple-600 rounded"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {currentMembers.map((member) => (
              <MemberCard
                key={member._id}
                member={member}
                colors={{ bg: 'bg-purple-600', text: 'text-purple-600', bg_light: 'bg-purple-50', border: 'border-purple-400' }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Technical Collaborators Section */}
      {technicalCollaborators.length > 0 && (
        <div id="technical_collaborators" className="mb-8 sm:mb-10 md:mb-12">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Technical Collaborators</h1>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-red-500 rounded"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {technicalCollaborators.map((member) => (
              <MemberCard
                key={member._id}
                member={member}
                colors={{ bg: 'bg-red-600', text: 'text-red-600', bg_light: 'bg-red-50', border: 'border-red-400' }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Alumni Section */}
      {alumni.length > 0 && (
        <div id="alumni" className="mb-8 sm:mb-10 md:mb-12">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Alumni</h1>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-orange-500 rounded"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {alumni.map((member) => (
              <MemberCard
                key={member._id}
                member={member}
                colors={{ bg: 'bg-orange-600', text: 'text-orange-600', bg_light: 'bg-orange-50', border: 'border-orange-400' }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Collaborators Section */}
      {collaborators.length > 0 && (
        <div id="collaborator" className="mb-8 sm:mb-10 md:mb-12">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Collaborators</h1>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-blue-500 rounded"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {collaborators.map((member) => (
              <MemberCard
                key={member._id}
                member={member}
                colors={{ bg: 'bg-blue-600', text: 'text-blue-600', bg_light: 'bg-blue-50', border: 'border-blue-400' }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      <MemberDetailModal member={selectedMember} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
