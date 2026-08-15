import AppLayout from '@/shared/components/layout/app-layout'
import Hero from '@/features/Legals/components/sections/hero'
import Creation from '@/features/Legals/components/sections/creation'
import Hosting from '@/features/Legals/components/sections/hosting'
import Purpose from '@/features/Legals/components/sections/purpose'
import Responsability from '@/features/Legals/components/sections/responsability'
import IntellectualProperty from '@/features/Legals/components/sections/intellectual-property'
import Contact from '@/features/Legals/components/sections/contact'

export const metadata = {
  title: 'Mentions légales | LocProof',
  description:
    'Informations légales concernant LocProof, son éditeur, son hébergement et son fonctionnement.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Mentions légales | LocProof',
    description:
      'Informations légales concernant LocProof, son éditeur et son fonctionnement.',
    url: 'https://locproof.fr/legals',
    siteName: 'LocProof',
    type: 'website',
    locale: 'fr_FR',
  },
  alternates: {
    canonical: 'https://locproof.fr/legals',
  },
}

export default function LegalPage() {
  return (
    <AppLayout>
      <Hero />

      <Creation />

      <Hosting />

      <Purpose />

      <Responsability />

      <IntellectualProperty />

      <Contact />
    </AppLayout>
  )
}
