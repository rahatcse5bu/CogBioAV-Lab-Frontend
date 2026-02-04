import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Publication from '@/models/Publication';

export async function GET() {
  try {
    await connectDB();
    const publications = await Publication.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: publications });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const publication = await Publication.create(body);
    return NextResponse.json({ success: true, data: publication }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
