import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.setting.findMany();
    const settingsObj: Record<string, any> = {};
    settings.forEach((s: { key: string; value: string }) => {
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
    const body = await request.json();
    const { key, value } = body;
    
    // Stringify objects/arrays before saving
    const valueToSave = typeof value === 'object' ? JSON.stringify(value) : value;
    
    const setting = await prisma.setting.upsert({
      where: { key },
      update: { value: valueToSave },
      create: { key, value: valueToSave },
    });
    
    return NextResponse.json({ success: true, data: setting }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
