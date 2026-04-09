import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // No assetPrefix needed — Nginx tries CMS first for /_next/, falls back to frontend
}

export default withPayload(nextConfig)
