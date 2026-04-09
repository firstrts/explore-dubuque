import { CollectionConfig } from 'payload'

export const Listings: CollectionConfig = {
  slug: 'listings',

  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    defaultColumns: ['name', 'category', 'neighborhood', 'tier', 'status'],
    listSearchableFields: ['name', 'description'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    // ── Core Info ──────────────────────────────────────
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
        description: 'Auto-generated from name; used in URLs',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'photos',
      type: 'array',
      label: 'Photos',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },

    // ── Taxonomy ───────────────────────────────────────
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      hasMany: false,
    },
    {
      name: 'subcategory',
      type: 'text',
      admin: {
        description: 'Optional freeform subcategory label',
      },
    },
    {
      name: 'neighborhood',
      type: 'relationship',
      relationTo: 'neighborhoods',
      hasMany: false,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'select',
          options: [
            'Dog-Friendly',
            'Family-Friendly',
            'Outdoor Seating',
            'Wheelchair Accessible',
            'Live Music',
            'Happy Hour',
            'Waterfront',
            'Historic',
            'Locally Owned',
            'LGBTQ+ Friendly',
            'Late Night',
            'Reservation Required',
          ],
        },
      ],
    },

    // ── Contact & Location ─────────────────────────────
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'city',
      type: 'text',
      defaultValue: 'Dubuque',
    },
    {
      name: 'state',
      type: 'text',
      defaultValue: 'IA',
    },
    {
      name: 'zip',
      type: 'text',
    },
    {
      name: 'lat',
      type: 'number',
      label: 'Latitude',
    },
    {
      name: 'lng',
      type: 'number',
      label: 'Longitude',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
    },

    // ── Hours ──────────────────────────────────────────
    {
      name: 'hours',
      type: 'array',
      label: 'Business Hours',
      fields: [
        {
          name: 'day',
          type: 'select',
          required: true,
          options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        },
        {
          name: 'open',
          type: 'text',
          label: 'Open (e.g. 9:00 AM)',
        },
        {
          name: 'close',
          type: 'text',
          label: 'Close (e.g. 9:00 PM)',
        },
        {
          name: 'closed',
          type: 'checkbox',
          label: 'Closed this day',
        },
      ],
    },

    // ── Social Media ───────────────────────────────────
    {
      name: 'social',
      type: 'group',
      label: 'Social Media Links',
      fields: [
        { name: 'facebook', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'twitter', type: 'text' },
        { name: 'tiktok', type: 'text' },
        { name: 'youtube', type: 'text' },
      ],
    },

    // ── Monetization ───────────────────────────────────
    {
      name: 'tier',
      type: 'select',
      defaultValue: 'basic',
      required: true,
      options: [
        { label: 'Basic (Free)', value: 'basic' },
        { label: 'Featured ($29/mo)', value: 'featured' },
        { label: 'Premium ($79/mo)', value: 'premium' },
        { label: 'Sponsor (Custom)', value: 'sponsor' },
      ],
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Show as Featured',
      defaultValue: false,
    },

    // ── SEO ────────────────────────────────────────────
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: { description: 'Defaults to listing name if blank' },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
        },
      ],
    },

    // ── Status ─────────────────────────────────────────
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      required: true,
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
