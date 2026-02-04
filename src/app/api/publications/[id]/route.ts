import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Publication from '@/models/Publication';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const publication = await Publication.findById(id);
    if (!publication) {
      return NextResponse.json({ success: false, error: 'Publication not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: publication });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const publication = await Publication.findByIdAndUpdate(id, body, { new: true });
    if (!publication) {
      return NextResponse.json({ success: false, error: 'Publication not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: publication });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const publication = await Publication.findByIdAndDelete(id);
    if (!publication) {
      return NextResponse.json({ success: false, error: 'Publication not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
