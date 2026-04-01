import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizePrismaPayload, toClientDoc } from '@/lib/db-mappers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const news = await prisma.news.findUnique({ where: { id } });
    if (!news) {
      return NextResponse.json({ success: false, error: 'News not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: toClientDoc(news as any) });
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
    const news = await prisma.news.update({ where: { id }, data: payload });
    if (!news) {
      return NextResponse.json({ success: false, error: 'News not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: toClientDoc(news as any) });
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return NextResponse.json({ success: false, error: 'News not found' }, { status: 404 });
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
    const existing = await prisma.news.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'News not found' }, { status: 404 });
    }
    await prisma.news.delete({ where: { id } });
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
