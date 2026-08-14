import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import Section from '@/shared/components/layout/section'
import MotionDiv from '@/shared/components/layout/motion-div'
import SectionLabel from '@/shared/components/headings/section-label'
import SectionTitle from '@/shared/components/headings/section-title'
import TextBody from '@/shared/components/text/text-body'

type SecurityProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const SecurityVariants = cva('Security', {
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

export default function Security({ className, variant }: SecurityProps) {
  return (
    <Section className={cn(SecurityVariants({ variant, className }))}>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionLabel>Sécurité</SectionLabel>

        <SectionTitle>Comment protégeons-nous vos données ?</SectionTitle>

        <div className="space-y-5">
          <TextBody>
            LocProof met en œuvre des mesures techniques destinées à limiter les
            accès non autorisés aux données.
          </TextBody>

          <TextBody>
            Les parcours de vérification et de validation utilisent notamment
            des jetons aléatoires et temporaires.
          </TextBody>

          <TextBody>
            Les cookies utilisés pour certains parcours sont configurés afin de
            limiter leur exposition côté navigateur.
          </TextBody>

          <TextBody>
            Toutefois, aucun service accessible sur Internet ne peut garantir
            une sécurité absolue des données.
          </TextBody>
        </div>
      </MotionDiv>
    </Section>
  )
}
