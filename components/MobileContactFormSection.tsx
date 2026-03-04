 'use client'

export default function MobileContactFormSection() {
  return (
    <section
      className="bg-black px-4 py-12 text-white sm:px-6"
      aria-label="Contact form"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold uppercase tracking-tight">
            Send us a message
          </h2>
          <p className="text-sm text-white/80">
            Share a few details and our team will get back to you within 24
            hours.
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
                Name
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/60"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/60"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
                Phone
              </label>
              <input
                type="tel"
                className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/60"
                placeholder="+92 ..."
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
              Message
            </label>
            <textarea
              rows={4}
              className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/60"
              placeholder="Tell us briefly what you need help with"
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-teal px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  )
}

