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
      {
        protocol: 'https',
        hostname: 'www.styrcon.sk',
        port: '',
        pathname: '/obchod_homedir/**',
      },
    ],
  },
};

export default nextConfig;
