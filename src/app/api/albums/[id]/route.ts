import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Album from '@/models/Album';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const album = await Album.findById(id);
    if (!album) {
      return NextResponse.json({ success: false, error: 'Album not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: album });
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
    const album = await Album.findByIdAndUpdate(id, body, { new: true });
    if (!album) {
      return NextResponse.json({ success: false, error: 'Album not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: album });
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
    const album = await Album.findByIdAndDelete(id);
    if (!album) {
      return NextResponse.json({ success: false, error: 'Album not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
