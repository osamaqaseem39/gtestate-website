 'use client'

type MobilePageHeroProps = {
  label?: string
  title: string
  titleAccent?: string
  description?: string
}

export default function MobilePageHero({
  label,
  title,
  titleAccent,
  description,
}: MobilePageHeroProps) {
  const displayTitle = titleAccent ? (
    <>
      {title}
      <span className="text-neon-green"> {titleAccent}</span>
    </>
  ) : (
    title
  )

  return (
    <section
      className="bg-black px-4 py-16 text-white sm:px-6"
      aria-label="Page header"
    >
      <div className="max-w-xl">
        {label && (
          <p className="mb-3 inline-flex rounded-full border border-neon-green/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-neon-green">
            {label}
          </p>
        )}
        <h1 className="text-3xl font-bold uppercase tracking-tight">
          {displayTitle}
        </h1>
        {description && (
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}

