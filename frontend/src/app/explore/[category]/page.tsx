import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ListingCard } from '@/components/ListingCard'
import { AdSenseUnit } from '@/components/AdSenseUnit'
import { MapView } from '@/components/MapView'
import { getCategories, getListings } from '@/lib/payload'

type Props = { params: { category: string }; searchParams: { view?: string; page?: string } }

export async function generateStaticParams() {
  const { docs } = await getCategories()
  return docs.map((cat) => ({ category: cat.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { docs } = await getCategories()
  const cat = docs.find((c) => c.slug === params.category)
  if (!cat) return {}
  return {
    title: `${cat.name} in Dubuque, Iowa`,
    description: cat.description ?? `Browse the best ${cat.name.toLowerCase()} in Dubuque, Iowa.`,
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { docs: categories } = await getCategories()
  const cat = categories.find((c) => c.slug === params.category)
  if (!cat) notFound()

  const page = Number(searchParams.page ?? 1)
  const isMapView = searchParams.view === 'map'

  const { docs: listings, totalDocs, totalPages, hasNextPage, hasPrevPage } = await getListings({
    category: params.category,
    limit: 12,
    page,
  })

  return (
    <div className="container section">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-4xl font-bold text-brand-text">{cat.name}</h1>
          <p className="text-gray-500 mt-1">{totalDocs} places in Dubuque</p>
        </div>
        {/* View toggle */}
        <div className="flex items-center gap-2">
          <a
            href={`/explore/${params.category}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!isMapView ? 'bg-primary text-white' : 'bg-white text-brand-text border border-gray-200 hover:bg-primary-50'}`}
          >
            List
          </a>
          <a
            href={`/explore/${params.category}?view=map`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isMapView ? 'bg-primary text-white' : 'bg-white text-brand-text border border-gray-200 hover:bg-primary-50'}`}
          >
            Map
          </a>
        </div>
      </div>

      {isMapView ? (
        <MapView listings={listings} />
      ) : (
        <>
          {listings.length === 0 ? (
            <p className="text-gray-500 text-center py-16">No listings yet in this category. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {hasPrevPage && (
                <a href={`/explore/${params.category}?page=${page - 1}`} className="btn-outline text-sm py-2 px-4">
                  ← Previous
                </a>
              )}
              <span className="flex items-center px-4 text-sm text-gray-500">
                Page {page} of {totalPages}
              </span>
              {hasNextPage && (
                <a href={`/explore/${params.category}?page=${page + 1}`} className="btn-primary text-sm py-2 px-4">
                  Next →
                </a>
              )}
            </div>
          )}

          <div className="mt-10">
            <AdSenseUnit slot="category-top" />
          </div>
        </>
      )}
    </div>
  )
}
