import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import Section from '@/shared/components/layout/section'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'
import TextBodyList from '@/shared/components/list/text-body-list'

type ReferencesProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const ReferencesVariants = cva('References FullWidth border-y bg-gray-50', {
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

export default function References({ className, variant }: ReferencesProps) {
  return (
    <Section className={cn(ReferencesVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Références locatives</SectionLabel>

        <SectionTitle>Que devient la référence du bailleur ?</SectionTitle>

        <div className="space-y-5">
          <TextBody>
            Lorsqu’un bailleur répond à une demande, ses réponses sont
            enregistrées afin de constituer la référence locative du locataire.
          </TextBody>

          <TextBody>La référence porte notamment sur :</TextBody>

          <TextBodyList
            items={[
              { body: 'le paiement des loyers ;' },
              { body: 'l’entretien du logement ;' },
              { body: 'la qualité de la communication ;' },
              { body: 'la recommandation du locataire.' },
            ]}
          />

          <TextBody>
            Le bailleur peut également laisser un commentaire facultatif. Ces
            informations sont ensuite utilisées pour construire la synthèse
            affichée sur le profil LocProof du locataire.
          </TextBody>
        </div>
      </MotionDiv>
    </Section>
  )
}
