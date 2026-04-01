import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const user = await User.findById(id).select('-password').populate('memberId', 'name email');
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: user });
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

    const updateData: any = {
      name: body.name,
      role: body.role,
      memberId: body.memberId || null,
      isActive: body.isActive,
    };

    // Only update email if changed and not duplicate
    if (body.email) {
      const existingUser = await User.findOne({ email: body.email.toLowerCase(), _id: { $ne: id } });
      if (existingUser) {
        return NextResponse.json({ success: false, error: 'Email already exists' }, { status: 400 });
      }
      updateData.email = body.email.toLowerCase();
    }

    // Only update password if provided
    if (body.password && body.password.trim() !== '') {
      const user = await User.findById(id);
      if (user) {
        user.password = body.password;
        await user.save(); // This will hash the password
      }
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: user });
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
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
