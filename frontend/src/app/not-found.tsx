import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container section flex flex-col items-center justify-center text-center py-24">
      <div className="text-6xl mb-6">🗺️</div>
      <h1 className="font-heading text-3xl font-bold text-brand-text mb-3">Page Not Found</h1>
      <p className="text-gray-600 max-w-sm mb-8">
        Looks like this trail doesn't exist. Let's get you back on the map.
      </p>
      <div className="flex gap-3">
        <Link href="/" className="btn-primary">Go Home</Link>
        <Link href="/explore" className="btn-outline">Browse Listings</Link>
      </div>
    </div>
  )
}
