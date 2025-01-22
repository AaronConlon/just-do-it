/** @type {import('next').NextConfig} */
const nextConfig = {
  // image config
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'de4965e.webp.li',
      },
    ],
  },
}

export default nextConfig
