'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import Link from 'next/link'
import type { Listing } from '@/lib/payload'

type Props = {
  listings: Listing[]
}

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  version: 'weekly',
})

export function MapView({ listings }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<Listing | null>(null)

  const geoListings = listings.filter((l) => l.lat && l.lng)

  useEffect(() => {
    if (!geoListings.length) return

    loader.load().then(async () => {
      const { Map, InfoWindow } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary
      const { AdvancedMarkerElement } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary

      if (!mapRef.current) return

      const bounds = new google.maps.LatLngBounds()
      geoListings.forEach((l) => bounds.extend({ lat: l.lat!, lng: l.lng! }))

      const map = new Map(mapRef.current, {
        mapId: 'explore-dubuque-category',
        disableDefaultUI: false,
        gestureHandling: 'cooperative',
      })

      map.fitBounds(bounds)

      geoListings.forEach((listing) => {
        const marker = new AdvancedMarkerElement({
          map,
          position: { lat: listing.lat!, lng: listing.lng! },
          title: listing.name,
        })

        marker.addListener('click', () => {
          setSelected(listing)
        })
      })
    })
  }, [geoListings])

  return (
    <div className="relative">
      {!geoListings.length ? (
        <p className="text-gray-500 text-center py-16">No listings with map coordinates yet.</p>
      ) : (
        <div ref={mapRef} className="w-full h-[60vh] rounded-card overflow-hidden bg-primary-100" />
      )}

      {/* Selected listing popup */}
      {selected && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-72 bg-white rounded-card shadow-card-hover p-4 animate-in fade-in">
          <button
            onClick={() => setSelected(null)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg leading-none"
            aria-label="Close"
          >
            ×
          </button>
          <h3 className="font-heading font-bold text-brand-text pr-4">{selected.name}</h3>
          {selected.neighborhood && (
            <p className="text-xs text-gray-500 mt-0.5">{selected.neighborhood.name}</p>
          )}
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{selected.description}</p>
          <Link
            href={`/explore/${selected.category.slug}/${selected.slug}`}
            className="mt-3 btn-primary text-sm py-1.5 px-4 w-full justify-center"
          >
            View Listing
          </Link>
        </div>
      )}
    </div>
  )
}
