import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getCategories } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Explore Dubuque',
  description: 'Browse all categories — dining, attractions, outdoors, arts, shopping, lodging, and more in Dubuque, Iowa.',
}

const CATEGORY_ICONS: Record<string, string> = {
  'dining-drinks': '🍽️',
  'attractions-sightseeing': '🎡',
  'outdoors-recreation': '🌲',
  'arts-culture': '🎭',
  'shopping': '🛍️',
  'lodging-stays': '🏨',
  'services-local-resources': '🔧',
}

export default async function ExplorePage() {
  const { docs: categories } = await getCategories()

  return (
    <div className="container section">
      <h1 className="font-heading text-4xl font-bold text-brand-text mb-2">Explore Dubuque</h1>
      <p className="text-gray-600 mb-10">Find the best of Dubuque across every category.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const imageUrl = cat.heroImage?.sizes?.card?.url ?? cat.heroImage?.url
          return (
            <Link
              key={cat.id}
              href={`/explore/${cat.slug}`}
              className="listing-card group flex flex-col overflow-hidden"
            >
              <div className="relative aspect-video bg-primary-100">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl">
                    {CATEGORY_ICONS[cat.slug] ?? '📍'}
                  </div>
                )}
              </div>
              <div className="p-5">
                <h2 className="font-heading text-xl font-bold text-brand-text group-hover:text-primary transition-colors">
                  {CATEGORY_ICONS[cat.slug] ?? ''} {cat.name}
                </h2>
                {cat.description && (
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">{cat.description}</p>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
