import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Project from '@/models/Project'; // ✅ default import


export const runtime = 'edge';

export async function GET() {
  await connectDB();
  const projects = await Project.find();

  const urls = projects.map((proj) => `
    <url>
      <loc>https://www.mahafujahamed.me/projects/${proj.slug}</loc>
      <changefreq>monthly</changefreq>
    </url>
  `).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.mahafujahamed.me/</loc>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://www.mahafujahamed.me/projects</loc>
    <changefreq>weekly</changefreq>
  </url>
  ${urls}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
