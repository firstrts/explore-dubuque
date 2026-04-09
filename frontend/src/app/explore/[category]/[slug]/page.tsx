import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Globe, Clock, ChevronLeft, Facebook, Instagram } from 'lucide-react'
import { getListing, getListings } from '@/lib/payload'
import { ListingMap } from '@/components/ListingMap'
import { AdSenseUnit } from '@/components/AdSenseUnit'

type Props = { params: { category: string; slug: string } }

export async function generateStaticParams() {
  const { docs } = await getListings({ limit: 100 })
  return docs.map((l) => ({ category: l.category.slug, slug: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const listing = await getListing(params.slug)
  if (!listing) return {}
  return {
    title: listing.seo?.metaTitle ?? `${listing.name} — Dubuque, IA`,
    description: listing.seo?.metaDescription ?? listing.description,
    openGraph: {
      images: listing.photos?.[0]?.image?.url ? [listing.photos[0].image.url] : [],
    },
  }
}

export default async function ListingPage({ params }: Props) {
  const listing = await getListing(params.slug)
  if (!listing) notFound()

  const coverPhoto = listing.photos?.[0]?.image

  return (
    <article className="container section max-w-5xl">
      {/* Back link */}
      <Link
        href={`/explore/${listing.category.slug}`}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        {listing.category.name}
      </Link>

      {/* Hero image */}
      {coverPhoto && (
        <div className="relative aspect-video rounded-card overflow-hidden mb-8">
          <Image
            src={coverPhoto.sizes?.hero?.url ?? coverPhoto.url}
            alt={coverPhoto.alt}
            fill
            priority
            className="object-cover"
          />
          {listing.isFeatured && (
            <div className="absolute top-4 left-4">
              <span className="badge-featured text-sm px-3 py-1">Featured</span>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="badge-category">{listing.category.name}</span>
            {listing.tags?.map(({ tag }) => (
              <span key={tag} className="badge-green">{tag}</span>
            ))}
          </div>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-brand-text">{listing.name}</h1>

          {listing.neighborhood && (
            <div className="flex items-center gap-1.5 mt-2 text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>{listing.neighborhood.name}</span>
            </div>
          )}

          <p className="mt-5 text-gray-700 leading-relaxed text-base">{listing.description}</p>

          {/* Photo gallery */}
          {listing.photos && listing.photos.length > 1 && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
              {listing.photos.slice(1).map(({ image }, i) => (
                <div key={i} className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={image.sizes?.card?.url ?? image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Map */}
          {listing.lat && listing.lng && (
            <div className="mt-8">
              <h2 className="font-heading text-xl font-bold mb-3">Location</h2>
              <ListingMap lat={listing.lat} lng={listing.lng} name={listing.name} />
              <div className="mt-2">
                <a
                  href={`https://maps.google.com/?q=${listing.lat},${listing.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm py-2 px-4"
                >
                  Get Directions
                </a>
              </div>
            </div>
          )}

          {/* AdSense */}
          <div className="mt-8">
            <AdSenseUnit slot="listing-sidebar" />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Contact card */}
          <div className="bg-white rounded-card shadow-card p-5 space-y-3">
            {listing.address && (
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-brand-text">{listing.address}</p>
                  <p className="text-sm text-gray-500">{listing.city}, {listing.state} {listing.zip}</p>
                </div>
              </div>
            )}
            {listing.phone && (
              <a href={`tel:${listing.phone}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">{listing.phone}</span>
              </a>
            )}
            {listing.website && (
              <a
                href={listing.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <Globe className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm truncate">{listing.website.replace(/^https?:\/\//, '')}</span>
              </a>
            )}

            {/* Social links */}
            {(listing.social?.facebook || listing.social?.instagram) && (
              <div className="flex gap-3 pt-1">
                {listing.social.facebook && (
                  <a
                    href={listing.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {listing.social.instagram && (
                  <a
                    href={listing.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Hours */}
          {listing.hours && listing.hours.length > 0 && (
            <div className="bg-white rounded-card shadow-card p-5">
              <h2 className="font-heading font-bold text-brand-text flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-primary" /> Hours
              </h2>
              <dl className="space-y-1.5">
                {listing.hours.map((h) => (
                  <div key={h.day} className="flex justify-between text-sm">
                    <dt className="text-gray-600 font-medium w-24">{h.day}</dt>
                    <dd className="text-brand-text">
                      {h.closed ? 'Closed' : `${h.open} – ${h.close}`}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </aside>
      </div>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: listing.name,
            description: listing.description,
            url: listing.website,
            telephone: listing.phone,
            address: listing.address
              ? {
                  '@type': 'PostalAddress',
                  streetAddress: listing.address,
                  addressLocality: listing.city,
                  addressRegion: listing.state,
                  postalCode: listing.zip,
                  addressCountry: 'US',
                }
              : undefined,
            geo:
              listing.lat && listing.lng
                ? { '@type': 'GeoCoordinates', latitude: listing.lat, longitude: listing.lng }
                : undefined,
          }),
        }}
      />
    </article>
  )
}
