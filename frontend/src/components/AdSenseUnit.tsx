'use client'

import { useEffect } from 'react'
import { cn } from '@/lib/cn'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

type Props = {
  slot: string
  className?: string
}

/**
 * Renders a Google AdSense responsive ad unit.
 * The AdSense script is loaded once in layout.tsx via <Script>.
 * Each instance calls (adsbygoogle = window.adsbygoogle || []).push({})
 * to activate the slot.
 */
export function AdSenseUnit({ slot, className }: Props) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // AdSense not loaded yet or blocked by ad blocker — silent fail
    }
  }, [])

  if (!clientId) return null

  return (
    <div className={cn('overflow-hidden min-h-[90px]', className)} aria-label="Advertisement">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
