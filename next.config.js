/** @type {import('next').NextConfig} */
const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");


const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.media-amazon.com',
          port: '',
        },
      ],
      
    },
  },
}

module.exports = nextConfig
