import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const PUBLIC_PATHS = ['/admin/login']

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  const isPublicPath = PUBLIC_PATHS.includes(new URL(request.url).pathname)

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
      await jwtVerify(token, secret)
      return NextResponse.next()
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
