import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseOptionalDate, sanitizePrismaPayload, toClientDoc } from '@/lib/db-mappers';

export async function GET() {
  try {
    const albums = await prisma.photoAlbum.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
    return NextResponse.json({ success: true, data: albums.map(toClientDoc as any) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = sanitizePrismaPayload(body);
    const albumDate = parseOptionalDate(payload.date);
    const album = await prisma.photoAlbum.create({
      data: {
        ...payload,
        photos: body.photos ?? [],
        date: albumDate ?? undefined,
      } as any,
    });
    return NextResponse.json({ success: true, data: toClientDoc(album as any) }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
