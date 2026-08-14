import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import Section from '@/shared/components/layout/section'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'
import TextBodyList from '@/shared/components/list/text-body-list'

type PurposeProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const PurposeVariants = cva('Purpose', {
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

export default function Purpose({ className, variant }: PurposeProps) {
  return (
    <Section className={cn(PurposeVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Utilisation</SectionLabel>

        <SectionTitle>Pourquoi ces données sont-elles utilisées ?</SectionTitle>

        <div className="space-y-5">
          <TextBody>Les données collectées servent principalement à :</TextBody>

          <TextBodyList
            items={[
              { body: 'vérifier l’adresse e-mail du locataire' },
              { body: 'créer ou mettre à jour son profil' },
              { body: 'enregistrer une expérience locative' },
              { body: 'permettre à un bailleur de confirmer une location' },
              {
                body: 'envoyer les e-mails nécessaires au fonctionnement du service',
              },
              { body: 'associer une recommandation au bon profil locataire' },
              {
                body: 'sécuriser les liens de validation et limiter leur utilisation dans le temps',
              },
              {
                body: 'afficher les informations nécessaires lorsqu’un locataire choisit de partager son profil',
              },
            ]}
          />

          <TextBody>
            LocProof n’utilise pas les données collectées pour constituer ou
            vendre des fichiers de prospection.
          </TextBody>
        </div>
      </MotionDiv>
    </Section>
  )
}
