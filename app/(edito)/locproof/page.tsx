import AppLayout from '@/shared/components/layout/app-layout'
import Hero from '@/features/Locproof/components/Hero'
import TheProblem from '@/features/Locproof/components/TheProblem'
import TheIdea from '@/features/Locproof/components/TheIdea'
import HowItWorks from '@/features/Locproof/components/HowItWorks'
import WhatIsEvaluated from '@/features/Locproof/components/WhatIsEvaluated'
import CurrentState from '@/features/Locproof/components/CurrentState'
import Validation from '@/features/Locproof/components/Validation'
import Future from '@/features/Locproof/components/Future'
import CallToAction from '@/features/Locproof/components/CallToAction'

export const metadata = {
  title: 'LocProof — À propos du projet',
  description:
    'Découvrez LocProof, un projet visant à permettre aux locataires de valoriser leur expérience locative grâce à une référence de leur ancien bailleur.',
  keywords: [
    'LocProof',
    'référence locative',
    'référence locataire',
    'dossier locataire',
    'location immobilière',
    'bailleur',
    'locataire',
  ],
  openGraph: {
    title: 'LocProof — À propos du projet',
    description:
      "Découvrez le concept, le fonctionnement et l'état d'avancement de LocProof.",
    url: 'https://locproof.fr/locproof',
    siteName: 'LocProof',
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://locproof.fr/locproof',
  },
}

export default function LocProofPage() {
  return (
    <AppLayout>
      {/* HERO */}
      <Hero />

      {/* THE PROBLEM */}
      <TheProblem />

      {/* THE IDEA */}
      <TheIdea />

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* WHAT IS EVALUATED */}
      <WhatIsEvaluated />

      {/* CURRENT STATE */}
      <CurrentState />

      {/* VALIDATION */}
      <Validation />

      {/* FUTURE */}
      <Future />

      {/* FIELD STUDY CTA */}
      <CallToAction />
    </AppLayout>
  )
}
