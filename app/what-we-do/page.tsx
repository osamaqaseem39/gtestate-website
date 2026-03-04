import { Metadata } from 'next'
import WhatWeDoPageClient from './WhatWeDoPageClient'

export const metadata: Metadata = {
  title: 'What We Do - GT Estate',
  description:
    'Discover our comprehensive real estate services including AI-powered matching, virtual tours, and smart home integration.',
}

export default function WhatWeDo() {
  return <WhatWeDoPageClient />
}
