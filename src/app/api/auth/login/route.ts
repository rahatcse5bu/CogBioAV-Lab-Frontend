import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'cogbioav-lab-secret-key-2024';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body; // username can be email or admin username

    // Check for super admin (env variables) - default: admin / admin123
    const adminUser = process.env.ADMIN_USERNAME || 'admin';
    const adminPass = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (username === adminUser && password === adminPass) {
      const token = jwt.sign(
        { id: 'super-admin', email: adminUser, role: 'super_admin', name: 'Super Admin' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      const response = NextResponse.json({ 
        success: true, 
        user: { id: 'super-admin', email: adminUser, role: 'super_admin', name: 'Super Admin' }
      });
      
      response.cookies.set('admin_auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    }

    // Check database users (by email)
    await connectDB();
    const user = await User.findOne({ email: username.toLowerCase(), isActive: true });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, name: user.name, memberId: user.memberId },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const response = NextResponse.json({ 
      success: true, 
      user: { id: user._id, email: user.email, role: user.role, name: user.name, memberId: user.memberId }
    });
    
    response.cookies.set('admin_auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_auth')?.value;
    if (!token) {
      return NextResponse.json({ success: false, user: null });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return NextResponse.json({ 
      success: true, 
      user: { id: decoded.id, email: decoded.email, role: decoded.role, name: decoded.name, memberId: decoded.memberId }
    });
  } catch {
    return NextResponse.json({ success: false, user: null });
  }
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin_auth');
  return response;
}
