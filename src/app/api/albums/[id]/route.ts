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
    const payload = sanitizePrismaPayload(body, ['date']);
    const albumDate = parseOptionalDate(body.date);
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
