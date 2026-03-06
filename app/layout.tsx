import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Navigation from '@/components/Navigation'
import { GSAPProvider } from '@/components/GSAPContext'
import Preloader from '@/components/Preloader'

const spartan = localFont({
  src: [
    {
      path: '../public/fonts/Spartan/Spartan-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/Spartan/Spartan-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/Spartan/Spartan-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Spartan/Spartan-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Spartan/Spartan-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Spartan/Spartan-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Spartan/Spartan-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Spartan/Spartan-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/Spartan/Spartan-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-spartan',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://gtestate.com'),
  title: {
    default: 'GT Estate | Next‑Gen Real Estate Platform',
    template: '%s | GT Estate',
  },
  description:
    'GT Estate is a next‑generation real estate platform combining AI‑powered property matching, virtual tours and smart home integrations to help you buy, sell or invest with confidence.',
  keywords: [
    'GT Estate',
    'real estate',
    'property',
    'luxury homes',
    'apartments',
    'property investment',
    'smart homes',
    'virtual tours',
    'AI real estate',
    'property platform',
  ],
  authors: [{ name: 'GT Estate' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'GT Estate | Next‑Gen Real Estate Platform',
    description:
      'Discover curated properties, immersive tours and data‑driven insights on the GT Estate platform.',
    url: '/',
    siteName: 'GT Estate',
    images: ['/logo.png'],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GT Estate | Next‑Gen Real Estate Platform',
    description:
      'Experience a smarter way to explore and invest in property with GT Estate.',
    images: ['/logo.png'],
    site: '@gtestate',
    creator: '@gtestate',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spartan.variable} font-sans`} suppressHydrationWarning>
        <Preloader />
        <GSAPProvider>
          <Navigation />
          {children}
        </GSAPProvider>
      </body>
    </html>
  )
}
