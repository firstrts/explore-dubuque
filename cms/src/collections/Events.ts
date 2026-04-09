import { CollectionConfig } from 'payload/types'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'startDate', 'category', 'status'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },

    // ── Dates ──────────────────────────────────────────
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Leave blank for single-day events',
      },
    },
    {
      name: 'isRecurring',
      type: 'checkbox',
      label: 'Recurring Event',
      defaultValue: false,
    },
    {
      name: 'recurrenceRule',
      type: 'text',
      label: 'Recurrence (e.g. "Every Friday", "First Saturday of month")',
      admin: {
        condition: (_, siblingData) => siblingData?.isRecurring,
      },
    },

    // ── Taxonomy ───────────────────────────────────────
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
    },
    {
      name: 'neighborhood',
      type: 'relationship',
      relationTo: 'neighborhoods',
      hasMany: false,
    },

    // ── Links ──────────────────────────────────────────
    {
      name: 'linkedListing',
      type: 'relationship',
      relationTo: 'listings',
      hasMany: false,
      label: 'Associated Listing (optional)',
    },
    {
      name: 'ticketUrl',
      type: 'text',
      label: 'Ticket / Info URL (links out — no on-site ticketing)',
    },

    // ── Location override ──────────────────────────────
    {
      name: 'locationOverride',
      type: 'text',
      label: 'Location (if different from linked listing)',
      admin: {
        description: 'E.g. "Alliant Energy Amphitheater, Dubuque IA"',
      },
    },

    // ── Submission ─────────────────────────────────────
    {
      name: 'submittedBy',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      required: true,
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Pending Approval', value: 'pending' },
        { label: 'Draft', value: 'draft' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
