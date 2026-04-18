import Navigation from '@/components/Navigation';
import PageHero from '@/components/PageHero';
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

      <PageHero
        eyebrow="Meet Our Team"
        title="Lab Members"
        description="Dedicated researchers and collaborators advancing the frontiers of cognitive and biological audiovisual science"
      />

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
