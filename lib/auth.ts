import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export const JWT_SECRET = process.env.JWT_SECRET || '';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export function generateToken(payload: JWTPayload): string {
  if (!JWT_SECRET) {
    throw new Error('Please define the JWT_SECRET environment variable inside .env.local');
  }
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d', // Token expires in 7 days
  });
}

export function verifyToken(token: string): JWTPayload | null {
  if (!JWT_SECRET) {
    throw new Error('Please define the JWT_SECRET environment variable inside .env.local');
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function getTokenFromHeader(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  return null;
}

export function getTokenFromCookies(request: NextRequest): string | null {
  const cookieHeader = request.headers.get('cookie') || '';
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').map(c => c.trim());
  const authCookie = cookies.find(c => c.startsWith('authToken='));
  if (!authCookie) return null;

  const token = authCookie.split('=')[1];
  return token ? decodeURIComponent(token) : null;
}

export function verifyAuthToken(request: NextRequest): JWTPayload | null {
  const headerToken = getTokenFromHeader(request);
  const cookieToken = getTokenFromCookies(request);
  const token = headerToken || cookieToken;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}
