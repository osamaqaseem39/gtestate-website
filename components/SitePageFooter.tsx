import Footer from '@/components/Footer'
import InquiryForm from '@/components/InquiryForm'
import ReachUsSection from '@/components/ReachUsSection'

/** Shared bottom sections for pages that don't already include inquiry + footer. */
export default function SitePageFooter() {
  return (
    <>
      <ReachUsSection />
      <InquiryForm />
      <Footer />
    </>
  )
}
