import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import { connectDB } from '@/lib/mongodb';
import Member from '@/models/Member';
import { FaEnvelope, FaGlobe } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';

export const dynamic = 'force-dynamic';

interface MemberType {
  _id: string;
  name: string;
  degree: string;
  award?: string;
  description: string;
  type: 'pi' | 'member' | 'alumni' | 'collaborator';
  email?: string;
  title?: string;
  department?: string;
  institution?: string;
  photo?: string;
  website?: string;
  googleScholar?: string;
  researchInterests?: string[];
  status?: string;
  currentPosition?: string;
  order?: number;
}

async function getMembers(): Promise<MemberType[]> {
  try {
    await connectDB();
    const members = await Member.find().sort({ order: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(members));
  } catch (error) {
    console.error('Error fetching members:', error);
    return [];
  }
}

export default async function Members() {
  const allMembers = await getMembers();
  const principalInvestigators = allMembers.filter((member) => member.type === 'pi');
  const principalInvestigator = principalInvestigators[0] || null;
  const currentMembers = allMembers.filter((member) => member.type === 'member' && member.status !== 'graduated');
  const alumni = allMembers.filter((member) => member.type === 'alumni' || member.status === 'graduated');
  const collaborators = allMembers.filter((member) => member.type === 'collaborator');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-0 top-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute right-0 bottom-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-10 sm:py-12 md:py-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Lab Members</h1>
            <p className="text-gray-300 text-xs sm:text-sm">Our research team</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-10 md:py-12">
        {/* Principal Investigator Section */}
        {principalInvestigator && (
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Principal Investigator</h1>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-green-600 rounded mb-6 sm:mb-8"></div>
            
            <Link href={`/members/${principalInvestigator._id}`} className="block">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border-l-4 border-green-600">
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
                      {principalInvestigator.award && (
                        <p className="text-sm sm:text-base text-gray-600 mb-3 italic">&ldquo;{principalInvestigator.award}&rdquo;</p>
                      )}
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">{principalInvestigator.description}</p>
                      
                      {/* Quick Links */}
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {principalInvestigator.email && (
                          <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            <FaEnvelope className="text-green-600" /> {principalInvestigator.email}
                          </span>
                        )}
                        {principalInvestigator.website && (
                          <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            <FaGlobe className="text-blue-600" /> Website
                          </span>
                        )}
                        {principalInvestigator.googleScholar && (
                          <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            <SiGooglescholar className="text-blue-600" /> Scholar
                          </span>
                        )}
                      </div>
                      <p className="text-purple-600 text-sm mt-4 hover:underline">View Full Profile →</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Current Lab Members Section */}
        {currentMembers.length > 0 && (
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Current Lab Members</h1>
              <div className="w-16 sm:w-20 md:w-24 h-1 bg-purple-600 rounded"></div>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {currentMembers.map((member) => (
                <Link key={member._id} href={`/members/${member._id}`} className="block">
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 h-full">
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-purple-50 rounded-xl border-2 border-purple-100 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                          {member.photo ? (
                            <Image src={member.photo} alt={member.name} fill className="object-cover" />
                          ) : (
                            <span className="text-2xl font-bold text-purple-600">{member.name.charAt(0)}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-800 text-lg mb-1 truncate">{member.name}</h3>
                          {member.title && <p className="text-sm text-purple-600 truncate">{member.title}</p>}
                          <p className="text-sm text-gray-600 truncate">{member.degree}</p>
                        </div>
                      </div>
                      
                      {member.researchInterests && member.researchInterests.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1">
                          {member.researchInterests.slice(0, 3).map((interest, i) => (
                            <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                              {interest}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-gray-600 text-sm mt-3 line-clamp-2">{member.description}</p>
                      <p className="text-purple-600 text-sm mt-3 hover:underline">View Profile →</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Alumni Section */}
        {alumni.length > 0 && (
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Alumni</h1>
              <div className="w-16 sm:w-20 md:w-24 h-1 bg-orange-500 rounded"></div>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {alumni.map((member) => (
                <Link key={member._id} href={`/members/${member._id}`} className="block">
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 h-full border-t-4 border-orange-400">
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-orange-50 rounded-xl border-2 border-orange-100 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                          {member.photo ? (
                            <Image src={member.photo} alt={member.name} fill className="object-cover" />
                          ) : (
                            <span className="text-xl font-bold text-orange-600">{member.name.charAt(0)}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-800 text-lg mb-1 truncate">{member.name}</h3>
                          <p className="text-sm text-gray-600 truncate">{member.degree}</p>
                          {member.currentPosition && (
                            <p className="text-sm text-orange-600 mt-1 truncate">Now: {member.currentPosition}</p>
                          )}
                        </div>
                      </div>
                      <p className="text-purple-600 text-sm mt-3 hover:underline">View Profile →</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Collaborators Section */}
        {collaborators.length > 0 && (
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Collaborators</h1>
              <div className="w-16 sm:w-20 md:w-24 h-1 bg-blue-500 rounded"></div>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {collaborators.map((member) => (
                <Link key={member._id} href={`/members/${member._id}`} className="block">
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 h-full border-t-4 border-blue-400">
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-blue-50 rounded-xl border-2 border-blue-100 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                          {member.photo ? (
                            <Image src={member.photo} alt={member.name} fill className="object-cover" />
                          ) : (
                            <span className="text-xl font-bold text-blue-600">{member.name.charAt(0)}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-800 text-lg mb-1 truncate">{member.name}</h3>
                          {member.title && <p className="text-sm text-blue-600 truncate">{member.title}</p>}
                          {member.institution && <p className="text-sm text-gray-500 truncate">{member.institution}</p>}
                        </div>
                      </div>
                      <p className="text-purple-600 text-sm mt-3 hover:underline">View Profile →</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 sm:mt-16 md:mt-20">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="mb-3 sm:mb-4 md:mb-0">
              <p className="font-semibold text-base sm:text-lg">CogBio<span className="text-green-400">AV</span> Lab</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">University of Barishal</p>
            </div>
            <div className="text-gray-400 text-xs sm:text-sm">
              <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
