import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { FeaturedProjects } from '@/components/sections/FeatureProjects'
import { CroquisGallery } from '@/components/sections/CroquisGallery'
import { ContactForm } from '@/components/sections/ContactForm'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <FeaturedProjects />
      <CroquisGallery />
      <ContactForm />
    </>
  )
}