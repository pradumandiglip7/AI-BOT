import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import connectDB from "@/lib/db";
import { generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectDB();

    // Get Telegram auth data from request
    const body = await request.json();
    const { id, first_name, last_name, username, photo_url, auth_date, hash } = body;

    // Verify the authenticity of the data using Telegram Bot API
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    
    if (!telegramBotToken) {
      return Response.json(
        { success: false, message: "Telegram bot token not configured" },
        { status: 500 }
      );
    }

    // Prepare data for verification (excluding the hash)
    const dataToCheck = [
      `auth_date=${auth_date}`,
      `first_name=${first_name}`,
      `id=${id}`,
      `last_name=${last_name || ''}`,
      `photo_url=${photo_url || ''}`,
      `username=${username || ''}`,
    ].filter(Boolean).join('\n');

    // Create HMAC-SHA256 hash using crypto
    const { createHmac } = await import('node:crypto');
    const secretKey = createHmac('sha256', 'WebAppData').update(telegramBotToken).digest();
    const calculatedHash = createHmac('sha256', secretKey).update(dataToCheck).digest('hex');

    // Verify the hash
    if (calculatedHash !== hash.toLowerCase()) {
      return Response.json(
        { success: false, message: "Invalid Telegram auth data" },
        { status: 401 }
      );
    }

    // Create or update user
    const fullName = `${first_name}${last_name ? ' ' + last_name : ''}`;
    const email = `${id}@telegram-user`; // Create a unique identifier email
    
    let user = await User.findOne({ telegramId: id });

    if (user) {
      // Update existing user
      user.fullName = fullName;
      user.avatar = photo_url;
      await user.save();
    } else {
      // Create new user
      user = new User({
        fullName,
        email,
        telegramId: id,
        avatar: photo_url,
        isVerified: true, // Telegram users are verified through the platform
      });
      await user.save();
    }

    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Return user data
    const userData = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
    };

    return Response.json({
      success: true,
      data: {
        user: userData,
        token,
      },
    });
  } catch (err) {
    console.error("Telegram auth error:", err);
    return Response.json(
      { success: false, message: "Internal server error during Telegram authentication" },
      { status: 500 }
    );
  }
}