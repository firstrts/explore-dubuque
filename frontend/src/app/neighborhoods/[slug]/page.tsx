import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { ListingCard } from '@/components/ListingCard'
import { getNeighborhoods, getListings } from '@/lib/payload'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  const { docs } = await getNeighborhoods()
  return docs.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { docs } = await getNeighborhoods()
  const hood = docs.find((n) => n.slug === params.slug)
  if (!hood) return {}
  return {
    title: `${hood.name} — Dubuque, Iowa`,
    description: hood.description ?? `Explore places in the ${hood.name} neighborhood of Dubuque, Iowa.`,
  }
}

export default async function NeighborhoodPage({ params }: Props) {
  const { docs: neighborhoods } = await getNeighborhoods()
  const hood = neighborhoods.find((n) => n.slug === params.slug)
  if (!hood) notFound()

  const { docs: listings } = await getListings({ neighborhood: params.slug, limit: 12 })

  const imageUrl = hood.heroImage?.sizes?.hero?.url ?? hood.heroImage?.url

  return (
    <div>
      {/* Hero */}
      <div className="relative h-64 md:h-80 bg-primary-800">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={hood.name}
            fill
            priority
            className="object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 container pb-8">
          <Link href="/neighborhoods" className="flex items-center gap-1 text-white/70 hover:text-white text-sm mb-3 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Neighborhoods
          </Link>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-white">{hood.name}</h1>
        </div>
      </div>

      <div className="container section">
        {hood.description && (
          <p className="text-gray-600 text-base max-w-2xl mb-10">{hood.description}</p>
        )}

        <h2 className="section-title mb-6">Places in {hood.name}</h2>

        {listings.length === 0 ? (
          <p className="text-gray-500">No listings yet in this neighborhood. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
