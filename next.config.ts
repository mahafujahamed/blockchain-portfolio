// next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Disable ESLint on build errors (good for Vercel deploy)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
