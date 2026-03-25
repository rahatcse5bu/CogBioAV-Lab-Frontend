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
    const sanitized = sanitizePrismaPayload(body, ['date', 'photos']);
    const { date: _date, photos: _photos, ...payload } = sanitized;
    const albumDate = parseOptionalDate(body.date);
    if (body.date !== undefined && albumDate === null) {
      return NextResponse.json(
        { success: false, error: 'Invalid date format. Use YYYY-MM-DD or ISO-8601 DateTime.' },
        { status: 400 }
      );
    }
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
