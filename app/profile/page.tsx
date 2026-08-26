import RetrieveProfileForm from '@/features/RetrieveProfile/components/retrieve-profile-form'
import PageMainTitle from '@/shared/components/headings/page-main-title'
import AppLayout from '@/shared/components/layout/app-layout'
import MotionDiv from '@/shared/components/layout/motion-div'
import Section from '@/shared/components/layout/section'
import TextBody from '@/shared/components/text/text-body'

type RetrieveProfilePageProps = {
  params: Promise<void>
}

export const metadata = {
  title: 'Retrouver mon profil | LocProof',
  description:
    'Retrouvez votre profil LocProof en recevant son lien directement par email.',
  robots: {
    index: false,
    follow: false,
    noindex: true,
    nofollow: true,
  },
  openGraph: {
    title: 'Retrouver mon profil | LocProof',
    description:
      'Retrouvez votre profil LocProof en quelques secondes grâce à votre adresse email.',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary',
    title: 'Retrouver mon profil | LocProof',
    description:
      'Recevez par email un lien pour accéder à votre profil LocProof.',
  },
  alternates: {
    canonical: 'https://locproof.fr/profile',
  },
}

export default function RetrieveProfilePage({}: RetrieveProfilePageProps) {
  return (
    <AppLayout>
      <Section
        className="grid-narrow text-center"
        size="x-small"
        which="topOnly"
      >
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <PageMainTitle version="small">Retrouver mon profil</PageMainTitle>

          <TextBody className="text-balance mb-8">
            Vous avez déjà créé votre profil LocProof ? Entrez l’adresse email
            associée à votre profil et recevez votre lien d’accès par email.
          </TextBody>

          <RetrieveProfileForm />
        </MotionDiv>
      </Section>
    </AppLayout>
  )
}
