import { CollectionConfig } from 'payload'

export const Advertisements: CollectionConfig = {
  slug: 'advertisements',

  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Monetization',
    defaultColumns: ['name', 'zone', 'type', 'isActive'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal label, e.g. "Homepage Banner — June 2026"',
      },
    },
    {
      name: 'zone',
      type: 'select',
      required: true,
      options: [
        { label: 'Homepage — Hero', value: 'homepage-hero' },
        { label: 'Homepage — Mid', value: 'homepage-mid' },
        { label: 'Category Page — Top', value: 'category-top' },
        { label: 'Category Page — Sidebar', value: 'category-sidebar' },
        { label: 'Listing Page — Sidebar', value: 'listing-sidebar' },
        { label: 'Events Page', value: 'events' },
      ],
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Google AdSense (auto)', value: 'adsense' },
        { label: 'Direct Ad (image)', value: 'direct-image' },
        { label: 'Direct Ad (HTML)', value: 'direct-html' },
      ],
    },
    {
      name: 'adSenseSlot',
      type: 'text',
      label: 'AdSense Ad Slot ID',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'adsense',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'direct-image',
      },
    },
    {
      name: 'linkUrl',
      type: 'text',
      label: 'Click-through URL',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'direct-image',
      },
    },
    {
      name: 'htmlCode',
      type: 'code',
      label: 'HTML Ad Code',
      admin: {
        language: 'html',
        condition: (_, siblingData) => siblingData?.type === 'direct-html',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Active',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Leave blank to show immediately',
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Leave blank to run indefinitely',
      },
    },
  ],
}
