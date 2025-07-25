import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  return new NextResponse(
    `User-agent: *
Allow: /

Sitemap: https://www.mahafujahamed.me/sitemap.xml`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
}
