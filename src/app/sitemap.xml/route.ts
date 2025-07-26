import { NextResponse } from 'next/server';
import Project from '@/models/Project';  // Make sure this is correct

export async function GET() {
  const projects = await Project.find({}).lean();

  const urls = projects.map((project) => `
    <url>
      <loc>${process.env.NEXT_PUBLIC_SITE_URL}/projects/${project.slug}</loc>
      <lastmod>${project.updatedAt.toISOString()}</lastmod>
    </url>
  `).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
