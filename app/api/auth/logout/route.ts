import { NextResponse } from 'next/server';

export async function POST() {
  // Clear the auth cookie
  const clearCookie = `authToken=; HttpOnly; Path=/; Max-Age=0; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''} SameSite=Strict`;

  const response = NextResponse.json({ success: true, message: 'Logged out' }, { status: 200 });
  response.headers.set('Set-Cookie', clearCookie);
  return response;
}
