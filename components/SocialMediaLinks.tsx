'use client'

import { Facebook, Instagram, Youtube } from 'lucide-react'
import { SOCIAL_LINKS } from '@/lib/site-content'

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

type SocialMediaLinksProps = {
  variant?: 'footer' | 'menu'
}

export default function SocialMediaLinks({ variant = 'footer' }: SocialMediaLinksProps) {
  const btn =
    variant === 'footer'
      ? 'text-white border border-white/40 rounded p-2 hover:border-[#fabb22] hover:text-[#fabb22] transition-colors'
      : 'text-white border border-white/40 rounded p-2 hover:border-[#fabb22] hover:text-[#fabb22] transition-colors'

  return (
    <div className="flex flex-wrap gap-4">
      <a
        href={SOCIAL_LINKS.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        aria-label="Facebook"
      >
        <Facebook className="w-5 h-5" />
      </a>
      <a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        aria-label="Instagram"
      >
        <Instagram className="w-5 h-5" />
      </a>
      <a
        href={SOCIAL_LINKS.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        aria-label="TikTok"
      >
        <TikTokIcon className="w-5 h-5" />
      </a>
      <a
        href={SOCIAL_LINKS.youtube}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        aria-label="YouTube"
      >
        <Youtube className="w-5 h-5" />
      </a>
    </div>
  )
}
