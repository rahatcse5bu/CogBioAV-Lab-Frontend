import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();
    const users = await User.find().select('-password').populate('memberId', 'name email').sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Check if email already exists
    const existingUser = await User.findOne({ email: body.email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ success: false, error: 'Email already exists' }, { status: 400 });
    }

    const user = await User.create({
      email: body.email.toLowerCase(),
      password: body.password,
      name: body.name,
      role: body.role || 'member',
      memberId: body.memberId || null,
      isActive: body.isActive ?? true,
    });

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return NextResponse.json({ success: true, data: userWithoutPassword }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
