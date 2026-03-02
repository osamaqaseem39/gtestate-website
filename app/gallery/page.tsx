import { Metadata } from 'next'
import Footer from '@/components/Footer'
import ReachUsSection from '@/components/ReachUsSection'
import PageHero from '@/components/PageHero'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Gallery - GT Estate',
  description: 'Explore our curated gallery of premium properties and real estate projects.',
}

const HouseGallery = dynamic(() => import('@/components/HouseGallery'), { ssr: false })

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-black">
      <PageHero
        label="Gallery"
        title="Visualize Your"
        titleAccent="Next Property"
        description="Browse our curated collection of properties, interiors, and landmark projects that define GT Estate."
      />

      <section className="relative bg-black text-white">
        <div className="w-full">
          <HouseGallery />
        </div>
      </section>

      <ReachUsSection />
      <Footer />
    </main>
  )
}

