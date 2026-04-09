"use client"

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Globe, Star } from 'lucide-react'
import type { Listing } from '@/lib/payload'
import { cn } from '@/lib/cn'

type Props = {
  listing: Listing
  className?: string
}

export function ListingCard({ listing, className }: Props) {
  const photo = listing.photos?.[0]?.image
  const imageUrl = photo?.sizes?.card?.url ?? photo?.url

  return (
    <Link href={`/explore/${listing.category.slug}/${listing.slug}`} className={cn('listing-card block group', className)}>
      {/* 16:9 Image */}
      <div className="relative aspect-video overflow-hidden bg-primary-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={photo?.alt ?? listing.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-primary-100 flex items-center justify-center">
            <MapPin className="w-8 h-8 text-primary-300" />
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {listing.isFeatured && (
            <span className="badge-featured">Featured</span>
          )}
          <span className="badge-category">{listing.category.name}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-heading font-bold text-lg text-brand-text group-hover:text-primary transition-colors leading-snug">
          {listing.name}
        </h3>

        <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
          {listing.neighborhood && (
            <>
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{listing.neighborhood.name}</span>
            </>
          )}
        </div>

        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {listing.description}
        </p>

        {/* Quick actions */}
        <div className="mt-3 flex items-center gap-3 text-primary-500">
          {listing.lat && listing.lng && (
            <a
              href={`https://maps.google.com/?q=${listing.lat},${listing.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-xs hover:text-primary font-medium transition-colors"
              aria-label="Get directions"
            >
              <MapPin className="w-3.5 h-3.5" />
              Map
            </a>
          )}
          {listing.phone && (
            <a
              href={`tel:${listing.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-xs hover:text-primary font-medium transition-colors"
              aria-label={`Call ${listing.name}`}
            >
              <Phone className="w-3.5 h-3.5" />
              Call
            </a>
          )}
          {listing.website && (
            <a
              href={listing.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-xs hover:text-primary font-medium transition-colors"
              aria-label={`Visit ${listing.name} website`}
            >
              <Globe className="w-3.5 h-3.5" />
              Website
            </a>
          )}
        </div>
      </div>
    </Link>
  )
}
