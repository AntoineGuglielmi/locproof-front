import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import Section from '@/shared/components/layout/section'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'
import TextBodyList from '@/shared/components/list/text-body-list'

type CollectedDataProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const CollectedDataVariants = cva(
  'CollectedData FullWidth border-y bg-gray-50',
  {
    variants: {
      variant: {
        default: '',
        other: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export default function CollectedData({
  className,
  variant,
}: CollectedDataProps) {
  return (
    <Section className={cn(CollectedDataVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Données collectées</SectionLabel>

        <SectionTitle>Quelles données peuvent être utilisées ?</SectionTitle>

        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Lorsque vous créez ou utilisez un profil locataire
            </h3>

            <TextBody>LocProof peut enregistrer :</TextBody>

            <TextBodyList
              items={[
                { body: 'votre prénom' },
                { body: 'votre nom' },
                { body: 'votre adresse e-mail' },
                {
                  body: 'un identifiant public permettant d’accéder à votre profil',
                },
                { body: 'les références locatives associées à votre profil' },
              ]}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Lorsque vous demandez une référence
            </h3>

            <TextBody>
              Pour permettre à votre ancien bailleur de confirmer une location,
              vous renseignez :
            </TextBody>

            <TextBodyList
              items={[
                { body: 'l’adresse du logement' },
                { body: 'la ville du logement' },
                { body: 'les dates de début et de fin de location' },
                { body: 'l’adresse e-mail de votre bailleur' },
              ]}
            />

            <TextBody>
              Ces informations permettent de créer la demande de référence et
              d’envoyer au bailleur un lien sécurisé lui permettant de répondre.
            </TextBody>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Lorsque vous êtes bailleur
            </h3>

            <TextBody>
              Aucun compte n’est nécessaire pour répondre à une demande.
            </TextBody>

            <TextBody>Vous pouvez toutefois être amené à fournir :</TextBody>

            <TextBodyList
              items={[
                { body: 'vos réponses aux questions relatives à la location' },
                {
                  body: 'un commentaire facultatif permettant de préciser votre retour',
                },
              ]}
            />

            <TextBody>
              LocProof n’enregistre actuellement pas votre nom dans le cadre du
              formulaire de recommandation.
            </TextBody>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Données techniques et de sécurité
            </h3>

            <TextBody>
              LocProof utilise également certaines informations techniques
              nécessaires au fonctionnement du service, notamment des
              identifiants et jetons temporaires utilisés pour sécuriser les
              parcours de vérification et de validation.
            </TextBody>
          </div>
        </div>
      </MotionDiv>
    </Section>
  )
}
