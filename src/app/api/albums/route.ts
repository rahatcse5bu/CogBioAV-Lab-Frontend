import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Album from '@/models/Album';

export async function GET() {
  try {
    await connectDB();
    const albums = await Album.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: albums });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const album = await Album.create(body);
    return NextResponse.json({ success: true, data: album }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
