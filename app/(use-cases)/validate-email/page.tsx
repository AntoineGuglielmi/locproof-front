import ValidateEmailForm from '@/features/ValidateEmail/components/validate-email-form'
import PageMainTitle from '@/shared/components/headings/page-main-title'
import AppLayout from '@/shared/components/layout/app-layout'
import MotionDiv from '@/shared/components/layout/motion-div'
import Section from '@/shared/components/layout/section'
import Tag from '@/shared/components/text/tag'
import TextBody from '@/shared/components/text/text-body'

type CreateMePageProps = {
  params: Promise<void>
}

export const metadata = {
  title: 'Créer mon dossier locataire | LocProof',
  description:
    'Demandez une recommandation vérifiée auprès d’un ancien bailleur en quelques minutes. Aucun compte requis. Lien sécurisé envoyé par email.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Créer mon dossier locataire | LocProof',
    description:
      'Invitez un ancien bailleur à confirmer votre sérieux en tant que locataire via un lien sécurisé.',
    url: 'https://locproof.fr/validate-email',
    siteName: 'LocProof',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary',
    title: 'Créer mon dossier locataire | LocProof',
    description:
      'Demandez une recommandation vérifiée en quelques minutes, sans compte.',
  },
  alternates: {
    canonical: 'https://locproof.fr/validate-email',
  },
}

export default function CreateMePage({}: CreateMePageProps) {
  return (
    <AppLayout>
      <Section
        size="x-small"
        which="topOnly"
        className="Narrow text-center"
      >
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Tag className="mb-4">Vérification sécurisée</Tag>

          <PageMainTitle version="small">
            Demandez une recommandation
          </PageMainTitle>

          <TextBody className="mb-8 text-balance">
            En quelques minutes, invitez un ancien bailleur à confirmer votre
            sérieux en tant que locataire.
          </TextBody>

          <ValidateEmailForm />

          <p className="text-center text-xs text-gray-400 mt-6">
            Aucun compte requis • Lien sécurisé envoyé par email
          </p>
        </MotionDiv>
      </Section>
    </AppLayout>
  )
}
