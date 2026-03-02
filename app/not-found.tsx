import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center px-4 space-y-6">
        <h1
          className="text-4xl md:text-6xl font-bold tracking-tight uppercase"
          style={{ fontFamily: 'var(--font-spartan)' }}
        >
          Page <span className="text-cyan-400">Not Found</span>
        </h1>
        <p className="text-white/70 max-w-md mx-auto">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-cyan-400 text-black font-semibold uppercase tracking-wider hover:bg-cyan-300 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  )
}
