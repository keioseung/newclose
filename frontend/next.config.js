/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
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