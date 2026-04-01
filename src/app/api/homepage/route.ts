import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Homepage from '@/models/Homepage';

// GET - Fetch homepage content (create default if not exists)
export async function GET() {
  try {
    await connectDB();
    
    let homepage = await Homepage.findOne();
    
    // If no homepage exists, create one with defaults
    if (!homepage) {
      homepage = await Homepage.create({});
    }
    
    return NextResponse.json({ success: true, data: homepage });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT - Update homepage content
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    let homepage = await Homepage.findOne();
    
    if (!homepage) {
      homepage = await Homepage.create(body);
    } else {
      homepage = await Homepage.findOneAndUpdate({}, body, { new: true });
    }
    
    return NextResponse.json({ success: true, data: homepage });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
