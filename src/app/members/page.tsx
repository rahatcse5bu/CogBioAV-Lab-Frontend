import Navigation from '@/components/Navigation';
import BrandName from '@/components/BrandName';
import { connectDB } from '@/lib/mongodb';
import Member from '@/models/Member';
import MembersContent from './members-content';

export const dynamic = 'force-dynamic';

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
  const technicalCollaborators = allMembers.filter((member) => member.type === 'technical_collaborators');
  const alumni = allMembers.filter((member) => member.type === 'alumni' || member.status === 'graduated');
  const collaborators = allMembers.filter((member) => member.type === 'collaborator');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-black overflow-hidden pt-24 sm:pt-32 md:pt-40">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-0 top-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute right-0 bottom-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20 md:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Lab Members</h1>
            <p className="text-gray-300 text-xs sm:text-sm">Our research team</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-10 md:py-12">
        <MembersContent
          principalInvestigator={principalInvestigator}
          currentMembers={currentMembers}
          technicalCollaborators={technicalCollaborators}
          alumni={alumni}
          collaborators={collaborators}
        />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 sm:mt-16 md:mt-20">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="mb-3 sm:mb-4 md:mb-0">
              <p className="font-semibold text-base sm:text-lg"><BrandName /></p>
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
