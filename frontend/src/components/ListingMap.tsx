'use client'

import { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

type Props = {
  lat: number
  lng: number
  name: string
}

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  version: 'weekly',
})

export function ListingMap({ lat, lng, name }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let map: google.maps.Map

    loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary
      const { AdvancedMarkerElement } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary

      if (!mapRef.current) return

      map = new Map(mapRef.current, {
        center: { lat, lng },
        zoom: 16,
        mapId: 'explore-dubuque-listing',
        disableDefaultUI: true,
        zoomControl: true,
        gestureHandling: 'cooperative',
      })

      new AdvancedMarkerElement({
        map,
        position: { lat, lng },
        title: name,
      })
    })
  }, [lat, lng, name])

  return (
    <div
      ref={mapRef}
      className="w-full h-64 rounded-card overflow-hidden bg-primary-100"
      aria-label={`Map showing location of ${name}`}
    />
  )
}
