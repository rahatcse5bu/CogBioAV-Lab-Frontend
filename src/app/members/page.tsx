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
          <div className="absolute left-0 top-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Lab Members</h1>
            <p className="text-gray-300 text-sm">Our research team</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Principal Investigator Section */}
        {principalInvestigator && (
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Principal Investigator</h1>
            <div className="w-24 h-1 bg-green-600 rounded mb-8"></div>
            
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-600">
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:flex-shrink-0">
                    <div className="w-48 h-48 bg-green-50 rounded-xl border-4 border-green-100 flex items-center justify-center mx-auto md:mx-0 overflow-hidden">
                      <span className="text-green-600 text-xs font-medium">Photo</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{principalInvestigator.name}</h2>
                    <p className="text-xl text-green-600 font-semibold mb-1">{principalInvestigator.degree}</p>
                    {principalInvestigator.award && (
                      <p className="text-lg text-gray-600 mb-3">{principalInvestigator.award}</p>
                    )}
                    {principalInvestigator.contact && (
                      <p className="text-gray-600 mb-3">
                        <span className="font-semibold">Contact:</span>{' '}
                        <span className="text-green-600">{principalInvestigator.contact}</span>
                      </p>
                    )}
                    <p className="text-gray-600 leading-relaxed">{principalInvestigator.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lab Members Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Current Lab Members</h1>
          <div className="w-24 h-1 bg-green-600 rounded"></div>
        </div>
        
        <div className="space-y-6">
          {members.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-600">
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                <div className="md:flex-shrink-0">
                  <div className="w-40 h-40 bg-green-50 rounded-xl border-4 border-green-100 flex items-center justify-center mx-auto md:mx-0 overflow-hidden">
                    <span className="text-green-600 text-xs font-medium">Photo</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-1">{member.name}</h2>
                      <p className="text-lg text-green-600 font-semibold">{member.degree}</p>
                    </div>
                  </div>
                  {member.award && (
                    <div className="bg-green-50 border-l-4 border-green-600 p-3 mb-4">
                      <p className="text-sm text-green-700 font-medium">{member.award}</p>
                    </div>
                  )}
                  <p className="text-gray-600 leading-relaxed">{member.description}</p>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="font-semibold text-lg">CogBio<span className="text-green-400">AV</span> Lab</p>
              <p className="text-gray-400 text-sm mt-1">University of Barishal</p>
            </div>
            <div className="text-gray-400 text-sm">
              <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
