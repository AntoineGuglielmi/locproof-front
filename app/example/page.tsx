import AppLayout from '@/shared/components/layout/app-layout'
import Profile from '@/features/Profile/components/profile'
import {
  exampleSynthesis,
  exampleTenant,
} from '@/features/Example/data/example-profile'
import Panel from '@/shared/components/text/panel'
import CTASection from '@/shared/components/layout/CTASection'
import Section from '@/shared/components/layout/section'

type ExamplePageProps = {
  params: Promise<void>
}

export const metadata = {
  title: 'Exemple de profil locataire | LocProof',
  description:
    'Découvrez à quoi ressemble un profil locataire vérifié sur LocProof : recommandations d’anciens bailleurs, historique de location et retours fiables.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Exemple de profil locataire | LocProof',
    description:
      'Voyez à quoi ressemble un profil locataire vérifié avec recommandations d’anciens bailleurs.',
    url: 'https://locproof.fr/example',
    siteName: 'LocProof',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exemple de profil locataire | LocProof',
    description:
      'Découvrez un exemple de profil locataire vérifié avec recommandations de bailleurs.',
  },
  alternates: {
    canonical: 'https://locproof.fr/example',
  },
}

export default function ExamplePage({}: ExamplePageProps) {
  return (
    <AppLayout>
      <Panel
        title="Exemple de profil"
        body="Le profile visible sur cette a été généré à partir d'informations fictives."
        type="warning"
      />

      <Profile
        tenant={exampleTenant}
        synthesis={exampleSynthesis}
        share={false}
      />

      <Section
        className="Narrow"
        which="topOnly"
      >
        <CTASection
          title="Et si c'était votre profil ?"
          body="Demandez à un ancien bailleur de partager son expérience et commencez
            à constituer votre profil LocProof."
          buttonHref="/validate-email"
          buttonLabel="Créer mon profil LocProof"
        />
      </Section>
    </AppLayout>
  )
}
