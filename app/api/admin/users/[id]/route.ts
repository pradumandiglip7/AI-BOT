import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';

// DELETE /api/admin/users/[id] - Delete a user by ID (admin only)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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
    if (payload.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Access denied. Admin role required.' },
        { status: 403 }
      );
    }

    await dbConnect();

    const userId = params.id;

    // Prevent admin from deleting themselves
    if (userId === payload.userId) {
      return NextResponse.json(
        { success: false, message: 'You cannot delete your own account.' },
        { status: 400 }
      );
    }

    // Find and delete the user
    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    await User.findByIdAndDelete(userId);

    return NextResponse.json(
      { 
        success: true, 
        message: 'User deleted successfully' 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete user error:', error);
    
    return NextResponse.json(
      { success: false, message: 'An error occurred while deleting the user' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/users/[id] - Update user details (admin only)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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
    if (payload.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Access denied. Admin role required.' },
        { status: 403 }
      );
    }

    await dbConnect();

    const userId = params.id;
    const body = await request.json();

    // Find the user to update
    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Update allowed fields
    const allowedUpdates: Record<string, any> = {};
    
    if (body.role && ['trader', 'admin'].includes(body.role)) {
      allowedUpdates.role = body.role;
    }
    
    if (typeof body.isVerified === 'boolean') {
      allowedUpdates.isVerified = body.isVerified;
    }
    
    if (typeof body.email === 'string') {
      // Validate email format
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(body.email)) {
        return NextResponse.json(
          { success: false, message: 'Please provide a valid email' },
          { status: 400 }
        );
      }
      
      // Check if email is already in use by another user
      const existingUser = await User.findOne({ 
        email: body.email.toLowerCase(), 
        _id: { $ne: userId } 
      });
      
      if (existingUser) {
        return NextResponse.json(
          { success: false, message: 'Email already in use by another user' },
          { status: 409 }
        );
      }
      
      allowedUpdates.email = body.email.toLowerCase();
    }
    
    if (typeof body.fullName === 'string' && body.fullName.trim().length > 0) {
      allowedUpdates.fullName = body.fullName.trim().slice(0, 100);
    }
    
    if (body.phone !== undefined) {
      allowedUpdates.phone = body.phone ? body.phone.trim().slice(0, 30) : null;
    }
    
    if (body.timezone !== undefined) {
      allowedUpdates.timezone = body.timezone ? body.timezone.trim().slice(0, 50) : null;
    }

    // Prevent updating sensitive fields
    if (allowedUpdates.password) {
      delete allowedUpdates.password;
    }
    if (allowedUpdates.googleId) {
      delete allowedUpdates.googleId;
    }
    if (allowedUpdates.telegramId) {
      delete allowedUpdates.telegramId;
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: allowedUpdates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Return updated user data (excluding sensitive fields)
    const userData = {
      id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      role: updatedUser.role,
      avatar: updatedUser.avatar,
      phone: updatedUser.phone,
      timezone: updatedUser.timezone,
      isVerified: updatedUser.isVerified,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };

    return NextResponse.json(
      { 
        success: true, 
        message: 'User updated successfully',
        data: { user: userData }
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update user error:', error);
    
    return NextResponse.json(
      { success: false, message: 'An error occurred while updating the user' },
      { status: 500 }
    );
  }
}