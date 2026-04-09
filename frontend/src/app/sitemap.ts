import type { MetadataRoute } from 'next'
import { getCategories, getNeighborhoods, getListings, getEvents, getArticles } from '@/lib/payload'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://ExploreDubuque.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categoriesRes, neighborhoodsRes, listingsRes, eventsRes, articlesRes] =
    await Promise.all([
      getCategories(),
      getNeighborhoods(),
      getListings({ limit: 200 }),
      getEvents({ limit: 200 }),
      getArticles(100),
    ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: 'daily' },
    { url: `${BASE}/explore`, priority: 0.9, changeFrequency: 'daily' },
    { url: `${BASE}/events`, priority: 0.9, changeFrequency: 'daily' },
    { url: `${BASE}/neighborhoods`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/guides`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/about`, priority: 0.5, changeFrequency: 'monthly' },
    { url: `${BASE}/advertise`, priority: 0.6, changeFrequency: 'monthly' },
  ]

  const categoryPages = categoriesRes.docs.map((cat) => ({
    url: `${BASE}/explore/${cat.slug}`,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  }))

  const neighborhoodPages = neighborhoodsRes.docs.map((hood) => ({
    url: `${BASE}/neighborhoods/${hood.slug}`,
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  }))

  const listingPages = listingsRes.docs.map((l) => ({
    url: `${BASE}/explore/${l.category.slug}/${l.slug}`,
    priority: 0.6,
    changeFrequency: 'weekly' as const,
  }))

  const eventPages = eventsRes.docs.map((e) => ({
    url: `${BASE}/events/${e.slug}`,
    priority: 0.5,
    changeFrequency: 'daily' as const,
  }))

  const articlePages = articlesRes.docs.map((a) => ({
    url: `${BASE}/guides/${a.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  }))

  return [
    ...staticPages,
    ...categoryPages,
    ...neighborhoodPages,
    ...listingPages,
    ...eventPages,
    ...articlePages,
  ]
}
