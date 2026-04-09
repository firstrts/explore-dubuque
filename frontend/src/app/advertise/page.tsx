import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Advertise on Explore Dubuque',
  description: 'Reach locals and tourists with a featured listing, sponsored content, or display ad on Explore Dubuque.',
}

const TIERS = [
  {
    name: 'Basic',
    price: 'Free',
    period: '',
    features: ['Listed in our directory', 'Business name, description & contact info', 'Category & neighborhood tagging'],
    cta: 'Get Listed',
    accent: false,
  },
  {
    name: 'Featured',
    price: '$29',
    period: '/month',
    features: [
      'Everything in Basic',
      'Highlighted card at top of category',
      '"Featured" badge on your listing',
      'Priority placement in search',
    ],
    cta: 'Go Featured',
    accent: true,
  },
  {
    name: 'Premium',
    price: '$79',
    period: '/month',
    features: [
      'Everything in Featured',
      'Homepage placement',
      'Premium badge',
      'Promoted in newsletter (Phase 3)',
    ],
    cta: 'Go Premium',
    accent: false,
  },
  {
    name: 'Sponsor',
    price: 'Custom',
    period: '',
    features: [
      'Banner ads (homepage, category, sidebar)',
      'Homepage featured section',
      'Event promotion',
      'Sponsored article / guide',
    ],
    cta: 'Contact Us',
    accent: false,
  },
]

export default function AdvertisePage() {
  return (
    <div className="container section">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="font-heading text-4xl font-bold text-brand-text mb-4">Advertise on Explore Dubuque</h1>
        <p className="text-gray-600 text-lg">
          Reach locals and tourists actively looking for places like yours. Affordable, flexible, local.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-card p-6 flex flex-col ${tier.accent ? 'bg-primary text-white shadow-card-hover ring-2 ring-primary' : 'bg-white shadow-card'}`}
          >
            <h2 className={`font-heading text-xl font-bold ${tier.accent ? 'text-white' : 'text-brand-text'}`}>
              {tier.name}
            </h2>
            <div className="mt-2 mb-4">
              <span className={`text-3xl font-bold ${tier.accent ? 'text-white' : 'text-brand-text'}`}>{tier.price}</span>
              {tier.period && (
                <span className={`text-sm ${tier.accent ? 'text-white/70' : 'text-gray-500'}`}>{tier.period}</span>
              )}
            </div>
            <ul className="space-y-2 flex-1 mb-6">
              {tier.features.map((f) => (
                <li key={f} className={`text-sm flex items-start gap-2 ${tier.accent ? 'text-white/90' : 'text-gray-600'}`}>
                  <span className="mt-0.5 flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="mailto:hello@exploredubuque.com"
              className={`text-center py-2.5 px-4 rounded-lg font-medium text-sm transition-colors ${
                tier.accent
                  ? 'bg-accent hover:bg-accent-500 text-white'
                  : 'border border-primary text-primary hover:bg-primary hover:text-white'
              }`}
            >
              {tier.cta}
            </a>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500 mt-8">
        Questions? Email us at{' '}
        <a href="mailto:hello@exploredubuque.com" className="text-primary hover:underline">
          hello@exploredubuque.com
        </a>
      </p>
    </div>
  )
}
