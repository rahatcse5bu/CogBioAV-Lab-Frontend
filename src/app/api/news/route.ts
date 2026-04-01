import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import News from '@/models/News';

export async function GET() {
  try {
    await connectDB();
    const news = await News.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: news });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const news = await News.create(body);
    return NextResponse.json({ success: true, data: news }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
