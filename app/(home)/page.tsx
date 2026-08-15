import AppLayout from '@/shared/components/layout/app-layout'
import Hero from '@/features/Home/components/Hero'
import TheProbleme from '@/features/Home/components/TheProbleme'
import HowItWorks from '@/features/Home/components/HowItWorks'
import ProfilePreview from '@/features/Home/components/ProfilePreview'
import Positioning from '@/features/Home/components/Positioning'
import CallToAction from '@/features/Home/components/CallToAction'

export const metadata = {
  title: 'LocProof — La référence locative qui valorise votre expérience',
  description:
    'LocProof permet aux locataires de faire valoir leur expérience locative grâce à une référence vérifiée par leur ancien bailleur.',
  keywords: [
    'LocProof',
    'référence locative',
    'référence locataire',
    'dossier locataire',
    'location immobilière',
    'locataire',
    'bailleur',
  ],
  openGraph: {
    title: 'LocProof — La référence locative qui valorise votre expérience',
    description:
      'Votre dossier présente votre situation. LocProof permet également de faire valoir votre expérience en tant que locataire.',
    url: 'https://locproof.fr',
    siteName: 'LocProof',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LocProof — La référence locative qui valorise votre expérience',
    description:
      'Faites valoir votre expérience de locataire grâce à une référence de votre ancien bailleur.',
  },
  alternates: {
    canonical: 'https://locproof.fr',
  },
}

export default function HomePage() {
  return (
    <AppLayout>
      {/* HERO */}
      <Hero />

      {/* THE PROBLEM */}
      <TheProbleme />

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* PROFILE PREVIEW */}
      <ProfilePreview />

      {/* POSITIONING */}
      <Positioning />

      {/* CTA */}
      <CallToAction />
    </AppLayout>
  )
}
