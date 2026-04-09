import Link from 'next/link'
import { Facebook, Instagram } from 'lucide-react'

const EXPLORE_LINKS = [
  { href: '/explore/dining-drinks', label: 'Dining & Drinks' },
  { href: '/explore/attractions-sightseeing', label: 'Attractions' },
  { href: '/explore/outdoors-recreation', label: 'Outdoors' },
  { href: '/explore/arts-culture', label: 'Arts & Culture' },
  { href: '/explore/shopping', label: 'Shopping' },
  { href: '/explore/lodging-stays', label: 'Lodging' },
]

const NEIGHBORHOOD_LINKS = [
  { href: '/neighborhoods/downtown', label: 'Downtown' },
  { href: '/neighborhoods/millwork-district', label: 'Millwork District' },
  { href: '/neighborhoods/cable-car-square', label: 'Cable Car Square' },
  { href: '/neighborhoods/north-end', label: 'North End' },
  { href: '/neighborhoods/west-end', label: 'West End' },
  { href: '/neighborhoods/south-end', label: 'South End' },
]

export function Footer() {
  return (
    <footer className="bg-primary-900 text-white mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="font-heading text-xl font-bold mb-2">
              <span className="text-white">Explore </span>
              <span className="text-accent">Dubuque</span>
            </div>
            <p className="text-primary-200 text-sm leading-relaxed">
              Your guide to everything Dubuque, Iowa — from river bluffs to world-class dining.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-primary-300 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-primary-300 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-200 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Neighborhoods */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Neighborhoods</h4>
            <ul className="space-y-2">
              {NEIGHBORHOOD_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-200 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">About</h4>
            <ul className="space-y-2">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/advertise', label: 'Advertise' },
                { href: '/guides', label: 'Local Guides' },
                { href: '/events', label: 'Events' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-200 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-400">
          <p>© {new Date().getFullYear()} Explore Dubuque. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
