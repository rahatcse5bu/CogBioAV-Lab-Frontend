import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizePrismaPayload, toClientDoc } from '@/lib/db-mappers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const publication = await prisma.publication.findUnique({ where: { id } });
    if (!publication) {
      return NextResponse.json({ success: false, error: 'Publication not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: toClientDoc(publication as any) });
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
    const payload = sanitizePrismaPayload(body);
    const publication = await prisma.publication.update({ where: { id }, data: payload as any });
    if (!publication) {
      return NextResponse.json({ success: false, error: 'Publication not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: toClientDoc(publication as any) });
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return NextResponse.json({ success: false, error: 'Publication not found' }, { status: 404 });
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
    const publication = await prisma.publication.findUnique({ where: { id } });
    if (!publication) {
      return NextResponse.json({ success: false, error: 'Publication not found' }, { status: 404 });
    }
    await prisma.publication.delete({ where: { id } });
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
