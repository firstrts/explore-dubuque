import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Explore Dubuque',
  description: 'Learn about Explore Dubuque — a community resource for locals and visitors to discover everything Dubuque, Iowa has to offer.',
}

export default function AboutPage() {
  return (
    <div className="container section max-w-3xl">
      <h1 className="font-heading text-4xl font-bold text-brand-text mb-6">About Explore Dubuque</h1>

      <div className="prose prose-lg prose-primary max-w-none">
        <p>
          Explore Dubuque is a community-driven directory dedicated to showcasing everything
          Dubuque, Iowa has to offer — from world-class dining along the Mississippi River to
          hidden gems in the historic bluffs.
        </p>
        <p>
          Whether you're a lifelong resident looking for something new or a first-time visitor
          planning your trip, we're your go-to guide for restaurants, attractions, events,
          local shops, and more.
        </p>
        <h2>Our Mission</h2>
        <p>
          We believe Dubuque deserves a great local resource — one that puts local businesses
          first, is easy to use on your phone, and actually stays up to date. That's what
          we're building.
        </p>
        <h2>Want to Be Listed?</h2>
        <p>
          Basic listings are free. If you'd like a featured placement or want to sponsor a
          category, we'd love to work with you.
        </p>
      </div>

      <div className="mt-8 flex gap-4">
        <Link href="/advertise" className="btn-primary">Advertise With Us</Link>
        <Link href="/explore" className="btn-outline">Browse Listings</Link>
      </div>
    </div>
  )
}
