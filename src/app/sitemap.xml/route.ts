import { NextResponse } from "next/server";
import Project from "@/lib/models/Project";
import { connectDB } from "@/lib/mongoose";

export const runtime = "nodejs";

export async function GET() {
  await connectDB();
  const projects = await Project.find({}).lean();

  const urls = projects.map((proj) => {
    return `${process.env.NEXT_PUBLIC_SITE_URL}/projects/${proj.slug}`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map((url) => `
      <url>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>`).join("")}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
