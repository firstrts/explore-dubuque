import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getNeighborhoods } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Neighborhoods in Dubuque, Iowa',
  description: 'Explore Dubuque neighborhood by neighborhood — Downtown, Millwork District, Cable Car Square, and more.',
}

export default async function NeighborhoodsPage() {
  const { docs: neighborhoods } = await getNeighborhoods()

  return (
    <div className="container section">
      <h1 className="font-heading text-4xl font-bold text-brand-text mb-2">Explore by Neighborhood</h1>
      <p className="text-gray-500 mb-10">
        Dubuque's distinct neighborhoods each have their own character and charm. Find what's around.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {neighborhoods.map((hood) => {
          const imageUrl = hood.heroImage?.sizes?.card?.url ?? hood.heroImage?.url
          return (
            <Link
              key={hood.id}
              href={`/neighborhoods/${hood.slug}`}
              className="listing-card group flex flex-col overflow-hidden"
            >
              <div className="relative aspect-video bg-primary-200">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={hood.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-300 to-primary-600" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h2 className="absolute bottom-4 left-4 font-heading text-xl font-bold text-white">
                  {hood.name}
                </h2>
              </div>
              {hood.description && (
                <p className="p-4 text-sm text-gray-600 line-clamp-2">{hood.description}</p>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
