import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  // Do NOT verify token here — verification happens server-side in API routes or page server code

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
