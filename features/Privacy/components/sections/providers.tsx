import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import Section from '@/shared/components/layout/section'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'

type ProvidersProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const ProvidersVariants = cva('Providers', {
  variants: {
    variant: {
      default: '',
      other: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export default function Providers({ className, variant }: ProvidersProps) {
  return (
    <Section className={cn(ProvidersVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Prestataires</SectionLabel>

        <SectionTitle>Avec qui les données sont-elles partagées ?</SectionTitle>

        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Hébergement et stockage
            </h3>

            <TextBody>
              Les données applicatives sont stockées dans l’infrastructure
              utilisée par LocProof et accessible par son API.
            </TextBody>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Envoi d’e-mails
            </h3>

            <TextBody>
              LocProof utilise Resend pour envoyer les e-mails nécessaires au
              fonctionnement du service, notamment les e-mails de vérification
              d’adresse, les invitations envoyées aux bailleurs et les
              notifications liées aux références.
            </TextBody>

            <TextBody>
              Les adresses e-mail nécessaires à ces envois sont transmises au
              prestataire d’envoi concerné.
            </TextBody>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Recherche d’adresse
            </h3>

            <TextBody>
              Lorsqu’une adresse est saisie dans le formulaire de demande de
              référence, LocProof utilise le service d’autocomplétion d’adresses
              de la plateforme api-adresse.data.gouv.fr afin de proposer des
              adresses correspondantes.
            </TextBody>
          </div>

          <TextBody>
            LocProof ne met pas en place de mécanisme de vente ou de location
            des données personnelles collectées.
          </TextBody>
        </div>
      </MotionDiv>
    </Section>
  )
}
