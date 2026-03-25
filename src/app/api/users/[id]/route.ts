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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id },
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
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: mapUser(user) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updateData: Record<string, any> = {
      name: body.name,
      role: body.role,
      memberId: body.memberId || null,
      isActive: body.isActive,
    };

    // Only update email if changed and not duplicate
    if (body.email) {
      const email = String(body.email).toLowerCase();
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
          NOT: { id },
        },
      });
      if (existingUser) {
        return NextResponse.json({ success: false, error: 'Email already exists' }, { status: 400 });
      }
      updateData.email = email;
    }

    // Only update password if provided
    if (body.password && body.password.trim() !== '') {
      updateData.password = await bcrypt.hash(body.password, 12);
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
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
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: mapUser(user) });
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
