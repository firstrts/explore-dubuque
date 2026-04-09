import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getArticles } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Local Guides — Dubuque, Iowa',
  description: 'Curated guides and articles about Dubuque — best restaurants, weekend itineraries, hidden gems, and more.',
}

export default async function GuidesPage() {
  const { docs: articles } = await getArticles(20)

  return (
    <div className="container section">
      <h1 className="font-heading text-4xl font-bold text-brand-text mb-2">Local Guides</h1>
      <p className="text-gray-500 mb-10">Curated guides, local tips, and Dubuque insider knowledge.</p>

      {articles.length === 0 ? (
        <p className="text-gray-500 text-center py-16">Guides coming soon!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => {
            const imageUrl = article.heroImage?.sizes?.card?.url ?? article.heroImage?.url
            return (
              <Link
                key={article.id}
                href={`/guides/${article.slug}`}
                className="listing-card group flex flex-col overflow-hidden"
              >
                <div className="relative aspect-video bg-primary-100">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={article.heroImage?.alt ?? article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-accent/10 flex items-center justify-center text-4xl">📖</div>
                  )}
                  {article.isSponsored && (
                    <div className="absolute top-3 left-3">
                      <span className="badge-green">Sponsored</span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  {article.category && (
                    <span className="badge-category mb-2 self-start">{article.category.name}</span>
                  )}
                  <h2 className="font-heading text-xl font-bold text-brand-text group-hover:text-primary transition-colors leading-snug flex-1">
                    {article.title}
                  </h2>
                  {article.excerpt && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                  )}
                  <span className="mt-3 text-primary font-medium text-sm flex items-center gap-1">
                    Read Guide <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
