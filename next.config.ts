import type { NextConfig } from 'next'

const {
  REMOTE_PATTERN_HOSTNAME,
  REMOTE_PATTERN_PORT,
  REMOTE_PATTERN_PROTOCOL,
} = process.env

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: REMOTE_PATTERN_PROTOCOL as 'http' | 'https',
        hostname: REMOTE_PATTERN_HOSTNAME!,
        ...(REMOTE_PATTERN_PORT ? { port: REMOTE_PATTERN_PORT } : {}),
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
