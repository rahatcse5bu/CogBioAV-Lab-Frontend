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
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-black overflow-hidden pt-24 sm:pt-32 md:pt-40">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyan-500/15 via-transparent to-transparent"></div>
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
          <div className="text-center">
            <p className="text-blue-300 text-sm font-medium tracking-widest uppercase mb-3">Meet Our Team</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              Lab Members
            </h1>
            <div className="mt-4 w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
            <p className="text-slate-300 text-base sm:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
              Dedicated researchers and collaborators advancing the frontiers of cognitive and biological audiovisual science
            </p>
          </div>
        </div>

        {/* Bottom wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z" fill="#f8fafc" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
        <MembersContent
          principalInvestigator={principalInvestigator}
          currentMembers={currentMembers}
          technicalCollaborators={technicalCollaborators}
          alumni={alumni}
          collaborators={collaborators}
        />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16 sm:mt-20 md:mt-24 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
            <div>
              <p className="font-semibold text-base sm:text-lg"><BrandName /></p>
              <p className="text-slate-400 text-sm mt-1">University of Barishal</p>
            </div>
            <div className="text-slate-400 text-sm">
              <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
