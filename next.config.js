/** @type {import('next').NextConfig} */
const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");


const nextConfig = {
  reactStrictMode: true,
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
