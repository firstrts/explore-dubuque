import Image from 'next/image'
import Link from 'next/link'
import { Search, ChevronRight } from 'lucide-react'
import { ListingCard } from '@/components/ListingCard'
import { EventCard } from '@/components/EventCard'
import { AdSenseUnit } from '@/components/AdSenseUnit'
import {
  getCategories,
  getNeighborhoods,
  getListings,
  getUpcomingEvents,
  getArticles,
} from '@/lib/payload'

const CATEGORY_ICONS: Record<string, string> = {
  'dining-drinks': '🍽️',
  'attractions-sightseeing': '🎡',
  'outdoors-recreation': '🌲',
  'arts-culture': '🎭',
  'shopping': '🛍️',
  'lodging-stays': '🏨',
  'services-local-resources': '🔧',
}

export default async function HomePage() {
  const [categoriesRes, neighborhoodsRes, featuredRes, eventsRes, articlesRes] =
    await Promise.all([
      getCategories(),
      getNeighborhoods(),
      getListings({ featured: true, limit: 8 }),
      getUpcomingEvents(4),
      getArticles(1),
    ])

  const categories = categoriesRes.docs
  const neighborhoods = neighborhoodsRes.docs
  const featured = featuredRes.docs
  const events = eventsRes.docs
  const spotlight = articlesRes.docs[0]

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-primary-900">
        {/* Background image placeholder — swap with real Dubuque photo */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=80"
            alt="Dubuque Iowa skyline"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 text-center px-4 py-16 max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            Discover <span className="text-accent">Dubuque</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8">
            Restaurants, events, attractions, and hidden gems — all in one place.
          </p>
          {/* Search bar */}
          <form action="/search" className="flex bg-white rounded-xl overflow-hidden shadow-xl max-w-xl mx-auto">
            <input
              type="search"
              name="q"
              placeholder="Search restaurants, events, places…"
              className="flex-1 px-5 py-4 text-brand-text text-base outline-none font-body"
            />
            <button
              type="submit"
              className="px-5 bg-accent hover:bg-accent-500 text-white transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>
      </section>

      {/* ── Category Quick-Links ──────────────────────────── */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title text-center mb-8">What Are You Looking For?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/explore/${cat.slug}`}
                className="flex flex-col items-center gap-2 p-4 rounded-card bg-surface hover:bg-primary-50 hover:shadow-card transition-all duration-150 text-center group"
              >
                <span className="text-3xl">{CATEGORY_ICONS[cat.slug] ?? '📍'}</span>
                <span className="text-sm font-medium text-brand-text group-hover:text-primary leading-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ───────────────────────────────── */}
      {events.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title">Upcoming Events</h2>
              <Link href="/events" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                See All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── AdSense Mid ───────────────────────────────────── */}
      <div className="container">
        <AdSenseUnit slot="homepage-mid" className="my-4" />
      </div>

      {/* ── Featured Listings ─────────────────────────────── */}
      {featured.length > 0 && (
        <section className="section bg-white">
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title">Featured Places</h2>
              <Link href="/explore" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                Explore All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            {/* Horizontal scroll on mobile, grid on desktop */}
            <div className="flex md:grid md:grid-cols-4 gap-5 overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory md:snap-none">
              {featured.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  className="min-w-[280px] md:min-w-0 snap-start"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Explore by Neighborhood ───────────────────────── */}
      {neighborhoods.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="section-title mb-6">Explore by Neighborhood</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {neighborhoods.map((hood) => {
                const imageUrl = hood.heroImage?.sizes?.card?.url ?? hood.heroImage?.url
                return (
                  <Link
                    key={hood.id}
                    href={`/neighborhoods/${hood.slug}`}
                    className="relative aspect-video rounded-card overflow-hidden group"
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={hood.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary-200" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="font-heading font-bold text-white text-lg">{hood.name}</h3>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Local Spotlight (Article) ─────────────────────── */}
      {spotlight && (
        <section className="section bg-primary-50">
          <div className="container max-w-4xl">
            <h2 className="section-title mb-6 text-center">Local Spotlight</h2>
            <Link
              href={`/guides/${spotlight.slug}`}
              className="listing-card flex flex-col md:flex-row overflow-hidden group"
            >
              {spotlight.heroImage && (
                <div className="relative md:w-72 aspect-video md:aspect-auto flex-shrink-0">
                  <Image
                    src={spotlight.heroImage.sizes?.card?.url ?? spotlight.heroImage.url}
                    alt={spotlight.heroImage.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col justify-center">
                {spotlight.isSponsored && (
                  <span className="badge-green mb-2">Sponsored</span>
                )}
                <h3 className="font-heading text-2xl font-bold text-brand-text group-hover:text-primary transition-colors">
                  {spotlight.title}
                </h3>
                {spotlight.excerpt && (
                  <p className="mt-2 text-gray-600 line-clamp-3">{spotlight.excerpt}</p>
                )}
                <span className="mt-4 text-primary font-medium text-sm flex items-center gap-1">
                  Read Guide <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}
    </>
  )
}
