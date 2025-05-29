import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebaseAdmin';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  const protectedPaths = ['/admin', '/admin/create', '/admin/edit'];

  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected) {
    try {
      await adminAuth.verifyIdToken(token!);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
