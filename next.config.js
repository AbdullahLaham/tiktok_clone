/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    customKey: 'my-value',
    base_url: 'http://localhost:3001/',
  },
  images: {
    domains: ['yth3.ggpht.com', 'lh3.googleusercontent.com'],

  }
  }


module.exports = nextConfig
