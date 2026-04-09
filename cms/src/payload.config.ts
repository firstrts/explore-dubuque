import { buildConfig } from 'payload/config'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import path from 'path'

import { Users } from './collections/Users'
import { Categories } from './collections/Categories'
import { Neighborhoods } from './collections/Neighborhoods'
import { Listings } from './collections/Listings'
import { Events } from './collections/Events'
import { Articles } from './collections/Articles'
import { Advertisements } from './collections/Advertisements'
import { Media } from './collections/Media'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '— Explore Dubuque CMS',
      favicon: '/favicon.ico',
    },
  },
  editor: lexicalEditor({}),
  collections: [
    Users,
    Media,
    Categories,
    Neighborhoods,
    Listings,
    Events,
    Articles,
    Advertisements,
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: (process.env.CORS_URLS || '').split(',').filter(Boolean),
  csrf: (process.env.CORS_URLS || '').split(',').filter(Boolean),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  upload: {
    limits: {
      fileSize: 10_000_000, // 10MB
    },
  },
})
