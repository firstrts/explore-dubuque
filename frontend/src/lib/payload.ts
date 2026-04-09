/**
 * Payload CMS API client.
 * All fetches go through this module so we have one place to set headers,
 * handle revalidation, and handle errors.
 */

const CMS_URL = process.env.CMS_API_URL || 'http://localhost:3001/api'

type FetchOptions = {
  revalidate?: number | false
  tags?: string[]
}

async function payloadFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const res = await fetch(`${CMS_URL}${endpoint}`, {
    next: {
      revalidate: options.revalidate ?? 60,
      tags: options.tags,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error(`Payload fetch failed: ${res.status} ${res.statusText} — ${endpoint}`)
  }

  return res.json() as Promise<T>
}

// ── Types ──────────────────────────────────────────────────────────────────

export type Media = {
  id: string
  url: string
  alt: string
  credit?: string
  sizes?: {
    card?: { url: string }
    hero?: { url: string }
    thumb?: { url: string }
  }
}

export type Category = {
  id: string
  name: string
  slug: string
  icon?: string
  description?: string
  heroImage?: Media
  sortOrder?: number
}

export type Neighborhood = {
  id: string
  name: string
  slug: string
  description?: string
  heroImage?: Media
  lat?: number
  lng?: number
}

export type Listing = {
  id: string
  name: string
  slug: string
  description: string
  photos?: { image: Media }[]
  category: Category
  subcategory?: string
  neighborhood?: Neighborhood
  tags?: { tag: string }[]
  address?: string
  city: string
  state: string
  zip?: string
  lat?: number
  lng?: number
  phone?: string
  website?: string
  email?: string
  hours?: {
    day: string
    open?: string
    close?: string
    closed?: boolean
  }[]
  social?: {
    facebook?: string
    instagram?: string
    twitter?: string
    tiktok?: string
    youtube?: string
  }
  tier: 'basic' | 'featured' | 'premium' | 'sponsor'
  isFeatured: boolean
  status: 'published' | 'draft' | 'archived'
  seo?: { metaTitle?: string; metaDescription?: string }
}

export type Event = {
  id: string
  title: string
  slug: string
  description: unknown // Lexical rich text
  heroImage?: Media
  startDate: string
  endDate?: string
  isRecurring: boolean
  recurrenceRule?: string
  category?: Category
  neighborhood?: Neighborhood
  linkedListing?: Listing
  ticketUrl?: string
  locationOverride?: string
  status: 'published' | 'pending' | 'draft' | 'archived'
}

export type Article = {
  id: string
  title: string
  slug: string
  heroImage?: Media
  excerpt?: string
  body: unknown // Lexical rich text
  category?: Category
  tags?: { tag: string }[]
  isSponsored: boolean
  status: 'published' | 'draft' | 'archived'
}

type CollectionResponse<T> = {
  docs: T[]
  totalDocs: number
  totalPages: number
  page: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

// ── Query helpers ───────────────────────────────────────────────────────────

function qs(params: Record<string, string | number | boolean | undefined>) {
  const p = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) p.set(k, String(v))
  }
  return p.toString() ? `?${p.toString()}` : ''
}

// ── API calls ───────────────────────────────────────────────────────────────

export async function getCategories() {
  return payloadFetch<CollectionResponse<Category>>(
    `/categories${qs({ sort: 'sortOrder', limit: 20 })}`,
    { tags: ['categories'] }
  )
}

export async function getNeighborhoods() {
  return payloadFetch<CollectionResponse<Neighborhood>>(
    `/neighborhoods${qs({ sort: 'sortOrder', limit: 20 })}`,
    { tags: ['neighborhoods'] }
  )
}

export async function getListings(params?: {
  category?: string
  neighborhood?: string
  featured?: boolean
  limit?: number
  page?: number
}) {
  const query: Record<string, string | number | boolean | undefined> = {
    'where[status][equals]': 'published',
    limit: params?.limit ?? 12,
    page: params?.page ?? 1,
    depth: 1,
  }
  if (params?.category) query['where[category.slug][equals]'] = params.category
  if (params?.neighborhood) query['where[neighborhood.slug][equals]'] = params.neighborhood
  if (params?.featured) query['where[isFeatured][equals]'] = true

  return payloadFetch<CollectionResponse<Listing>>(
    `/listings${qs(query)}`,
    { tags: ['listings'] }
  )
}

export async function getListing(slug: string) {
  const res = await payloadFetch<CollectionResponse<Listing>>(
    `/listings${qs({ 'where[slug][equals]': slug, depth: 2, limit: 1 })}`,
    { tags: [`listing-${slug}`] }
  )
  return res.docs[0] ?? null
}

export async function getUpcomingEvents(limit = 4) {
  const now = new Date().toISOString()
  return payloadFetch<CollectionResponse<Event>>(
    `/events${qs({
      'where[status][equals]': 'published',
      'where[startDate][greater_than_equal]': now,
      sort: 'startDate',
      limit,
      depth: 1,
    })}`,
    { tags: ['events'], revalidate: 300 }
  )
}

export async function getEvents(params?: {
  category?: string
  neighborhood?: string
  limit?: number
  page?: number
}) {
  const now = new Date().toISOString()
  const query: Record<string, string | number | boolean | undefined> = {
    'where[status][equals]': 'published',
    'where[startDate][greater_than_equal]': now,
    sort: 'startDate',
    limit: params?.limit ?? 12,
    page: params?.page ?? 1,
    depth: 1,
  }
  if (params?.category) query['where[category.slug][equals]'] = params.category
  if (params?.neighborhood) query['where[neighborhood.slug][equals]'] = params.neighborhood

  return payloadFetch<CollectionResponse<Event>>(`/events${qs(query)}`, {
    tags: ['events'],
    revalidate: 300,
  })
}

export async function getArticles(limit = 6) {
  return payloadFetch<CollectionResponse<Article>>(
    `/articles${qs({ 'where[status][equals]': 'published', sort: '-createdAt', limit, depth: 1 })}`,
    { tags: ['articles'] }
  )
}
