import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email and include password field
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);
    
    if (!isPasswordMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Return user data without password
    const userData = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
    };

    // Set HttpOnly cookie and return response
    const cookieValue = `authToken=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''} SameSite=Strict`;

    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        data: {
          user: userData,
          token,
        },
      },
      { status: 200 }
    );

    response.headers.set('Set-Cookie', cookieValue);
    return response;
  } catch (error: any) {
    console.error('Login error:', error);

    return NextResponse.json(
      { success: false, message: 'An error occurred during login. Please try again.' },
      { status: 500 }
    );
  }
}
