/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ldgiqdejtmcecnybswit.supabase.co'],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ fully skip ESLint errors in Vercel
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ optional: skip TS errors too (if needed)
  },
};

module.exports = nextConfig;
