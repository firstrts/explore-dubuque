import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, ExternalLink } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import type { Event } from '@/lib/payload'
import { cn } from '@/lib/cn'

type Props = {
  event: Event
  className?: string
}

export function EventCard({ event, className }: Props) {
  const imageUrl = event.heroImage?.sizes?.card?.url ?? event.heroImage?.url
  const startDate = parseISO(event.startDate)

  return (
    <Link href={`/events/${event.slug}`} className={cn('listing-card block group', className)}>
      <div className="relative aspect-video overflow-hidden bg-primary-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={event.heroImage?.alt ?? event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-accent/10 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-accent" />
          </div>
        )}
        {/* Date chip */}
        <div className="absolute top-3 right-3 bg-white rounded-lg px-2.5 py-1.5 text-center shadow-sm">
          <div className="text-xs font-semibold text-primary uppercase tracking-wide">
            {format(startDate, 'MMM')}
          </div>
          <div className="text-xl font-bold text-brand-text leading-none">
            {format(startDate, 'd')}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-heading font-bold text-lg text-brand-text group-hover:text-primary transition-colors leading-snug">
          {event.title}
        </h3>

        <div className="mt-1.5 flex items-center gap-3 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {format(startDate, 'EEE, MMM d · h:mm a')}
          </span>
        </div>

        {(event.linkedListing?.neighborhood || event.locationOverride) && (
          <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{event.locationOverride ?? event.linkedListing?.neighborhood?.name}</span>
          </div>
        )}

        {event.ticketUrl && (
          <div className="mt-3">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-600 transition-colors">
              <ExternalLink className="w-3.5 h-3.5" />
              Tickets / Info
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
