/* eslint-disable react/no-unescaped-entities */
import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { tenantRepository } from '@/repositories/tenant.repository'
import AppLayout from '@/shared/components/layout/app-layout'
import MotionDiv from '@/shared/components/layout/motion-div'
import { TenantVerification } from '@/types/strapi-types'
import { EntityTenantVerification } from '@/shared/entities/EntityTenantVerification'
import RequestingAReferenceForm from '@/features/RequestingAReference/components/requesting-a-reference-form'

type CreateRentalPageProps = {
  params: Promise<{
    tenantVerificationToken: TenantVerification['tenantVerificationToken']
  }>
}

export const metadata = {
  title: 'Invitez votre ancien bailleur | LocProof',
  description:
    'Envoyez une demande de recommandation à votre ancien bailleur pour confirmer votre expérience locative. Simple, rapide et sécurisé.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Invitez votre ancien bailleur | LocProof',
    description:
      'Demandez à votre ancien bailleur de confirmer votre expérience locative via un lien sécurisé.',
    url: 'https://locproof.fr/request-reference',
    siteName: 'LocProof',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary',
    title: 'Invitez votre ancien bailleur | LocProof',
    description:
      'Envoyez une demande de recommandation en quelques minutes à votre ancien bailleur.',
  },
  alternates: {
    canonical: 'https://locproof.fr/request-reference',
  },
}

export default async function CreateRentalPage({
  params,
}: CreateRentalPageProps) {
  const { tenantVerificationToken } = await params
  const tenantVerification =
    await tenantVerificationRepository.findTenantVerificationByToken(
      tenantVerificationToken!,
    )
  if (!tenantVerification) {
    return (
      <AppLayout>
        <section className="text-center px-6 pt-16 pb-10 max-w-2xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">
              Lien de vérification invalide ou expiré
            </h1>
            <p className="text-gray-600">
              Le lien que vous avez utilisé est invalide ou a expiré. Veuillez
              demander un nouveau lien de vérification et réessayer.
            </p>
          </MotionDiv>
        </section>
      </AppLayout>
    )
  }

  const tenantVerificationEntity = new EntityTenantVerification(
    tenantVerification,
  )

  if (!tenantVerificationEntity || tenantVerificationEntity.isExpired()) {
    return (
      <AppLayout>
        <section className="text-center px-6 pt-16 pb-10 max-w-2xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">
              Lien de vérification invalide ou expiré
            </h1>
            <p className="text-gray-600">
              Le lien que vous avez utilisé est invalide ou a expiré. Veuillez
              demander un nouveau lien de vérification et réessayer.
            </p>
          </MotionDiv>
        </section>
      </AppLayout>
    )
  }

  if (tenantVerificationEntity.isValidated()) {
    return (
      <AppLayout>
        <section className="text-center px-6 pt-16 pb-10 max-w-2xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">
              Lien de vérification déjà utilisé
            </h1>
            <p className="text-gray-600">
              Ce lien de vérification a déjà été utilisé pour créer une
              location. Si vous pensez qu'il s'agit d'une erreur, veuillez
              contacter notre support.
            </p>
          </MotionDiv>
        </section>
      </AppLayout>
    )
  }

  if (tenantVerificationEntity.state === 'validated') {
    return (
      <AppLayout>
        <section className="text-center px-6 pt-16 pb-10 max-w-2xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">
              Lien de vérification déjà utilisé
            </h1>
            <p className="text-gray-600">
              Ce lien de vérification a déjà été utilisé pour créer une
              location. Si vous pensez qu'il s'agit d'une erreur, veuillez
              contacter notre support.
            </p>
          </MotionDiv>
        </section>
      </AppLayout>
    )
  }

  const createRentalFormProps = {
    tenantVerificationToken,
    email: tenantVerificationEntity.email!,
    firstname: '',
    lastname: '',
  }
  const tenant = await tenantRepository.findByEmail(
    tenantVerificationEntity.email!,
  )
  if (tenant) {
    createRentalFormProps.firstname = tenant.firstname!
    createRentalFormProps.lastname = tenant.lastname!
  }

  return (
    <AppLayout>
      <section className="text-center px-6 pt-16 pb-10 max-w-2xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">
            Invitez votre ancien bailleur
          </h1>
          <p className="text-gray-600 text-balance">
            Nous allons lui envoyer un lien simple pour confirmer votre
            expérience locative. Cela ne lui prendra que quelques minutes.
          </p>
        </MotionDiv>
      </section>

      <RequestingAReferenceForm {...createRentalFormProps} />
    </AppLayout>
  )
}
