import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const payload = verifyAuthToken(request);
    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Check if user has admin role
    // if (payload.role !== 'admin') {
    //   return NextResponse.json(
    //     { success: false, message: 'Access denied. Admin role required.' },
    //     { status: 403 }
    //   );
    // }

    await dbConnect();

    // Fetch all users excluding password field
    const users = await User.find({}).select('-password -googleRefreshToken');
    
    // Prepare users data for response
    const usersData = users.map(user => ({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      googleId: user.googleId,
      telegramId: user.telegramId,
      avatar: user.avatar,
      phone: user.phone,
      timezone: user.timezone,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLoginAt: user.lastLoginAt,
    }));

    return NextResponse.json(
      {
        success: true,
        data: { 
          users: usersData,
          count: usersData.length
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get all users error:', error);
    
    return NextResponse.json(
      { success: false, message: 'An error occurred while fetching users' },
      { status: 500 }
    );
  }
}