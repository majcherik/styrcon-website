import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.e-ma.sk',
        port: '',
        pathname: '/imgcache/**',
      },
    ],
  },
};

export default nextConfig;
