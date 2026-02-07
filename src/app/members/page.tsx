import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { connectDB } from '@/lib/mongodb';
import Member from '@/models/Member';

export const dynamic = 'force-dynamic';

interface MemberType {
  _id: string;
  name: string;
  degree: string;
  award?: string;
  description: string;
  type: 'pi' | 'member';
  contact?: string;
}

async function getMembers(): Promise<MemberType[]> {
  try {
    await connectDB();
    const members = await Member.find().sort({ createdAt: -1 }).lean();
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
  const members = allMembers.filter((member) => member.type === 'member');

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
            
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-600">
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-6">
                  <div className="md:flex-shrink-0">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-green-50 rounded-xl border-4 border-green-100 flex items-center justify-center mx-auto md:mx-0 overflow-hidden">
                      <span className="text-green-600 text-xs font-medium">Photo</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">{principalInvestigator.name}</h2>
                    <p className="text-base sm:text-lg md:text-xl text-green-600 font-semibold mb-1">{principalInvestigator.degree}</p>
                    {principalInvestigator.award && (
                      <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-3">{principalInvestigator.award}</p>
                    )}
                    {principalInvestigator.contact && (
                      <p className="text-sm sm:text-base text-gray-600 mb-3">
                        <span className="font-semibold">Contact:</span>{' '}
                        <span className="text-green-600 break-all">{principalInvestigator.contact}</span>
                      </p>
                    )}
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{principalInvestigator.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lab Members Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Current Lab Members</h1>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-green-600 rounded"></div>
        </div>
        
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          {members.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-600">
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-6">
                <div className="md:flex-shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-green-50 rounded-xl border-4 border-green-100 flex items-center justify-center mx-auto md:mx-0 overflow-hidden">
                    <span className="text-green-600 text-xs font-medium">Photo</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                    <div>
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-1">{member.name}</h2>
                      <p className="text-sm sm:text-base md:text-lg text-green-600 font-semibold">{member.degree}</p>
                    </div>
                  </div>
                  {member.award && (
                    <div className="bg-green-50 border-l-4 border-green-600 p-2 sm:p-3 mb-3 sm:mb-4">
                      <p className="text-xs sm:text-sm text-green-700 font-medium">{member.award}</p>
                    </div>
                  )}
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{member.description}</p>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
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
