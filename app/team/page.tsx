import { Metadata } from 'next'
// @ts-ignore - local client component resolved by Next.js
import TeamPageClient from './TeamPageClient'

export const metadata: Metadata = {
  title: 'Team - GT Estate',
  description:
    'Meet the experts behind GT Estate – dedicated professionals delivering exceptional real estate services.',
}

export default function Team() {
  return <TeamPageClient />
}
