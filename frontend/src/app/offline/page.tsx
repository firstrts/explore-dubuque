import Link from 'next/link'

export default function OfflinePage() {
  return (
    <div className="container section flex flex-col items-center justify-center text-center py-24">
      <div className="text-6xl mb-6">📡</div>
      <h1 className="font-heading text-3xl font-bold text-brand-text mb-3">You're Offline</h1>
      <p className="text-gray-600 max-w-sm mb-8">
        No internet connection right now. Previously viewed listings and pages may still be available.
      </p>
      <Link href="/" className="btn-primary">Try Again</Link>
    </div>
  )
}
