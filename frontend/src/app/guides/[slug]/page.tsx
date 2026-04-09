import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getArticles } from '@/lib/payload'

const CMS_URL = process.env.CMS_API_URL || 'http://localhost:3001/api'

async function getArticle(slug: string) {
  const res = await fetch(
    `${CMS_URL}/articles?where[slug][equals]=${slug}&depth=2&limit=1`,
    { next: { tags: [`article-${slug}`], revalidate: 3600 } }
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.docs[0] ?? null
}

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  const { docs } = await getArticles(100)
  return docs.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.slug)
  if (!article) return {}
  return {
    title: article.seo?.metaTitle ?? article.title,
    description: article.seo?.metaDescription ?? article.excerpt,
    openGraph: {
      images: article.heroImage?.url ? [article.heroImage.url] : [],
    },
  }
}

export default async function GuidePage({ params }: Props) {
  const article = await getArticle(params.slug)
  if (!article) notFound()

  const imageUrl = article.heroImage?.sizes?.hero?.url ?? article.heroImage?.url

  return (
    <article className="container section max-w-3xl">
      <Link href="/guides" className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" />
        All Guides
      </Link>

      {article.isSponsored && (
        <div className="mb-4 px-3 py-1.5 bg-brand-green/10 border border-brand-green/20 rounded-lg inline-block">
          <p className="text-xs font-medium text-brand-green">Sponsored Content</p>
        </div>
      )}

      {article.category && (
        <span className="badge-category mb-3 inline-block">{article.category.name}</span>
      )}

      <h1 className="font-heading text-3xl md:text-4xl font-bold text-brand-text mb-4">
        {article.title}
      </h1>

      {article.excerpt && (
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">{article.excerpt}</p>
      )}

      {imageUrl && (
        <div className="relative aspect-video rounded-card overflow-hidden mb-8">
          <Image
            src={imageUrl}
            alt={article.heroImage?.alt ?? article.title}
            fill
            priority
            className="object-cover"
          />
          {article.heroImage?.credit && (
            <p className="absolute bottom-2 right-2 text-xs text-white/70 bg-black/30 px-2 py-0.5 rounded">
              {article.heroImage.credit}
            </p>
          )}
        </div>
      )}

      {/* Rich text body — rendered via Lexical HTML serializer (to be wired up) */}
      <div className="prose prose-lg prose-primary max-w-none">
        {/* Body content renders here */}
      </div>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {article.tags.map(({ tag }: { tag: string }) => (
            <span key={tag} className="badge-green">{tag}</span>
          ))}
        </div>
      )}

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.excerpt,
            image: article.heroImage?.url,
            publisher: {
              '@type': 'Organization',
              name: 'Explore Dubuque',
              url: 'https://ExploreDubuque.com',
            },
          }),
        }}
      />
    </article>
  )
}
