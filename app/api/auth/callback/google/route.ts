"use server";

import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import connectDB from "@/lib/db";
import { generateToken, JWT_SECRET } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  if (process.env.NODE_ENV !== 'production') console.debug("Google OAuth callback:", { code, error, searchParams });

  // Handle OAuth error
  if (error) {
    const errorDescription = searchParams.get("error_description") || "OAuth error occurred";
    console.error(`Google OAuth error: ${error}`, errorDescription);
    
    // Redirect back to login with error
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("oauth_error", errorDescription);
    return Response.redirect(redirectUrl);
  }

  // Handle missing code
  if (!code) {
    console.error("Missing authorization code from Google OAuth");
    
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("oauth_error", "Missing authorization code");
    return Response.redirect(redirectUrl);
  }

  // Validate state to protect against CSRF
  const stateFromQuery = searchParams.get('state');
  const cookieStore = await cookies();
  const storedState = cookieStore.get('oauth_state')?.value;
  
  if (!stateFromQuery || !storedState || stateFromQuery !== storedState) {
    console.error('Invalid or missing OAuth state', { stateFromQuery, storedState });
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('oauth_error', 'Invalid OAuth state');

    // Clear the stored state cookie
    const clearState = `oauth_state=; Path=/; Max-Age=0; ${process.env.NODE_ENV === 'production' ? 'Secure; SameSite=None' : 'SameSite=Lax'}`;

    return new Response(null, {
      status: 302,
      headers: [
        ['Location', redirectUrl.toString()],
        ['Set-Cookie', clearState],
      ],
    });
  }

  try {
    // Connect to database
    await connectDB();

    // Exchange authorization code for access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: `${request.nextUrl.origin}/api/auth/callback/google`,
      }),
    });
    if (process.env.NODE_ENV !== 'production') console.debug("Token response:", tokenResponse.status, tokenResponse.statusText);
    if (!tokenResponse.ok) {
      const tokenError = await tokenResponse.text();
      console.error("Failed to exchange code for token:", tokenError);
      
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("oauth_error", "Failed to authenticate with Google");
      return Response.redirect(redirectUrl);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Get user info from Google
    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!userInfoResponse.ok) {
      const userInfoError = await userInfoResponse.text();
      console.error("Failed to get user info from Google:", userInfoError);
      
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("oauth_error", "Failed to get user info from Google");
      return Response.redirect(redirectUrl);
    }

    const userInfo = await userInfoResponse.json();
    if (process.env.NODE_ENV !== 'production') console.debug("User info:", userInfo);

    // Check if user already exists
    let user = await User.findOne({ email: userInfo.email });

    const emailVerified = !!(userInfo.verified_email || userInfo.email_verified);

    if (user) {
      // Update user with Google profile info if needed
      user.googleId = userInfo.id;
      user.fullName = userInfo.name || userInfo.email.split("@")[0];
      user.avatar = userInfo.picture;
      if (emailVerified) user.isVerified = true;

      // Persist refresh token if provided (store server-side)
      if (tokenData.refresh_token) {
        (user as any).googleRefreshToken = tokenData.refresh_token;
      }

      await user.save();
    } else {
      // Create new user
      const newUserData: any = {
        fullName: userInfo.name || userInfo.email.split("@")[0],
        email: userInfo.email,
        googleId: userInfo.id,
        avatar: userInfo.picture,
        // No password for Google auth users
        isVerified: emailVerified,
      };

      if (tokenData.refresh_token) newUserData.googleRefreshToken = tokenData.refresh_token;

      user = new User(newUserData);
      await user.save();
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

    // Create response that sets the auth cookie (HttpOnly) and clears oauth_state cookie, then redirects
    const authCookie = `authToken=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''} ${process.env.NODE_ENV === 'production' ? 'SameSite=None' : 'SameSite=Lax'}`;
    const clearStateCookie = `oauth_state=; Path=/; Max-Age=0; ${process.env.NODE_ENV === 'production' ? 'Secure; SameSite=None' : 'SameSite=Lax'}`;

    return new Response(null, {
      status: 302,
      headers: [
        ['Location', '/dashboard'],
        ['Set-Cookie', authCookie],
        ['Set-Cookie', clearStateCookie],
      ],
    });
  } catch (err) {
    console.error("Google OAuth error:", err);
    
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("oauth_error", "Internal server error during Google authentication");
    return Response.redirect(redirectUrl);
  }
}
