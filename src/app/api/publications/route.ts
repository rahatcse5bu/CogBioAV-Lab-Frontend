import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizePrismaPayload, toClientDoc } from '@/lib/db-mappers';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    const publications = await prisma.publication.findMany({
      where: type ? { type } : undefined,
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: publications.map(toClientDoc as any) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = sanitizePrismaPayload(body);
    const publication = await prisma.publication.create({ data: payload as any });
    return NextResponse.json({ success: true, data: toClientDoc(publication as any) }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
