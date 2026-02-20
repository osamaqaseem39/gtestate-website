import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Navigation from '@/components/Navigation'
import SmoothScroll from '@/components/SmoothScroll'
import Cursor from '@/components/Cursor'

const spartan = localFont({
  src: [
    {
      path: '../../public/fonts/Spartan/Spartan-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Spartan/Spartan-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Spartan/Spartan-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Spartan/Spartan-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Spartan/Spartan-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Spartan/Spartan-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Spartan/Spartan-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Spartan/Spartan-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Spartan/Spartan-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-spartan',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GT Estate - Next-Gen Property Platform',
  description: 'Experience the future of real estate with AI-powered property matching, virtual reality tours, and smart home integration.',
  keywords: 'real estate, property, AI, virtual reality, smart homes, blockchain',
  authors: [{ name: 'GT Estate' }],
  openGraph: {
    title: 'GT Estate - Next-Gen Property Platform',
    description: 'Experience the future of real estate with AI-powered property matching, virtual reality tours, and smart home integration.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${spartan.variable} font-sans`}>
        <Navigation />
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  )
}

