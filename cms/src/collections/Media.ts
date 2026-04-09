import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',

  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
  },
  upload: {
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
