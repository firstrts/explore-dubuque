import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // CMS-only Next.js app — just the admin panel
}

export default withPayload(nextConfig)
