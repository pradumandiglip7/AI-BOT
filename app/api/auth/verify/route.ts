import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    // Verify token
    const payload = verifyAuthToken(request);
    
    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    await dbConnect();

    // Get user from database
    const user = await User.findById(payload.userId);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Return user data
    const userData = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      phone: (user as any).phone,
      timezone: (user as any).timezone,
      createdAt: user.createdAt,
    };

    return NextResponse.json(
      {
        success: true,
        data: { user: userData },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Verify token error:', error);

    return NextResponse.json(
      { success: false, message: 'An error occurred during token verification' },
      { status: 500 }
    );
  }
}
