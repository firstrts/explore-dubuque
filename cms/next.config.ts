import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Separate CMS assets from frontend assets so Nginx can route them
  assetPrefix: '/_cms',
}

export default withPayload(nextConfig)
