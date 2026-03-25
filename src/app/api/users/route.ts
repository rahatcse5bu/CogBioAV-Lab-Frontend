import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

function mapUser(user: any) {
  return {
    _id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    memberId: user.member
      ? {
          _id: user.member.id,
          name: user.member.name,
          email: user.member.email,
        }
      : null,
    isActive: user.isActive,
    lastLogin: user.lastLogin,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        member: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: users.map(mapUser) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email || '').toLowerCase();
    
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ success: false, error: 'Email already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(String(body.password || ''), 12);
    const user = await prisma.user.create({
      data: {
      email,
      password: hashedPassword,
      name: body.name,
      role: body.role || 'member',
      memberId: body.memberId || null,
      isActive: body.isActive ?? true,
      },
      include: {
        member: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: mapUser(user) }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
