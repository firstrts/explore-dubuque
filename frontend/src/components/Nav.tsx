'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, Menu, X, Map } from 'lucide-react'
import { cn } from '@/lib/cn'

const NAV_LINKS = [
  { href: '/explore', label: 'Explore' },
  { href: '/events', label: 'Events' },
  { href: '/neighborhoods', label: 'Neighborhoods' },
  { href: '/guides', label: 'Guides' },
]

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* ── Desktop Top Nav ──────────────────────────────── */}
      <header className="hidden md:block sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="container flex items-center h-16 gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="font-heading text-xl font-bold text-primary">Explore</span>
            <span className="font-heading text-xl font-bold text-accent">Dubuque</span>
          </Link>

          {/* Nav links */}
          <nav className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-text hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-3">
            <button
              aria-label="Search"
              className="p-2 text-gray-500 hover:text-primary transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link href="/advertise" className="btn-accent text-sm py-2 px-4">
              Advertise
            </Link>
          </div>
        </div>
      </header>

      {/* ── Mobile Top Bar ───────────────────────────────── */}
      <header className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center h-14 px-4 gap-3">
          <Link href="/" className="flex items-center gap-1 flex-shrink-0">
            <span className="font-heading text-lg font-bold text-primary">Explore</span>
            <span className="font-heading text-lg font-bold text-accent">Dubuque</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <button aria-label="Search" className="p-2 text-gray-500">
              <Search className="w-5 h-5" />
            </button>
            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="p-2 text-gray-500"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {/* Mobile slide-down menu */}
        {menuOpen && (
          <nav className="border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-brand-text hover:text-primary py-2 border-b border-gray-50 last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/neighborhoods"
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium text-brand-text hover:text-primary py-2 border-b border-gray-50"
            >
              Neighborhoods
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium text-brand-text hover:text-primary py-2 border-b border-gray-50"
            >
              About
            </Link>
            <Link
              href="/advertise"
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium text-accent hover:text-accent-600 py-2"
            >
              Advertise With Us
            </Link>
          </nav>
        )}
      </header>

      {/* ── Mobile Bottom Tab Bar ─────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 flex">
        {[
          { href: '/explore', label: 'Explore', icon: '🗺️' },
          { href: '/events', label: 'Events', icon: '📅' },
          { href: '/map', label: 'Map', icon: '📍' },
          { href: '/saved', label: 'Saved', icon: '🔖' },
        ].map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex-1 flex flex-col items-center py-2 text-xs font-medium text-gray-500 hover:text-primary transition-colors"
          >
            <span className="text-lg leading-tight">{tab.icon}</span>
            <span>{tab.label}</span>
          </Link>
        ))}
      </nav>
    </>
  )
}
