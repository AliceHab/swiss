import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['reqres.in'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
