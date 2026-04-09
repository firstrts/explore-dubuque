import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { ServiceWorkerRegister } from '@/components/ServiceWorkerRegister'

export const metadata: Metadata = {
  title: {
    default: 'Explore Dubuque — Your Guide to Dubuque, Iowa',
    template: '%s | Explore Dubuque',
  },
  description:
    'Discover the best of Dubuque, Iowa — restaurants, attractions, events, neighborhoods, and local guides. Your complete resource for locals and visitors.',
  keywords: ['Dubuque Iowa', 'Dubuque restaurants', 'Dubuque attractions', 'things to do in Dubuque'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ExploreDubuque.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Explore Dubuque',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Explore Dubuque',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1B4F72',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
        <ServiceWorkerRegister />
        <Nav />
        <main className="flex-1 pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
