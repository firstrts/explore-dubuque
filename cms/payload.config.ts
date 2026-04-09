import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Categories } from './src/collections/Categories'
import { Neighborhoods } from './src/collections/Neighborhoods'
import { Listings } from './src/collections/Listings'
import { Events } from './src/collections/Events'
import { Articles } from './src/collections/Articles'
import { Advertisements } from './src/collections/Advertisements'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Explore Dubuque CMS',
    },
  },
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
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: true,
  }),
  upload: {
    limits: {
      fileSize: 10_000_000,
    },
  },
  cors: (process.env.CORS_URLS || '').split(',').filter(Boolean),
  csrf: (process.env.CORS_URLS || '').split(',').filter(Boolean),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
})
