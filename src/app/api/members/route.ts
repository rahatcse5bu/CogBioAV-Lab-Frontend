import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseOptionalDate, sanitizePrismaPayload, toClientDoc } from '@/lib/db-mappers';

export async function GET() {
  try {
    const members = await prisma.member.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: members.map(toClientDoc) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = sanitizePrismaPayload(body);
    const joinDate = parseOptionalDate(payload.joinDate);
    const graduationDate = parseOptionalDate(payload.graduationDate);

    const member = await prisma.member.create({
      data: {
        ...payload,
        researchInterests: body.researchInterests ?? [],
        education: body.education ?? [],
        experience: body.experience ?? [],
        selectedPublications: body.selectedPublications ?? [],
        awards: body.awards ?? [],
        skills: body.skills ?? [],
        courses: body.courses ?? [],
        joinDate: joinDate ?? undefined,
        graduationDate: graduationDate ?? undefined,
      } as any,
    });
    return NextResponse.json({ success: true, data: toClientDoc(member) }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
