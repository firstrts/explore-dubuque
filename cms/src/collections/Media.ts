import { CollectionConfig } from 'payload/types'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Content',
  },
  upload: {
    // Cloudinary plugin handles actual storage.
    // These are fallback local settings for dev.
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      { name: 'card', width: 800, height: 450, position: 'centre' },
      { name: 'hero', width: 1600, height: 900, position: 'centre' },
      { name: 'thumb', width: 400, height: 225, position: 'centre' },
    ],
    adminThumbnail: 'thumb',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
    },
    {
      name: 'credit',
      type: 'text',
      label: 'Photo Credit (e.g. "Photo by John Doe on Unsplash")',
    },
  ],
}
