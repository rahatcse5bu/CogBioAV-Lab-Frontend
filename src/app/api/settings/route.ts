import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Settings from '@/models/Settings';

export async function GET() {
  try {
    await connectDB();
    const settings = await Settings.find();
    const settingsObj: Record<string, any> = {};
    settings.forEach((s: any) => {
      // Try to parse JSON values (like socialLinks array)
      try {
        settingsObj[s.key] = JSON.parse(s.value);
      } catch {
        settingsObj[s.key] = s.value;
      }
    });
    return NextResponse.json({ success: true, data: settingsObj });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { key, value } = body;
    
    // Stringify objects/arrays before saving
    const valueToSave = typeof value === 'object' ? JSON.stringify(value) : value;
    
    const setting = await Settings.findOneAndUpdate(
      { key },
      { key, value: valueToSave },
      { upsert: true, new: true }
    );
    
    return NextResponse.json({ success: true, data: setting }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
