import { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',

  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Taxonomy',
    defaultColumns: ['name', 'slug', 'icon'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-safe identifier, e.g. "dining-drinks"',
      },
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Lucide icon name, e.g. "UtensilsCrossed"',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Lower number = appears first',
      },
    },
  ],
}
