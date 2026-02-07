'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { FaEnvelope, FaPhone, FaGlobe, FaGraduationCap, FaBriefcase, FaTrophy, FaBook, FaChalkboardTeacher, FaLinkedin, FaGithub, FaOrcid, FaResearchgate } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';

interface Member {
  _id: string;
  name: string;
  degree: string;
  award: string;
  description: string;
  type: string;
  email: string;
  title: string;
  department: string;
  institution: string;
  photo: string;
  phone: string;
  website: string;
  googleScholar: string;
  researchGate: string;
  linkedin: string;
  github: string;
  orcid: string;
  biography: string;
  researchInterests: string[];
  education: { degree: string; field: string; institution: string; year: string; thesis: string; }[];
  experience: { position: string; organization: string; startYear: string; endYear: string; description: string; }[];
  selectedPublications: string[];
  awards: { title: string; organization: string; year: string; description: string; }[];
  skills: string[];
  courses: { code: string; name: string; semester: string; }[];
  status: string;
  joinDate: string;
  graduationDate: string;
  currentPosition: string;
}

export default function MemberProfile() {
  const params = useParams();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await fetch(`/api/members/${params.id}`);
        const data = await res.json();
        if (data.success) {
          setMember(data.data);
        }
      } catch (error) {
        console.error('Error fetching member:', error);
      }
      setLoading(false);
    };
    if (params.id) fetchMember();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Member not found</h1>
          <Link href="/members" className="text-purple-600 hover:underline">← Back to Members</Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: 'About', show: true },
    { id: 'education', label: 'Education', show: member.education?.length > 0 },
    { id: 'experience', label: 'Experience', show: member.experience?.length > 0 },
    { id: 'research', label: 'Research', show: member.researchInterests?.length > 0 || member.selectedPublications?.length > 0 },
    { id: 'awards', label: 'Awards', show: member.awards?.length > 0 },
    { id: 'teaching', label: 'Teaching', show: member.courses?.length > 0 },
  ].filter(tab => tab.show);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Photo */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-xl overflow-hidden border-4 border-white/20 shadow-2xl flex-shrink-0">
              {member.photo ? (
                <Image src={member.photo} alt={member.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-purple-600 flex items-center justify-center">
                  <span className="text-5xl font-bold text-white">{member.name.charAt(0)}</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
                <span className={`text-xs px-3 py-1 rounded-full ${
                  member.type === 'pi' ? 'bg-green-500' : 
                  member.type === 'alumni' ? 'bg-orange-500' :
                  member.type === 'collaborator' ? 'bg-blue-500' : 'bg-purple-500'
                }`}>
                  {member.type === 'pi' ? 'Principal Investigator' : 
                   member.type === 'alumni' ? 'Alumni' :
                   member.type === 'collaborator' ? 'Collaborator' : 'Member'}
                </span>
                {member.status && member.status !== 'active' && (
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-500">{member.status}</span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold mb-2">{member.name}</h1>
              {member.title && <p className="text-xl text-blue-300 mb-1">{member.title}</p>}
              <p className="text-lg text-gray-300 mb-1">{member.degree}</p>
              {member.department && <p className="text-gray-400">{member.department}</p>}
              {member.institution && <p className="text-gray-400">{member.institution}</p>}

              {member.type === 'alumni' && member.currentPosition && (
                <p className="text-sm text-yellow-400 mt-2">Currently: {member.currentPosition}</p>
              )}

              {/* Social Links */}
              <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                {member.email && (
                  <a href={`mailto:${member.email}`} className="flex items-center gap-1 text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition">
                    <FaEnvelope /> Email
                  </a>
                )}
                {member.phone && (
                  <a href={`tel:${member.phone}`} className="flex items-center gap-1 text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition">
                    <FaPhone /> Call
                  </a>
                )}
                {member.website && (
                  <a href={member.website} target="_blank" rel="noopener" className="flex items-center gap-1 text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition">
                    <FaGlobe /> Website
                  </a>
                )}
                {member.googleScholar && (
                  <a href={member.googleScholar} target="_blank" rel="noopener" className="flex items-center gap-1 text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition">
                    <SiGooglescholar /> Scholar
                  </a>
                )}
                {member.researchGate && (
                  <a href={member.researchGate} target="_blank" rel="noopener" className="flex items-center gap-1 text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition">
                    <FaResearchgate /> ResearchGate
                  </a>
                )}
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener" className="flex items-center gap-1 text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition">
                    <FaLinkedin /> LinkedIn
                  </a>
                )}
                {member.github && (
                  <a href={member.github} target="_blank" rel="noopener" className="flex items-center gap-1 text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition">
                    <FaGithub /> GitHub
                  </a>
                )}
                {member.orcid && (
                  <a href={`https://orcid.org/${member.orcid}`} target="_blank" rel="noopener" className="flex items-center gap-1 text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition">
                    <FaOrcid /> ORCID
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            {/* Biography */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaBook className="text-purple-600" /> About
              </h2>
              {member.biography ? (
                <div className="prose max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: member.biography }} />
              ) : (
                <p className="text-gray-600">{member.description}</p>
              )}
            </div>

            {/* Skills */}
            {member.skills && member.skills.length > 0 && (
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, index) => (
                    <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Award Highlight */}
            {member.award && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl shadow p-6 border border-yellow-200">
                <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <FaTrophy className="text-yellow-500" /> Featured Achievement
                </h2>
                <p className="text-gray-700">{member.award}</p>
              </div>
            )}
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && member.education && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaGraduationCap className="text-purple-600" /> Education
            </h2>
            {member.education.map((edu, index) => (
              <div key={index} className="bg-white rounded-xl shadow p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{edu.degree} in {edu.field}</h3>
                    <p className="text-purple-600">{edu.institution}</p>
                    {edu.thesis && <p className="text-sm text-gray-500 mt-2">Thesis: {edu.thesis}</p>}
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full flex-shrink-0">{edu.year}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && member.experience && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaBriefcase className="text-purple-600" /> Experience
            </h2>
            {member.experience.map((exp, index) => (
              <div key={index} className="bg-white rounded-xl shadow p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{exp.position}</h3>
                    <p className="text-purple-600">{exp.organization}</p>
                    {exp.description && <p className="text-gray-600 mt-2">{exp.description}</p>}
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full flex-shrink-0">
                    {exp.startYear} - {exp.endYear || 'Present'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Research Tab */}
        {activeTab === 'research' && (
          <div className="space-y-6">
            {member.researchInterests && member.researchInterests.length > 0 && (
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Research Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {member.researchInterests.map((interest, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {member.selectedPublications && member.selectedPublications.length > 0 && (
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Selected Publications</h2>
                <ul className="space-y-4">
                  {member.selectedPublications.map((pub, index) => (
                    <li key={index} className="pl-4 border-l-4 border-purple-300 text-gray-600">{pub}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Awards Tab */}
        {activeTab === 'awards' && member.awards && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaTrophy className="text-yellow-500" /> Awards & Honors
            </h2>
            {member.awards.map((award, index) => (
              <div key={index} className="bg-white rounded-xl shadow p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{award.title}</h3>
                    <p className="text-purple-600">{award.organization}</p>
                    {award.description && <p className="text-gray-600 mt-2">{award.description}</p>}
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full flex-shrink-0">{award.year}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Teaching Tab */}
        {activeTab === 'teaching' && member.courses && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaChalkboardTeacher className="text-purple-600" /> Courses Taught
            </h2>
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Code</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Course Name</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Semester</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {member.courses.map((course, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-purple-600">{course.code}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{course.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{course.semester}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-8 pt-6 border-t">
          <Link href="/members" className="text-purple-600 hover:underline flex items-center gap-2">
            ← Back to All Members
          </Link>
        </div>
      </div>
    </div>
  );
}
