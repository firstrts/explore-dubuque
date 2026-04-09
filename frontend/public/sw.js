/**
 * Explore Dubuque — Service Worker
 * Strategy: Cache-first for static assets, network-first for API/pages
 */

const CACHE_NAME = 'explore-dubuque-v1'
const STATIC_CACHE = 'explore-dubuque-static-v1'

// Assets to pre-cache on install
const PRECACHE_URLS = [
  '/',
  '/explore',
  '/events',
  '/neighborhoods',
  '/guides',
  '/offline',
]

// Install: pre-cache shell pages
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS))
  )
  self.skipWaiting()
})

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME && k !== STATIC_CACHE)
          .map((k) => caches.delete(k))
      )
    )
  )
  self.clients.claim()
})

// Fetch: network-first for pages/API, cache-first for images
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // Skip non-GET and cross-origin requests (AdSense, Google Maps, etc.)
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return

  // Images: cache-first (stale-while-revalidate)
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(event.request)
        const networkFetch = fetch(event.request).then((res) => {
          if (res.ok) cache.put(event.request, res.clone())
          return res
        })
        return cached ?? networkFetch
      })
    )
    return
  }

  // Pages: network-first, fall back to cache, then /offline
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        if (res.ok) {
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, res.clone()))
        }
        return res
      })
      .catch(async () => {
        const cached = await caches.match(event.request)
        return cached ?? caches.match('/offline')
      })
  )
})
