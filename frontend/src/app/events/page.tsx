import type { Metadata } from 'next'
import { EventCard } from '@/components/EventCard'
import { getEvents, getCategories, getNeighborhoods } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Events in Dubuque, Iowa',
  description: 'Find upcoming events in Dubuque — concerts, festivals, farmers markets, art shows, and more.',
}

type Props = { searchParams: { category?: string; neighborhood?: string; page?: string } }

export default async function EventsPage({ searchParams }: Props) {
  const page = Number(searchParams.page ?? 1)

  const [eventsRes, categoriesRes, neighborhoodsRes] = await Promise.all([
    getEvents({
      category: searchParams.category,
      neighborhood: searchParams.neighborhood,
      limit: 12,
      page,
    }),
    getCategories(),
    getNeighborhoods(),
  ])

  const { docs: events, totalPages, hasNextPage, hasPrevPage } = eventsRes

  return (
    <div className="container section">
      <h1 className="font-heading text-4xl font-bold text-brand-text mb-2">Events in Dubuque</h1>
      <p className="text-gray-500 mb-8">Concerts, festivals, markets, and more — happening now and coming up soon.</p>

      {/* Filters */}
      <form className="flex flex-wrap gap-3 mb-8">
        <select
          name="category"
          defaultValue={searchParams.category ?? ''}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-body text-brand-text bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="">All Categories</option>
          {categoriesRes.docs.map((cat) => (
            <option key={cat.id} value={cat.slug}>{cat.name}</option>
          ))}
        </select>
        <select
          name="neighborhood"
          defaultValue={searchParams.neighborhood ?? ''}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-body text-brand-text bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="">All Neighborhoods</option>
          {neighborhoodsRes.docs.map((n) => (
            <option key={n.id} value={n.slug}>{n.name}</option>
          ))}
        </select>
        <button type="submit" className="btn-primary text-sm py-2 px-4">Filter</button>
        {(searchParams.category || searchParams.neighborhood) && (
          <a href="/events" className="btn-outline text-sm py-2 px-4">Clear</a>
        )}
      </form>

      {events.length === 0 ? (
        <p className="text-gray-500 text-center py-16">No upcoming events found. Check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {hasPrevPage && (
            <a
              href={`/events?page=${page - 1}${searchParams.category ? `&category=${searchParams.category}` : ''}${searchParams.neighborhood ? `&neighborhood=${searchParams.neighborhood}` : ''}`}
              className="btn-outline text-sm py-2 px-4"
            >
              ← Previous
            </a>
          )}
          <span className="flex items-center px-4 text-sm text-gray-500">Page {page} of {totalPages}</span>
          {hasNextPage && (
            <a
              href={`/events?page=${page + 1}${searchParams.category ? `&category=${searchParams.category}` : ''}${searchParams.neighborhood ? `&neighborhood=${searchParams.neighborhood}` : ''}`}
              className="btn-primary text-sm py-2 px-4"
            >
              Next →
            </a>
          )}
        </div>
      )}
    </div>
  )
}
