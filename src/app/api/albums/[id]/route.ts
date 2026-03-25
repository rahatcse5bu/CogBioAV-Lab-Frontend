import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseOptionalDate, sanitizePrismaPayload, toClientDoc } from '@/lib/db-mappers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const album = await prisma.photoAlbum.findUnique({ where: { id } });
    if (!album) {
      return NextResponse.json({ success: false, error: 'Album not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: toClientDoc(album as any) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
    const album = await prisma.photoAlbum.update({
      where: { id },
      data: {
        ...payload,
        photos: body.photos ?? undefined,
        date: albumDate ?? undefined,
      } as any,
    });
    if (!album) {
      return NextResponse.json({ success: false, error: 'Album not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: toClientDoc(album as any) });
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return NextResponse.json({ success: false, error: 'Album not found' }, { status: 404 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const album = await prisma.photoAlbum.findUnique({ where: { id } });
    if (!album) {
      return NextResponse.json({ success: false, error: 'Album not found' }, { status: 404 });
    }
    await prisma.photoAlbum.delete({ where: { id } });
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
