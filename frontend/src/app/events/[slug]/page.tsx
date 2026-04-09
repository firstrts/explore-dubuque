import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, ExternalLink, ChevronLeft, RefreshCw } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { getEvents } from '@/lib/payload'

const CMS_URL = process.env.CMS_API_URL || 'http://localhost:3001/api'

async function getEvent(slug: string) {
  const res = await fetch(
    `${CMS_URL}/events?where[slug][equals]=${slug}&depth=2&limit=1`,
    { next: { tags: [`event-${slug}`], revalidate: 300 } }
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.docs[0] ?? null
}

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  const { docs } = await getEvents({ limit: 100 })
  return docs.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEvent(params.slug)
  if (!event) return {}
  return {
    title: `${event.title} — Dubuque Events`,
    description: `${event.title} on ${format(parseISO(event.startDate), 'MMMM d, yyyy')} in Dubuque, Iowa.`,
    openGraph: {
      images: event.heroImage?.url ? [event.heroImage.url] : [],
    },
  }
}

export default async function EventPage({ params }: Props) {
  const event = await getEvent(params.slug)
  if (!event) notFound()

  const startDate = parseISO(event.startDate)
  const endDate = event.endDate ? parseISO(event.endDate) : null
  const imageUrl = event.heroImage?.sizes?.hero?.url ?? event.heroImage?.url

  return (
    <article className="container section max-w-4xl">
      <Link href="/events" className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" />
        All Events
      </Link>

      {imageUrl && (
        <div className="relative aspect-video rounded-card overflow-hidden mb-8">
          <Image
            src={imageUrl}
            alt={event.heroImage?.alt ?? event.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {event.category && (
            <span className="badge-category mb-3 inline-block">{event.category.name}</span>
          )}
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-brand-text">{event.title}</h1>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
              <span>
                {format(startDate, 'EEEE, MMMM d, yyyy')} at {format(startDate, 'h:mm a')}
                {endDate && ` – ${format(endDate, 'h:mm a')}`}
              </span>
            </div>
            {event.isRecurring && event.recurrenceRule && (
              <div className="flex items-center gap-2 text-gray-600">
                <RefreshCw className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{event.recurrenceRule}</span>
              </div>
            )}
            {(event.locationOverride || event.linkedListing?.address) && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{event.locationOverride ?? event.linkedListing?.address}</span>
              </div>
            )}
          </div>

          {/* Rich text body — rendered as raw HTML via Lexical's HTML serializer */}
          {/* For now we render the description as a placeholder */}
          <div className="mt-6 prose prose-primary max-w-none text-gray-700">
            <p className="text-gray-700 leading-relaxed">{/* Body renders here via Lexical serializer */}</p>
          </div>

          {event.linkedListing && (
            <div className="mt-6 p-4 bg-primary-50 rounded-card">
              <p className="text-sm font-medium text-primary mb-1">Hosted at</p>
              <Link
                href={`/explore/${event.linkedListing.category?.slug}/${event.linkedListing.slug}`}
                className="font-heading font-bold text-lg text-brand-text hover:text-primary transition-colors"
              >
                {event.linkedListing.name}
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside>
          {event.ticketUrl && (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent w-full justify-center mb-4 text-base py-3"
            >
              <ExternalLink className="w-4 h-4" />
              Tickets / More Info
            </a>
          )}

          <div className="bg-white rounded-card shadow-card p-5">
            <h2 className="font-heading font-bold text-brand-text mb-3">Event Details</h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-gray-500 font-medium">Date</dt>
                <dd className="text-brand-text">{format(startDate, 'MMMM d, yyyy')}</dd>
              </div>
              <div>
                <dt className="text-gray-500 font-medium">Time</dt>
                <dd className="text-brand-text">
                  {format(startDate, 'h:mm a')}
                  {endDate && ` – ${format(endDate, 'h:mm a')}`}
                </dd>
              </div>
              {event.neighborhood && (
                <div>
                  <dt className="text-gray-500 font-medium">Neighborhood</dt>
                  <dd className="text-brand-text">{event.neighborhood.name}</dd>
                </div>
              )}
            </dl>
          </div>
        </aside>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: event.title,
            startDate: event.startDate,
            endDate: event.endDate,
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            location: {
              '@type': 'Place',
              name: event.locationOverride ?? event.linkedListing?.name ?? 'Dubuque, IA',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Dubuque',
                addressRegion: 'IA',
                addressCountry: 'US',
              },
            },
            url: event.ticketUrl,
          }),
        }}
      />
    </article>
  )
}
