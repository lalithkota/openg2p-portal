/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",

  images: {
    domains: ['spar.openg2p.my'], // Add the domain(s) from which to load images
    path: '/_next/image',
    loader: 'default',
  },
};

module.exports = nextConfig;
