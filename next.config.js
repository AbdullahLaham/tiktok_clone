/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    customKey: 'my-value',
    base_url: 'https://tiktok-clone-sepia.vercel.app/',
  },
  images: {
    domains: ['yth3.ggpht.com', 'lh3.googleusercontent.com'],

  }
  }


module.exports = nextConfig
