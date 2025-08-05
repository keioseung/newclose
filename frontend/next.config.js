/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: 'standalone',
  images: {
    domains: [
      'via.placeholder.com',
      'picsum.photos',
      'img.youtube.com',
      'www.instagram.com',
    ],
  },
}

module.exports = nextConfig 