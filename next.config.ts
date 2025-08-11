import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Ignore TypeScript errors in scripts directory during build
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '64.media.tumblr.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', '@heroicons/react'],
  },
  // Optimize for faster page transitions
  poweredByHeader: false,
};

export default nextConfig;
