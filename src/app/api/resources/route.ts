import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizePrismaPayload, toClientDoc } from '@/lib/db-mappers';

export async function GET() {
  try {
    const resources = await prisma.resource.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: resources.map(toClientDoc as any) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = sanitizePrismaPayload(body);
    const resource = await prisma.resource.create({ data: payload as any });
    return NextResponse.json({ success: true, data: toClientDoc(resource as any) }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
